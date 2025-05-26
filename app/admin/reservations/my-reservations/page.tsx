"use client";

import SideBar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import ListReservation from "@/components/shared/reservations/reservations-list/page";

export default function MyReservations() {
  return (
    <div className="w-screen h-screen flex">
      <SideBar sectionIsOpen={true} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Minhas Reservas" />
        <ListReservation />
      </div>
    </div>
  );
}
