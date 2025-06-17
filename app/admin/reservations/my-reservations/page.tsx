"use client";

import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState, useCallback } from "react";
import { axiosClient } from "@/services/axiosClient";
import CardReservation from "@/components/shared/reservations/card";
import { Input } from "@/components/ui/input";
import { Search, AlarmClockPlus, CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FormReservation from "@/components/shared/reservations/form.";
import { useRouter } from "next/navigation";
import { getUserFromToken } from "@/services/auth";

type ReservationStatus = "pendente" | "aprovado" | "reprovado" | "rejeitado" | "cancelado" | "concluido" | "concluído";
type Reservation = {
  id: number;
  date: string;
  hours: string;
  status: ReservationStatus;
  isRecurring: boolean;
  labName: string;
  labLocal: string;
  course: string;
  semester: string;
  subject: string;
  notes?: string;
};

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year < 100 ? 2000 + year : year, month - 1, day);
}

export default function MyReservations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const user = getUserFromToken();

  const fetchReservations = useCallback(() => {
    if (!user?.id) {
      setReservations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    axiosClient
      .get(`/reservations/my?professorId=${user.id}`)
      .then(({ data }) => {
        const mapped: Reservation[] = data.map((r: any) => {
          let status = String(r.status).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          if (status === "rejeitado") status = "reprovado";

          return {
            id: r.idReserva,
            date: new Date(r.data_hora_inicio).toLocaleDateString("pt-BR"),
            hours: `${new Date(r.data_hora_inicio).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${new Date(r.data_hora_fim).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`,
            status: status as ReservationStatus,
            isRecurring: r.recorrente,
            labName: r.Laboratorio?.nome || "-",
            labLocal: r.Laboratorio?.localizacao || "-",
            course: r.Curso?.nome || "-",
            semester: r.Turma?.periodo_letivo || "-",
            subject: r.Disciplina?.nome || "-",
            notes: r.observacoes || "",
          };
        });
        setReservations(mapped);
      })
      .catch((err) => {
        console.error("Erro ao carregar reservas", err);
      })
      .finally(() => setLoading(false));
  }, [user?.id]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setLoading(false);
    }
  }, [router]);

  const filteredReservations = reservations
    .filter((reservation) => {
      const searchableContent = Object.values(reservation).join(" ").toLowerCase();
      return searchableContent.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Canceladas no fim
      if (a.status === "cancelado" && b.status !== "cancelado") return 1;
      if (b.status === "cancelado" && a.status !== "cancelado") return -1;
      // Aprovados antes das demais
      if (a.status === "aprovado" && b.status !== "aprovado" && b.status !== "cancelado") return -1;
      if (b.status === "aprovado" && a.status !== "aprovado" && a.status !== "cancelado") return 1;
      // Datas próximas no topo
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateA.getTime() - dateB.getTime();
    });

  if (loading) return null;

  return (
    <div className="w-screen h-screen flex">
      <SideBar sectionIsOpen={true} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Minhas Reservas" />
        <div className="w-full flex flex-col items-center max-w-270 self-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex w-full self-start relative md:mb-1 mb-4 gap-4 md:gap-6">
              <div className="flex w-full items-start">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Buscar Reserva..."
                  className="pl-10 bg-primary/10 border-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Dialog>
                <DialogTrigger className="focus:outline-none">
                  <Button variant="default" className="hidden md:flex">
                    <AlarmClockPlus /> Nova Reserva
                  </Button>
                  <Button variant="default" className="flex md:hidden">
                    <AlarmClockPlus />
                  </Button>
                </DialogTrigger>
                <FormReservation onSuccess={fetchReservations} userId={user?.id} />
              </Dialog>
            </div>

            <div className="w-full hidden md:flex flex-row py-3 items-center gap-10 px-4">
              <div className="w-25 truncate flex text-sm justify-center items-center text-foreground">
                Data
              </div>
              <div className="w-38 flex text-sm justify-center items-center">
                <p className="ml-[-1.5rem]">
                Horário
                </p>
              </div>
              <div className="w-74 truncate flex text-sm justify-start items-center text-foreground">
                Laboratório
              </div>
              <div className="w-18 truncate flex text-sm items-center text-foreground">
                Local
              </div>
              <div className="w-32 flex justify-center text-sm items-center">
                Status
              </div>
              <div className="w-12 flex items-center">
              </div>
            </div>


            {loading ? (
              <br />
            ) : filteredReservations.length === 0 ? (
                <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center">
                  <CalendarX2 size={70} strokeWidth={1.2} />
                  Nenhuma reserva encontrada...
                </div>
            ) : (
              filteredReservations.map((reservation) => (
                <CardReservation key={reservation.id} {...reservation} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}