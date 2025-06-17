"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Check,
  X,
  Clock,
  Calendar,
  MapPin,
  FlaskConical,
  CircleX,
  CircleDashed,
  CircleCheckBig,
  CircleOff,
  Circle,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export type Request = {
  id: number
  date: string
  hours: string
  status: "pendente" | "aprovado" | "reprovado" | "cancelado" | "concluído"
  isRecurring: boolean
  labName: string
  labLocal: string
  course: string
  semester: string
  subject: string
  notes?: string
  responsible: string
  requestDate: Date
  approvedBy?: string
  approvedDate?: Date
  rejectedBy?: string
  rejectedDate?: Date
  rejectionReason?: string
}

interface CardRequestProps {
  request: Request
  onApprove: (id: number) => void
  onReject: (request: Request) => void
}

const statusConfig = {
  pendente: {
    icon: CircleDashed,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    label: "Pendente",
  },
  aprovado: {
    icon: CircleCheckBig,
    color: "text-green-500",
    bg: "bg-green-100",
    label: "Aprovada",
  },
  reprovado: {
    icon: CircleX,
    color: "text-red-500",
    bg: "bg-red-100",
    label: "Reprovada",
  },
  cancelado: {
    icon: CircleOff,
    color: "text-gray-500",
    bg: "bg-gray-100",
    label: "Cancelada",
  },
  concluído: {
    icon: Circle,
    color: "text-blue-500",
    bg: "bg-blue-100",
    label: "Concluída",
  },
} as const

export function CardRequest({ request, onApprove, onReject }: CardRequestProps) {
  const { icon: StatusIcon, color, bg, label } = statusConfig[request.status]

  return (
    <Card className="w-full col-span-1 p-4 rounded-2xl shadow-sm h-full flex flex-col">
      <CardHeader className="w-full pb-3 p-0">
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-full justify-between items-start">
            <CardTitle className="text-lg mb-1 line-clamp-1">{request.responsible}</CardTitle>
            <div className={`flex items-center gap-1.5 ml-3 rounded-md px-2 opacity-80 ${bg}`}>
              <StatusIcon size={14} className={color} />
              <span className={`${color} text-xs flex items-center h-5`}>{label}</span>
            </div>
          </div>
          <div className="w-full flex flex-wrap items-center text-sm text-foreground/80 gap-0.5 text-center justify-start">
            <span className="break-words line-clamp-2">{request.course}</span>
            <span className="px-1 select-none whitespace-nowrap">•</span>
            <span className="break-words line-clamp-2">{request.subject}</span>
            <span className="px-1 select-none whitespace-nowrap">•</span>
            <span className="break-words line-clamp-2">Turma {request.semester}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="w-full flex-1 flex flex-col p-0">
        <div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            <div className="space-y-4">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-1.5 items-center">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Data:</span>
                </div>
                <span className="text-gray-600">
                  {format(new Date(request.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-1.5 items-center">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Horário:</span>
                </div>
                <span className="text-gray-600">{request.hours}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-1.5 items-center">
                  <FlaskConical className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Laboratório:</span>
                </div>
                <span className="text-gray-600">{request.labName}</span>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-1.5 items-center">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">Local:</span>
                </div>
                <span className="text-gray-600">{request.labLocal}</span>
              </div>
            </div>
          </div>
          {request.notes && (
            <div className="w-full flex flex-col gap-1 mb-3">
              <h4 className="font-medium text-sm">Observações:</h4>
              <p className="text-sm text-foreground/70 bg-blue-50 p-2 rounded-lg line-clamp-2 overflow-hidden">
                {request.notes}
              </p>
            </div>

          )}
        </div>

        <div className="flex-1" />
        <div className="w-full flex flex-col">
          <div className="w-full text-xs text-gray-500 border-t pt-3">
            <div className="w-full flex justify-between items-center">
              <span>
                Solicitação: {format(request.requestDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} • ID: {request.id}
              </span>
              <div className="flex items-center gap-x-4">
                {request.status === "aprovado" && request.approvedBy && request.approvedDate && (
                  <span className="text-green-700 line-clamp-1">
                    Aprovado às{" "}
                    {format(request.approvedDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </span>
                )}
                {request.status === "reprovado" && request.rejectedBy && request.rejectedDate && (
                  <HoverCard>
                    <HoverCardTrigger className="flex items-center gap-1 underline text-red-600">
                      <span className="text-red-600 line-clamp-1">
                        Reprovado às{" "}
                        {format(request.rejectedDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent align="end" side="top" className="w-122 rounded-2xl border-red-300">
                      {request.rejectionReason && (
                        <p className="text-foreground rounded text-sm">
                          <strong>Motivo da reprovação: <br /></strong> {request.rejectionReason}
                        </p>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
            </div>
          </div>

          {request.status === "pendente" && (
            <div className="w-full flex gap-2 pt-2">
              <Button
                onClick={() => onApprove(request.id)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <Check className="h-4 w-4 mr-1" />
                Aprovar
              </Button>
              <Button onClick={() => onReject(request)} variant="destructive" className="flex-1">
                <X className="h-4 w-4 mr-1" />
                Reprovar
              </Button>
            </div>
          )}
    </div>
      </CardContent>
    </Card>

  )
}
