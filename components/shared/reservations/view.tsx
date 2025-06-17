"use client";
import * as React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    CircleX, CircleDashed, CircleCheckBig, CircleOff, Circle, Calendar,
    Clock,
    FlaskConical,
    MapPin,
    GraduationCap,
    Users2,
    BookText,
    Info,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ReservationCancelDialog from "./reservation-cancel";

type ViewReservProps = {
    id: number,
    date: string,
    hours: string,
    status: "pendente" | "aprovado" | "reprovado" | "cancelado" | "concluído",
    isRecurring: true,
    labName: string,
    labLocal: string,
    course: string,
    semester: string,
    subject: string,
    notes?: string
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


export default function ViewReservation({ id, date, hours, status, labName, labLocal, course, semester, subject, notes }: ViewReservProps) {
    const { icon: StatusIcon, color, bg } = statusConfig[status];
    return (
        <DialogContent className="gap-4 md:w-150">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-3">
                    ID #{id}
                </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5.5">
                    <div className="flex flex-col gap-5 w-full">
                        {/* GRID 1 */}
                        <div className="grid grid-cols-3 md:gap-6 gap-6 w-full items-start justify-start">
                            <div className="flex flex-col col-span-1 gap-2">
                                <div className="flex gap-1.5 items-center">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Data:</span>
                                </div>
                                <span className="text-foreground/80">{date}</span>
                            </div>
                            <div className="flex flex-col col-span-1 gap-2">
                                <div className="flex gap-1.5 items-center">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Horário:</span>
                                </div>
                                <span className="text-foreground/80 whitespace-nowrap">{hours}</span>
                            </div>
                            <div className="flex flex-col col-span-1 gap-2">
                                <div className="flex gap-1.5 items-center">
                                    <Info className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Status:</span>
                                </div>
                                <div className={`flex items-center gap-2 rounded-md w-fit px-2 ${bg}`}>
                                    <StatusIcon size={14} className={color} />
                                    <span className={`${color} text-sm mb-0.5`}>{status}</span>
                                </div>
                            </div>
                        </div>
                        <Separator className="bg-muted-foreground/60 hidden md:flex h-[0.1px]" />
                        {/* GRID 2 */}
                        <div className="grid grid-cols-3 md:gap-6 gap-6 w-full">
                            <div className="flex flex-col col-span-2 gap-2">
                                <div className="flex gap-1.5 items-center">
                                    <FlaskConical className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Laboratório:</span>
                                </div>
                                <span className="text-foreground/80">{labName}</span>
                            </div>
                            <div className="flex flex-col col-span-1 gap-2 pl-1">
                                <div className="flex gap-1.5 items-center">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Local:</span>
                                </div>
                                <span className="text-foreground/80">{labLocal}</span>
                            </div>
                        </div>
                        {/* GRID 3 */}
                        <div className="grid grid-cols-3 md:gap-6 gap-6 w-full">
                            <div className="flex flex-col col-span-2 gap-2">
                                <div className="flex gap-1.5 items-center">
                                    <GraduationCap className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Curso:</span>
                                </div>
                                <span className="text-foreground/80">{course}</span>
                            </div>
                            <div className="flex flex-col col-span-1 gap-2 pl-1">
                                <div className="flex gap-1.5 items-center">
                                    <Users2 className="h-4 w-4 text-gray-400" />
                                    <span className="text-secondary-foreground font-medium text-sm">Turma:</span>
                                </div>
                                <span className="text-foreground/80">{semester}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-6">
                    <div className="flex gap-1.5 items-center">
                        <BookText className="h-4 w-4 text-gray-400" />
                        <span className="text-secondary-foreground font-medium text-sm">Disciplina:</span>
                    </div>
                    <span className="text-foreground/80">{subject}</span>
                </div>
                <div className={`w-full flex flex-col gap-2 mt-6 mb-2 ${!notes ? "hidden" : ""}`}>
                    <Label className="text-secondary-foreground font-medium text-sm">Observações:</Label>
                    <p className="w-full break-words text-sm text-foreground/70 bg-blue-50 p-2 rounded-lg line-clamp-2">{notes}</p>
                </div>
                <div className="flex flex-row w-full justify-end items-center gap-3 mt-0">
                    <ReservationCancelDialog
                        reservationId={id}
                    />

                </div>
            </div>
        </DialogContent>
    );
}