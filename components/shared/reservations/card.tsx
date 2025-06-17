"use client";

import {
  Clock,
  CircleX,
  CircleDashed,
  CircleCheckBig,
  CircleOff,
  Circle,
  MapPin,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewReservation from "@/components/shared/reservations/view";
import { Card } from "@/components/ui/card";
import ReservationCancelDialog from "./reservation-cancel";

type ReservCardProps = {
  id: number;
  date: string;
  hours: string;
  status:
  | "pendente"
  | "aprovado"
  | "reprovado"
  | "rejeitado"
  | "cancelado"
  | "concluido"
  | "concluído";
  isRecurring: boolean;
  labName: string;
  labLocal: string;
  course: string;
  semester: string;
  subject: string;
  notes?: string;
  reloadReservations?: () => void; // Aqui!
};

const statusConfig = {
  pendente: {
    icon: CircleDashed,
    color: "text-yellow-500",
    bg: "bg-yellow-100",
  },
  aprovado: {
    icon: CircleCheckBig,
    color: "text-green-500",
    bg: "bg-green-100",
  },
  reprovado: {
    icon: CircleX,
    color: "text-red-500",
    bg: "bg-red-100",
  },
  cancelado: {
    icon: CircleOff,
    color: "text-gray-500",
    bg: "bg-gray-100",
  },
  concluido: {
    icon: Circle,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
  rejeitado: {
    icon: CircleX,
    color: "text-red-500",
    bg: "bg-red-100",
  },
  "concluído": {
    icon: Circle,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
} as const;

const fallbackConfig = {
  icon: Circle,
  color: "text-muted-foreground",
  bg: "bg-muted",
};

export default function CardReservation({
  id,
  date,
  hours,
  status,
  isRecurring,
  labName,
  labLocal,
  course,
  semester,
  subject,
  notes,
  reloadReservations, // Aqui!
}: ReservCardProps) {
  const { icon: StatusIcon, color, bg } = statusConfig[status] ?? fallbackConfig;

  return (
    <Card className="w-full p-4 pb-2 md:py-2 md:px-4 mb-4 flex flex-row items-center bg-card/70 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-lg duration-300">
      <Dialog>
        <DialogTrigger className="focus:outline-none w-full flex flex-row items-center cursor-pointer gap-10">
          <div className="w-25 truncate flex text-sm justify-center items-center text-foreground">
            {date}
          </div>
          <div className="w-38 flex items-center">
            <div className="w-fit truncate flex text-sm justify-center items-center gap-1.5 text-foreground bg-primary/10 rounded-md py-0.5 px-2">
              <Clock size={14} strokeWidth={2} className="mb-0.5" />
              <p className="mb-0.5">{hours}</p>
            </div>
          </div>
          <div className="w-74 truncate overflow-hidden whitespace-nowrap text-sm flex justify-start items-center text-foreground">
            {labName}
          </div>
          <div className="w-18 truncate flex text-sm items-center text-foreground">
            {labLocal}
          </div>
          <div className="w-32 flex justify-center items-center">
            <div className={`flex items-center gap-1.5 rounded-md px-2 ${bg}`}>
              <StatusIcon size={14} className={color} />
              <p className={`${color} text-sm mb-0.5`}>{status}</p>
            </div>
          </div>
        </DialogTrigger>
        <ViewReservation
          id={id}
          date={date}
          hours={hours}
          status={status}
          isRecurring={isRecurring}
          labName={labName}
          labLocal={labLocal}
          course={course}
          semester={semester}
          subject={subject}
          notes={notes}
        />
      </Dialog>
      <div className="w-12 flex items-center justify-center">
        {/* Passe a função de reload como onSuccess */}
        <ReservationCancelDialog reservationId={id} onSuccess={reloadReservations} />
      </div>
    </Card>
  );
}
