"use client";

import CardReservation from "@/components/shared/reservations/reservations-list/card-reservation";
import { Input } from "@/components/ui/input";
import { Search, AlarmClockPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FormsReservation from "@/components/shared/reservations/reservation-forms/page";
import { mockReservations } from "@/data/reservations";

export default function ListReservation() {
    return (
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
                        />
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="default" className="hidden md:flex">
                                <AlarmClockPlus /> Nova Reserva
                            </Button>
                            <Button variant="default" className="flex md:hidden">
                                <AlarmClockPlus />
                            </Button>
                        </DialogTrigger>
                        <FormsReservation />
                    </Dialog>
                </div>
                <div className="w-full hidden md:flex flex-row py-3 pl-4 items-center">
                    <div className="w-30 truncate pl-1 flex text-sm justify-start text-start items-center text-foreground">
                        Data
                    </div>
                    <div className="w-45 flex text-sm justify-start text-start items-center">
                        Horário
                    </div>
                    <div className="w-81 truncate flex justify-start text-sm text-start items-center text-foreground">
                        Laboratório
                    </div>
                    <div className="w-32 pl-3 truncate flex justify-start text-sm text-start items-center text-foreground">
                        Local
                    </div>
                    <div className="w-32 text-sm flex justify-start text-start items-center">
                        Status
                    </div>
                    <div className="w-31 truncate flex text-sm items-center text-foreground">
                        <br className="hidden" />
                    </div>
                </div>

                {mockReservations.map((reservation) => (
                    <CardReservation key={reservation.id} {...reservation} />
                ))}
            </div>
        </div>
    );
}
