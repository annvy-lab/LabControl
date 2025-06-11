"use client";

import * as React from "react";
import { LogOut, LayoutPanelLeft, AlarmClockPlus, CalendarClock, BookCheck, UsersRound, GraduationCap, Clock, ChevronsUpDown, FlaskConical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FormsReservation from "@/components/shared/reservations/form.";
import { mockAuthUser } from "@/data/authUser";
import Link from "next/link";

type SideBarProps = {
  sectionIsOpen?: boolean;
};

export default function SideBar({ sectionIsOpen = false }: SideBarProps) {
  const [isOpen, setIsOpen] = React.useState(sectionIsOpen);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className="hidden md:flex flex-col w-72 justify-between min-h-lvh px-1 pt-1 overflow-hidden 
        bg-sidebar text-background transition-all duration-500"
    >
      <div>
        <header className="w-full flex flex-col">
          <div className="flex items-center justify-start p-4 px-2.5 w-full h-18 gap-5.5">
            <Avatar className="mt-0.5">
              <AvatarImage alt="foto de perfil" />
              <AvatarFallback className="text-muted-foreground font-bold tracking-tighter">
                A
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium whitespace-nowrap">{mockAuthUser.name}</p>
              <p className="text-xs font-medium whitespace-nowrap opacity-85">{mockAuthUser.type}</p>
            </div>
          </div>
          <Separator />
        </header>
        <div className="flex flex-col p-4 h-fit gap-3 pt-6">
          <a href="/admin/dashboard" className="flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75 focus:outline-none">
            <LayoutPanelLeft size={20} />
            <div>Dashboard</div>
          </a>
          <div className="flex flex-col gap-1">
            <Collapsible open={isOpen}>
              <CollapsibleTrigger onClick={handleToggle} className="focus:outline-none flex gap-6 w-54 min-h-10 items-center justify-start text-sm mb-0">
                <Clock size={20} />
                <div className="flex w-40 items-center justify-between cursor-pointer focus:outline-none">
                  Reservas <ChevronsUpDown size={16} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2 ml-[0.6rem] data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up border-l-1 border-card/60 focus:outline-none">
                <Dialog>
                  <DialogTrigger className="focus:outline-none">
                    <div className="flex gap-4 w-51 h-8 items-center mt-1 justify-start pl-4 text-xs rounded-[0.30rem] hover:border-r-4 transition-all duration-75 focus:outline-none">
                      <AlarmClockPlus size={18} />
                      <div>Nova Reserva</div>
                    </div>
                  </DialogTrigger>
                  <FormsReservation />
                </Dialog>
                <a href="/admin/reservations/my-reservations" className="focus:outline-none flex gap-4 w-51 h-8 items-center justify-start text-xs pl-4 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
                  <CalendarClock size={18} />
                  <div>Minhas Reservas</div>
                </a>
                <a href="/admin/reservations/requests" className="focus:outline-none flex gap-4 w-51 h-8 items-center justify-start text-xs pl-4 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
                  <BookCheck size={18} />
                  <div>Gerenciar Reservas</div>
                </a>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <a href="/admin/laboratories" className="focus:outline-none flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <FlaskConical size={20} />
            <div>Laboratórios</div>
          </a>
          <a href="/admin/cousers" className="focus:outline-none flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <GraduationCap size={20} />
            <div>Cursos</div>
          </a>
          <Link href="/admin/users" className="focus:outline-none flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <UsersRound size={20} />
            <div>Usuários</div>
          </Link>
        </div>
      </div>
      <footer className="w-full flex flex-col gap-2">
        <Separator />
        <div className="flex p-3 px-2.5 gap-7 w-50 items-center justify-start text-sm">
          <LogOut size={22} />
          Sair
        </div>
      </footer>
    </div>
  );
}
