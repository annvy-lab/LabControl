"use client";
import HeaderPage from "@/components/shared/header-page/page";
import Reservation from "@/components/shared/reservations/reservations-list/reservation"

export default function ListReservation() {
    return (
        <div className="w-full max-w-[75rem] flex flex-col  items-center">
            <HeaderPage title="Minhas Reservas" />
            <div className="w-full max-w-[73rem] flex flex-col  items-center">
                <div className="w-full flex flex-row py-3 pl-4 justify-between items-center">
                    <div className="w-24 truncate flex text-base justify-start text-start items-center text-foreground">
                        Data
                    </div>
                    <div className="w-36 flex justify-start text-start items-center">
                        Horário
                    </div>
                    <div className="w-72 truncate flex justify-start text-base text-start items-center text-foreground">
                        Laboratório
                    </div>
                    <div className="w-22 truncate flex justify-start text-base text-start items-center text-foreground">
                        Local
                    </div>
                    <div className="w-32 flex justify-start text-start items-center">
                        Status
                    </div>
                    <div className="w-31 truncate flex text-base items-center text-foreground">
                        <br className="hidden" />
                    </div>
                </div>
                <Reservation />
            </div>
        </div>
    );
}