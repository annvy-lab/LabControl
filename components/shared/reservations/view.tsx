"use client";
import * as React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CircleHelp, CircleX, CircleDashed, CircleCheckBig, CircleOff, Circle, TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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


export default function ViewReservation({ id, date, hours, status, isRecurring, labName, labLocal, course, semester, subject, notes }: ViewReservProps) {
    const { icon: StatusIcon, color, bg } = statusConfig[status];
    return (
        <DialogContent className="gap-4 md:w-150">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-3">ID #{id}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5.5">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="grid grid-cols-4 md:gap-6 gap-6 w-full items-start justify-start">
                            <div className="flex flex-col col-span-2 md:col-span-1 gap-2 justify-start items-start">
                                <Label className="text-secondary-foreground font-medium">Data:</Label>
                                <p>{date}</p>
                            </div>
                            <div className="flex flex-col col-span-2 md:col-span-1 gap-2 justify-start items-start md:ml-[-1.5rem]">
                                <Label className="text-secondary-foreground font-medium">Horário:</Label>
                                <p className="whitespace-nowrap">{hours}</p>
                            </div>
                            <div className="flex flex-col col-span-2 md:col-span-1 gap-2 justify-start items-start md:ml-[-1.5rem]">
                                <Label className="text-secondary-foreground font-medium">Status:</Label>
                                <div className={`flex items-center gap-2 rounded-md w-fit px-2 ${bg}`}>
                                    <StatusIcon size={14} className={color} />
                                    <p className={`${color} text-sm mb-0.5`}>{status}</p>
                                </div>
                            </div>
                            <div className="flex flex-col col-span-2 md:col-span-1 gap-2 justify-start items-start">
                                <div className="flex flex-row gap-2">
                                    <Label className="text-secondary-foreground font-medium">Recorrente:</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <CircleHelp size={16} className="text-muted-foreground" />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>A reserva irá se repetir toda semana, <br />no mesmo dia e horário.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <p>{isRecurring ? "Sim" : "Não"}</p>
                            </div>
                        </div>
                        <Separator className="bg-muted-foreground/60 hidden md:flex" />
                        <div className="grid grid-cols-4 md:gap-6 gap-6 w-full">
                            <div className="flex flex-col col-span-3 gap-2">
                                <Label className="text-secondary-foreground font-medium">Laboratório:</Label>
                                <p>{labName}</p>
                            </div>
                            <div className="flex flex-col col-span-1 md:col-span-1 gap-2">
                                <Label className="text-secondary-foreground font-medium">Local:</Label>
                                <p>{labLocal}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 md:gap-6 gap-6 w-full">
                            <div className="flex flex-col col-span-3 gap-2">
                                <Label className="text-secondary-foreground font-medium">Curso:</Label>
                                <p>{course}</p>
                            </div>
                            <div className="flex flex-col col-span-1 gap-2">
                                <Label className="text-secondary-foreground font-medium">Turma:</Label>
                                <p>{semester}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-6">
                    <Label className="text-secondary-foreground font-medium">Disciplina:</Label>
                    <p>{subject}</p>
                </div>
                <div className={`w-full flex flex-col gap-2 mt-6 ${!notes ? 'hidden' : ''}`}>
                    <Label className="text-secondary-foreground font-medium">Observações:</Label>
                    <p className="w-full break-words ">
                        {notes}
                    </p>
                </div>

                <div className="flex flex-row w-full justify-end items-center gap-3 mt-0">
                    <AlertDialog>
                        <AlertDialogTrigger className="cursor-pointer flex items-center p-2 rounded-lg">
                            <CircleX size={18} strokeWidth={2.4} className="text-red-800" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className="items-center flex gap-2">Você tem certeza disso? <TriangleAlert className="text-red-700" /></AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação é irreversível! Você terá que criar a reserva novamente e aguardar a aprovação do administrador...
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction>Excluir Reserva</AlertDialogAction>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>
            </div>
        </DialogContent>
    );
}