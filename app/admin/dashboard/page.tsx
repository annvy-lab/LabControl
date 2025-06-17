"use client";
import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { BellOff } from "lucide-react";
import { format } from "date-fns";
import clsx from "clsx";
import { axiosClient } from "@/services/axiosClient";
import { getUserFromToken } from "@/services/auth";
import ViewReservation from "@/components/shared/reservations/view";
import { Dialog } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<any | null>(null);
  const [viewOpen, setViewOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const user = getUserFromToken();
    if (!user?.id) return;

    // Verifica se é reitor ou auditor
    const isAdmin = ["reitoria", "auditor"].includes(user.tipo);

    const fetchUrl = isAdmin
      ? `/reservations/pending`
      : `/reservations/my?professorId=${user.id}`;

    axiosClient.get(fetchUrl).then(({ data }) => {
      // Filtra apenas aprovadas e reprovadas para notificações
      const filtered = (data || []).filter(
        (r: any) =>
          r.status === "aprovado" ||
          r.status === "reprovado" ||
          r.status === "rejeitado"
      );
      // Notificações
      const generatedNotifications = filtered.map((r: any) => ({
        id: r.idReserva || r.id,
        status: r.status === "rejeitado" ? "reprovado" : r.status,
        labName: r.Laboratorio?.nome || "-",
        start: r.data_hora_inicio,
        end: r.data_hora_fim,
      }));
      setNotifications(generatedNotifications);

      setReservations(
        (data || []).map((r: any) => ({
          id: r.idReserva || r.id,
          start: r.data_hora_inicio,
          end: r.data_hora_fim,
          status: r.status,
          isRecurring: r.recorrente || false,
          labName: r.Laboratorio?.nome || "-",
          labLocal: r.Laboratorio?.localizacao || "-",
          course: r.Curso?.nome || "-",
          semester: r.Turma?.periodo_letivo || "-",
          subject: r.Disciplina?.nome || "-",
          notes: r.observacoes || "",
        }))
      );
    });
  }, []);

  if (loading) return null;

  // Dados para o ViewReservation
  const dialogData = selectedReservation
    ? {
      id: selectedReservation.id,
      date: selectedReservation.start
        ? format(new Date(selectedReservation.start), "dd/MM/yyyy")
        : "",
      hours:
        selectedReservation.start && selectedReservation.end
          ? `${format(new Date(selectedReservation.start), "HH:mm")} - ${format(
            new Date(selectedReservation.end),
            "HH:mm"
          )}`
          : "",
      status: selectedReservation.status,
      isRecurring: selectedReservation.isRecurring || false,
      labName: selectedReservation.labName,
      labLocal: selectedReservation.labLocal,
      course: selectedReservation.course,
      semester: selectedReservation.semester,
      subject: selectedReservation.subject,
      notes: selectedReservation.notes,
    }
    : null;

  const calendarEvents = reservations
    .filter(
      (r) =>
        r.status !== "cancelado" &&
        r.status !== "reprovado" &&
        r.status !== "rejeitado"
    )
    .map((r) => ({
      id: String(r.id),
      title:
        r.start && r.end
          ? `${format(new Date(r.start), "HH:mm")} - ${format(
            new Date(r.end),
            "HH:mm"
          )}`
          : "Horário não informado",
      start: r.start,
      end: r.end,
      backgroundColor:
        r.status === "aprovado"
          ? "#bbf7d0"
          : r.status === "pendente"
            ? "#fef08a"
            : r.status === "concluido" || r.status === "concluído"
              ? "#bfdbfe"
              : "#e0e7ef",
      borderColor: "transparent",
      textColor: "#1e293b",
    }));

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Dashboard" />

        <div className="flex flex-1 w-full h-full gap-6">
          {/* Calendário de Reservas */}
          <div className="w-9/12 bg-background flex flex-col text-base">
            <div className="flex-1 min-h-[520px] text-base">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={ptBrLocale}
                height="auto"
                eventDisplay="block"
                events={calendarEvents}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                eventClick={(info) => {
                  const reserva = reservations.find(
                    (r) => String(r.id) === String(info.event.id)
                  );
                  setSelectedReservation(reserva);
                  setViewOpen(true);
                }}
              />
            </div>
          </div>
          {/* Painel de Notificações */}
          <Card className="w-3/12 flex flex-col bg-card/70 gap-1 p-0 pb-4 h-fit max-h-12/12">
            <div className="flex items-center gap-2 p-4 pb-0">
              <h2 className="text-lg font-medium">Notificações</h2>
            </div>
            <div className="flex flex-col gap-0 overflow-y-auto max-h-[75vh] pr-1 p-1 pt-0">
              {notifications.length === 0 ? (
                <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center">
                  <BellOff size={40} strokeWidth={1.2} className="text-muted-foreground" />
                  Nenhuma notificação.
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={clsx(
                      "flex flex-col px-3 py-2 rounded-none transition border-b gap-1"
                    )}
                  >
                    <h2
                      className={clsx(
                        "text-sm font-medium",
                        n.status === "aprovado"
                          ? "text-green-600"
                          : n.status === "reprovado"
                            ? "text-red-600"
                            : "text-yellow-500"
                      )}
                    >
                      {n.status === "aprovado"
                        ? "Reserva aprovada"
                        : n.status === "reprovado"
                          ? "Reserva reprovada"
                          : "Status desconhecido"}
                    </h2>
                    <p className="text-sm line-clamp-2">
                      #{n.id} - {n.labName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {n.start && n.end
                        ? `${format(new Date(n.start), "dd/MM/yyyy")} - ${format(
                          new Date(n.start),
                          "HH:mm"
                        )} às ${format(new Date(n.end), "HH:mm")}`
                        : ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          {dialogData && <ViewReservation {...dialogData} />}
        </Dialog>
      </div>
    </div>
  );
}
