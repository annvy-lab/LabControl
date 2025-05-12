"use client";
import HeaderPage from "@/components/header-page/page";
import Reservation from "@/components/list-reservations/reservation"

export default function ListReservation() {
    return (
        <div className="w-full max-w-[75rem] flex flex-col  items-center">
            <HeaderPage title="Minhas Reservas" />
            <div className="w-full max-w-[73rem] flex flex-col  items-center">
                <div className="w-full flex flex-row py-3 pr-2 justify-between items-center">
                    <div className="w-22 truncate flex text-base justify-center items-center text-foreground">
                        Data
                </div>
                    <div className="flex items-center">
                        Horário
                    </div>
                    <div className="w-72 truncate flex text-base items-center text-foreground">
                        Laboratório
                </div>
                    <div className="w-20 truncate flex text-base items-center text-foreground">
                        Local
                </div>
                    <div className="w-32 flex justify-center items-center">
                        Status
                    </div>
                    <div className="flex items-center">
                        <div className="w-30 truncate flex text-base items-center text-foreground">
                            <br className="hidden" />
                        </div>
                    </div>
                </div>
                <Reservation />
            </div>
        </div>
    );
}