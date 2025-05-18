"use client";
import * as React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const reservation = {
    id: 1,
    date: "12/09/25",
    hours: "12:00 - 22:00",
    status: "aprovado",
    isRecurring: true,
    labName: "Inovação em Tecnologia e Saúde III",
    labLocal: "B2 A3º S12",
    course: "ADS - Análise e Desenvolvimento de Sistemas",
    semester: "1º",
    subject: "POO - Programação Orientada a Objetos",
    notes: "Aula de Herança"
}

export default function ViewReservation() {
    return (
        <DialogContent className="w-170 gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-3">ID #{reservation.id}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">
                <div className="flex flex-row gap-5.5">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Data:</Label>
                                <p>{reservation.date}</p>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Horário:</Label>
                                <p>{reservation.hours}</p>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Status:</Label>
                                <div className="flex w-30 text-base items-center text-foreground gap-2 bg-green-100 rounded-md px-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"><br className="hidden" /></div>
                                    <p className="text-green-500">{reservation.status}</p>
                                </div>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
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
                                <p>{reservation.isRecurring ? "Sim" : "Não"}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label className="text-secondary-foreground font-medium">Laboratório:</Label>
                                <p>{reservation.labName}</p>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Local:</Label>
                                <p>{reservation.labLocal}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label className="text-secondary-foreground font-medium">Curso:</Label>
                                <p>{reservation.course}</p>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label className="text-secondary-foreground font-medium">Período:</Label>
                                <p>{reservation.semester}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-6">
                    <Label className="text-secondary-foreground font-medium">Disciplina:</Label>
                    <p>{reservation.subject}</p>
                </div>
                <div className={`flex flex-col gap-2 w-full mt-6 ${reservation.notes === '' ? 'hidden' : ''}`}>
                    <Label className="text-secondary-foreground font-medium">Observações:</Label>
                    <p>{reservation.notes}</p>
                </div>
                <div className="flex flex-row w-full mt-6 justify-center items-center gap-3">
                    <Button variant="secondary" className="flex-1">Cancelar</Button>
                    <Button className="flex-1">Finalizar</Button>
                </div>
            </div>
        </DialogContent>
    );
}