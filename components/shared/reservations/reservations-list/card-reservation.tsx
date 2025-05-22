"use client";

import { Clock, AlarmClock, Pencil, Copy, CircleX, CircleDashed, CircleCheckBig, CircleOff, Circle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import ViewReservation from "@/components/shared/reservations/view-reservation";

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
};

const statusConfig = {
    pendente: {
        icon: CircleDashed,
        color: "text-yellow-500",
        bg: "bg-yellow-100"
    },
    aprovado: {
        icon: CircleCheckBig,
        color: "text-green-500",
        bg: "bg-green-100"
    },
    reprovado: {
        icon: CircleX,
        color: "text-red-500",
        bg: "bg-red-100"
    },
    cancelado: {
        icon: CircleOff,
        color: "text-gray-500",
        bg: "bg-gray-100"
    },
    concluído: {
        icon: Circle,
        color: "text-blue-500",
        bg: "bg-blue-100"
    }
} as const;

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
}: ReservCardProps) {
    const { icon: StatusIcon, color, bg } = statusConfig[status];

    return (
        <div className="w-full p-4 pb-2 md:py-2 md:px-4 mb-4 flex-col flex md:flex-row justify-center md:justify-between items-start md:items-center bg-card/70 rounded-md shadow-sm">
            <Dialog>
                <div className="col-span-2 flex-1 flex md:pr-4 flex-row justify-between items-center cursor-pointer">
                    <DialogTrigger className="w-full flex flex-row justify-start md:justify-between items-center">
                        <div className="w-full hidden md:flex flex-row justify-between items-center">
                            <div className="w-20 truncate flex text-sm justify-start items-center text-foreground md:pl-2">
                                {date}
                            </div>
                            <div className="w-43 flex items-center">
                                <div className="w-fit truncate flex text-sm justify-start items-center gap-2 text-foreground bg-primary/10 rounded-md py-0.5 px-2">
                                    <Clock size={14} strokeWidth={2} className="mb-0.5" />
                                    <p className="mb-0.5">{hours}</p>
                                </div>
                            </div>
                            <div className="w-74 truncate overflow-hidden whitespace-nowrap text-sm flex justify-start text-start items-center text-foreground">
                                {labName}
                            </div>

                            <div className="w-18 truncate flex text-sm items-center text-foreground">
                                {labLocal}
                            </div>
                            <div className="w-32 flex justify-start items-center">
                                <div className={`flex items-center gap-1.5 rounded-md px-2 ${bg}`}>
                                    <StatusIcon size={14} className={color} />
                                    <p className={`${color} text-sm mb-0.5`}>{status}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex md:hidden gap-2 flex-col justify-center items-start p-0">
                            <div className="w-full flex items-start justify-between mr-0 pl-0 gap-3">
                                <div className="flex flex-col text-base gap-1 justify-center items-start text-foreground">
                                    <div className="flex text-base items-start text-foreground text-start">
                                        {date}
                                    </div>
                                    <div className="truncate flex text-sm justify-center items-center gap-2 text-foreground bg-neutral-100 rounded-md pl-2 px-2 ml-[-0.5rem]">
                                        <AlarmClock size={14} strokeWidth={2} className="mb-0.5" />
                                        <p>{hours}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className={`flex items-center gap-1.5 ml-3 rounded-md px-2 ${bg}`}>
                                        <StatusIcon size={14} className={color} />
                                        <p className={`${color} text-sm mb-0.5`}>{status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full truncate flex flex-col text-base items-center text-foreground text-start">
                                <div className="w-full self-start break-words text-base flex items-center text-foreground">
                                {labName}
                                </div>
                                <div className="w-full truncate flex gap-1 text-sm items-center text-foreground/70 text-start">
                                    <MapPin size={14} /> {labLocal}
                                </div>
                            </div>
                        </div>
                    </DialogTrigger>
                </div>
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
            <div className="hidden md:flex flex-row justify-between items-center text-base">
                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <Copy size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <CircleX size={18} strokeWidth={2.3} className="text-red-800" />
                </Button>
            </div>
            <div className="md:hidden flex flex-row w-full mt-[-1rem] justify-end items-end text-base">
                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <Copy size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <CircleX size={18} strokeWidth={2.3} className="text-red-800" />
                </Button>
            </div>
        </div>
    );
}
