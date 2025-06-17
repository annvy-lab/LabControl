"use client"

import { useState, useEffect } from "react"
import SideBar from "@/components/layout/navbar"
import HeaderPage from "@/components/layout/header"
import { CardRequest, Request } from "@/components/shared/manager-reservations/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, ClockFading, Funnel } from "lucide-react"
import toast from "react-hot-toast"
import { axiosClient } from "@/services/axiosClient"
import { getUserFromToken } from "@/services/auth"

export default function ManagerReservations() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | Request["status"]>("all")
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const user = getUserFromToken()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const isAdmin = ["reitoria", "auditor", "admin"].includes(user?.tipo)
      const url = isAdmin ? "/reservations/all" : "/reservations/all"
      const { data } = await axiosClient.get(url)
      const formatted = data.map((r: any) => ({
        id: r.idReserva || r.id,
        date: r.data_hora_inicio ? new Date(r.data_hora_inicio).toISOString().slice(0, 10) : "",
        hours:
          r.data_hora_inicio && r.data_hora_fim
            ? `${new Date(r.data_hora_inicio).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(r.data_hora_fim).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
            : "",
        status: r.status,
        isRecurring: !!r.recorrente,
        labName: r.Laboratorio?.nome || "",
        labLocal: r.Laboratorio?.localizacao || "",
        course: r.Curso?.nome || "",
        semester: r.Turma?.periodo_letivo || "",
        subject: r.Disciplina?.nome || "",
        notes: r.observacoes || "",
        responsible: r.Professor?.Usuario?.nome || "",
        requestDate: r.data_solicitacao ? new Date(r.data_solicitacao) : null,
        approvalDate: r.data_aprovacao ? new Date(r.data_aprovacao) : null,
        rejectionReason: r.motivo_rejeicao || "",
      }))
      setRequests(formatted)
    } catch (e) {
      setRequests([])
      console.error("Erro ao carregar reservas:", e)
      toast.error("Erro ao carregar reservas")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isMounted) fetchRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  // FILTRO
  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "all" || req.status === filterStatus
    const matchesSearch =
      req.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.labName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.subject.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // ORDENAR: pendente sempre no topo, e dentro de cada status por ordem de solicitação (mais antiga primeiro)
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    // Pendente sempre primeiro
    if (a.status === "pendente" && b.status !== "pendente") return -1
    if (a.status !== "pendente" && b.status === "pendente") return 1

    // Ambos com mesmo status, ordenar por requestDate (mais antiga primeiro)
    const dateA = a.requestDate ? a.requestDate.getTime() : 0
    const dateB = b.requestDate ? b.requestDate.getTime() : 0
    return dateA - dateB
  })

  const handleApprove = async (id: number) => {
    try {
      await axiosClient.patch(`/reservations/${id}/approve`, {
        aprovadorId: user?.id,
      })
      toast.success("Reserva aprovada! O responsável será notificado.")
      fetchRequests()
    } catch (e) {
      toast.error("Erro ao aprovar reserva.")
    }
  }

  const handleReject = (request: Request) => {
    setSelectedRequest(request)
    setRejectDialogOpen(true)
  }

  const confirmRejection = async () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      toast.error("Por favor, informe o motivo da reprovação.")
      return
    }
    try {
      await axiosClient.patch(`/reservations/${selectedRequest.id}/reject`, {
        motivo: rejectionReason,
        aprovadorId: user?.id,
      })
      toast("Reserva reprovada! O responsável será notificado com o motivo.")
      setRejectDialogOpen(false)
      setRejectionReason("")
      setSelectedRequest(null)
      fetchRequests()
    } catch (e) {
      toast.error("Erro ao reprovar reserva.")
    }
  }

  if (!isMounted) return null

  return (
    <div className="w-screen h-screen flex">
      <SideBar sectionIsOpen={true} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Gerenciar Reservas" />
        <div className="w-full flex flex-col items-center max-w-270 self-center pb-30">
          <div className="flex w-full self-start relative md:mb-1 mb-4 gap-4 md:gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por responsável, laboratório, curso ou disciplina..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 py-2 rounded-md bg-primary/10 border border-primary/20 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 min-w-[180px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px] flex items-center gap-1 rounded-md bg-primary/10 border border-primary/20">
                  <Funnel className="h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-md border-primary/40">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="rejeitado">Rejeitado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                  <SelectItem value="concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="w-full overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {loading ? (
              <br />
            ) : sortedRequests.length > 0 ? (
              sortedRequests.map((request) => (
                <CardRequest
                  key={request.id}
                  request={request}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-foreground py-12">
                <ClockFading size={65} strokeWidth={1.2} className="text-muted-foreground mx-auto mb-2" />
                    Nenhuma solicitação encontrada.
              </div>
            )}
          </div>
        </div>

        <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
          <DialogContent className="w-5/12">
            <DialogHeader>
              <DialogTitle>Reprovar Solicitação</DialogTitle>
              <DialogDescription>
                Informe o motivo da reprovação. Esta informação será enviada ao responsável da reserva.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <Textarea
                placeholder="Digite o motivo da reprovação..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="destructive" onClick={confirmRejection}>
                Reprovar Solicitação
              </Button>
              <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
