"use client";
import * as React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CircleHelp, Pencil, Copy, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

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


export default function ViewReservation({ id, date, hours, status, isRecurring, labName, labLocal, course, semester, subject, notes }: ViewReservProps) {
    return (
        <DialogContent className="w-170 gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-3">ID #{id}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5.5">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 md:col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Data:</Label>
                                <p>{date}</p>
                            </div>
                            <div className="flex flex-col col-span-3 md:col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Horário:</Label>
                                <p>{hours}</p>
                            </div>
                            <div className="flex flex-col col-span-5 md:col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Status:</Label>
                                <div className="flex w-30 text-base items-center text-foreground gap-2 bg-green-100 rounded-md px-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"><br className="hidden" /></div>
                                    <p className="text-green-500">{status}</p>
                                </div>
                            </div>
                            <div className="flex flex-col col-span-3 md:col-span-2 gap-2">
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
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label className="text-secondary-foreground font-medium">Laboratório:</Label>
                                <p>{labName}</p>
                            </div>
                            <div className="flex flex-col col-span-3 md:col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Local:</Label>
                                <p>{labLocal}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label className="text-secondary-foreground font-medium">Curso:</Label>
                                <p>{course}</p>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Período:</Label>
                                <p>{semester}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-6">
                    <Label className="text-secondary-foreground font-medium">Disciplina:</Label>
                    <p>{subject}</p>
                </div>
                <div className={`flex flex-col gap-2 mt-6 ${!notes ? 'hidden' : ''}`}>
                    <Label className="text-secondary-foreground font-medium">Observações:</Label>
                    <p className="break-words whitespace-pre-line">
                        {notes}
                    </p>
                </div>
                <div className="flex flex-row w-full justify-end items-center gap-3 mt-0">
                    <Button variant="secondary">
                        <Pencil size={18} strokeWidth={2.4} className="text-secondary-foreground" />
                    </Button>
                    <Button variant="secondary">
                        <Copy size={18} strokeWidth={2.4} className="text-secondary-foreground" />
                    </Button>
                    <Button variant="secondary">
                        <CircleX size={18} strokeWidth={2.4} className="text-red-800" />
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
}