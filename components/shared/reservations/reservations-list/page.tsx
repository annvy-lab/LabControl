"use client";

import CardReservation from "@/components/shared/reservations/reservations-list/card-reservation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const reservationsData = [
    {
        id: 1,
        date: "12/09/25",
        hours: "12:00 - 22:00",
        status: "aprovado" as const,
        isRecurring: true,
        labName: "Inovação em Tecnologia e Saúde III",
        labLocal: "B2 A3º S12",
        course: "ADS - Análise e Desenvolvimento de Sistemas",
        semester: "1º",
        subject: "POO - Programação Orientada a Objetos",
        notes: "Aula de Herança",
    },
    {
        id: 2,
        date: "15/10/25",
        hours: "14:00 - 16:00",
        status: "pendente" as const,
        isRecurring: false,
        labName: "Laboratório de IA",
        labLocal: "B1 A2º S10",
        course: "Engenharia de Software",
        semester: "5º",
        subject: "Inteligência Artificial",
        notes: "Apresentação de projeto",
    },
    ,
    {
        id: 3,
        date: "15/10/25",
        hours: "14:00 - 16:00",
        status: "wiiwiwi" as const,
        isRecurring: false,
        labName: "WIIKWI",
        labLocal: "B1 A2º S10",
        course: "Engenharia de Software",
        semester: "5º",
        subject: "Inteligência Artificial",
        notes: "Apresentação de projeto",
    }
];

export default function ListReservation() {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
                <div className="w-full hidden md:flex flex-row py-3 pl-4 items-center">
                    <div className="w-34 truncate flex text-base justify-start text-start items-center text-foreground">
                        Data
                    </div>
                    <div className="w-48 flex justify-start text-start items-center">
                        Horário
                    </div>
                    <div className="w-81 truncate flex justify-start text-base text-start items-center text-foreground">
                        Laboratório
                    </div>
                    <div className="w-33 truncate flex justify-start text-base text-start items-center text-foreground">
                        Local
                    </div>
                    <div className="w-32 flex justify-start text-start items-center">
                        Status
                    </div>
                    <div className="w-31 truncate flex text-base items-center text-foreground">
                        <br className="hidden" />
                    </div>
                </div>

                <div className="flex w-full relative mt-1 mb-6">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Buscar Reserva..."
                        className="pl-10 bg-primary/10 border-primary/20"
                    />
                </div>

                {reservationsData.map((reservation) => (
                    <CardReservation key={reservation.id} {...reservation} />
                ))}
            </div>
        </div>
    );
}
