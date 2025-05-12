"use client";
import HeaderPage from "@/components/header-page/page";
import Reservation from "@/components/list-reservations/reservation"

export default function ListReservation() {
    return (
        <div className="w-full h-screen m-6">
            <HeaderPage title="Minhas Reservas" />
            <div className="flex flex-row py-3 px-4 pr-2 justify-between items-center">
                <div className="w-22 text-base justify-start items-center text-foreground">
                    Data
                </div>
                    <div className="w-38 truncate flex text-base justify-start items-center text-foreground">
                        Horário
                    </div>
                <div className="w-72 flex text-base justify-start items-center text-foreground">
                    Laboratório
                </div>
                <div className="w-20 text-base justify-start items-center text-foreground">
                    Local
                </div>
                <div className="w-32 flex justify-start items-center">
                    Status
                </div>
                <div className="w-30 truncate flex text-base items-center text-foreground">
                    <br className="hidden" />
                </div>
            </div>
           <Reservation/>
        </div>
    );
}