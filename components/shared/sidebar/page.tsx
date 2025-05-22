"use client";

import * as React from "react";
import { LogOut, LayoutPanelLeft, AlarmClockPlus, CalendarClock, BookCheck, UsersRound, School, GraduationCap, Clock, ChevronsUpDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import FormsReservation from "@/components/shared/reservations/reservation-forms/page"


type SideBarProps = {
  userName: string;
  userType: string;
  reservIsOpen?: boolean;
};

export default function SideBar({ userName, userType, reservIsOpen }: SideBarProps) {
  const [isOpen, setIsOpen] = React.useState(reservIsOpen);

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
              <p className="text-sm font-medium whitespace-nowrap">{userName}</p>
              <p className="text-xs font-medium whitespace-nowrap opacity-85">{userType}</p>
            </div>
          </div>
          <Separator />
        </header>
        <div className="flex flex-col p-4 h-[100%] gap-3 pt-6">
          <a href="/admin/dashboard" className="flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <LayoutPanelLeft size={20} />
            <div>Dashboard</div>
          </a>
          <div className="flex flex-col gap-1">
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger className="flex gap-6 w-54 min-h-10 items-center justify-start text-sm mb-0">
                <Clock size={20} />
                <div className="flex w-40 items-center justify-between cursor-pointer">
                  Reservas <ChevronsUpDown size={16} />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2 ml-[0.6rem] data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up border-l-1 border-card/60">
                <Dialog>
                  <DialogTrigger>
                    <div className="flex gap-4 w-51 h-10 items-center mt-1 justify-start pl-4 text-xs rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
                      <AlarmClockPlus size={18} />
                      <div>Nova Reserva</div>
                    </div>
                  </DialogTrigger>
                  <FormsReservation />
                </Dialog>
                <a href="/admin/reservations/my-reservations" className="flex gap-4 w-51 h-10 items-center justify-start text-xs pl-4 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
                  <CalendarClock size={18} />
                  <div>Minhas Reservas</div>
                </a>
                <a href="/admin/reservations/manager-reservations" className="flex gap-4 w-51 h-10 items-center justify-start text-xs pl-4 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
                  <BookCheck size={18} />
                  <div>Gerenciar Reservas</div>
                </a>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <a href="/admin/cousers" className="flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <GraduationCap size={20} />
            <div>Cursos e Disciplinas</div>
          </a>
          <a href="/admin/users" className="flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <UsersRound size={20} />
            <div>Usuários</div>
          </a>
          <a href="/admin/institution" className="flex gap-6 w-54 h-10 items-center justify-start text-sm mb-1 rounded-[0.30rem] hover:border-r-4 transition-all duration-75">
            <School size={20} />
            <div>Instituição</div>
          </a>
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
