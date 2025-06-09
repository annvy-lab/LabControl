"use client";

import {
  AlarmClock,
  CircleCheck,
  CircleX,
  CircleDashed,
  CircleCheckBig,
  CircleOff,
  Circle,
  Repeat,
  UserRound,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

type ReservCardProps = {
  id: number;
  date: string;
  hours: string;
  status: "pendente" | "aprovado" | "reprovado" | "cancelado" | "concluído";
  isRecurring: boolean;
  labName: string;
  labLocal: string;
  course: string;
  semester: string;
  subject: string;
  notes?: string;
  responsible: string;
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
  concluído: {
    icon: Circle,
    color: "text-blue-500",
    bg: "bg-blue-100",
  },
} as const;

export default function CardRequest({
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
  responsible,
}: ReservCardProps) {
  const { icon: StatusIcon, color, bg } = statusConfig[status];

  const onSubmitReprove = () => {
    toast.success(`Reserva #${id} reprovada`);
  };

  const onSubmitAprove = () => {
    toast.success(`Reserva #${id} aprovada`);
  };

  return (
    <div className="w-full p-4 pb-2 md:py-4 md:px-4 mb-4 flex-col flex justify-between items-start bg-card/70 rounded-md shadow-sm hover:-translate-y-1 hover:shadow-lg duration-300">
      <div className="w-full flex gap-3 flex-col justify-center items-start p-0">
        <div className="w-full flex items-start justify-between gap-0 mb-[-0.5rem]">
          <div className="flex flex-col text-base gap-2 text-foreground">
            <div className="text-sm flex gap-1.5 items-center">
              <UserRound size={16} className="opacity-90" /> {responsible}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-base">#{id}</div>
          </div>
        </div>
        <Separator />
        <div className="w-full flex items-start justify-between gap-0">
          <div className="flex flex-col text-sm gap-2 text-foreground ml-[-0.5rem]">
            <div className="flex text-sm gap-2 items-center bg-neutral-100 rounded-md pl-2 px-2">
              <Calendar size={16} strokeWidth={2} className="mb-0.5" />
              <p className="font-medium">{date}</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className={`flex items-center gap-1.5 ml-3 rounded-md px-2 opacity-80 ${bg}`}>
              <StatusIcon size={14} className={color} />
              <p className={`${color} text-sm mb-0.5`}>{status}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-start justify-between gap-0">
          <div className="flex flex-col text-sm gap-2 text-foreground ml-[-0.5rem]">
            <div className="flex text-sm gap-2 items-center bg-neutral-100 rounded-md pl-2 px-2">
              <AlarmClock size={16} strokeWidth={2} className="mb-0.5" />
              <p className="font-medium">{hours}</p>
            </div>
          </div>
          <div className="flex items-center justify-end">
            {isRecurring && (
              <div className="flex items-center gap-2 text-sm text-red-700">
                <Repeat size={14} />
                <span>Recorrente</span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex flex-col text-sm text-foreground">
          <div className="flex text-sm gap-2 text-foreground items-center">{labName}</div>
        </div>

        <div className="w-full flex text-sm text-foreground gap-2 items-start justify-start">
          <div className="flex flex-col text-sm text-foreground gap-1">
            <div className="break-words line-clamp-1">{course}</div>
            <div className="flex gap-1 items-center break-words line-clamp-1">{semester} semestre</div>
            <div className="flex gap-1 items-center break-words line-clamp-1">{subject}</div>
          </div>
        </div>

        {notes && (
          <div className="w-full flex gap-2 items-center text-sm text-foreground line-clamp-2">
            OBS: {notes}
          </div>
        )}
      </div>
      <div className="flex flex-row w-full justify-end items-end text-sm">
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" className="cursor-pointer">
              <CircleX size={18} strokeWidth={2.3} className="text-red-800" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col items-center w-fit p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2 items-center">
                Confirmar Reprovação <CircleX className="text-red-800" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={onSubmitReprove}>Reprovar Reserva</AlertDialogAction>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="ghost" className="cursor-pointer">
              <CircleCheck size={18} strokeWidth={2.3} className="text-emerald-700" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="flex flex-col items-center w-fit p-6">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex gap-2 items-center">
                Confirmar Aprovação <CircleCheck className="text-emerald-700" />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={onSubmitAprove}>Aprovar Reserva</AlertDialogAction>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
