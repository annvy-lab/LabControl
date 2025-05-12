"use client";
import { useState } from 'react';
import Sidebar from "@/components/sidebar/page";
import ListReservation from "@/components/list-reservations/page"
import NewReservation from "@/components/new-reservation/page";
import {
  LayoutDashboard,
  AlarmClockPlus,
  List,
  GraduationCap,
} from "lucide-react";
import {
  Dialog,
} from "@/components/ui/dialog";

interface SidebarItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ReactNode;
  isDialog?: boolean;
  dialogContent?: React.ReactNode;
}

export const sidebar_items: SidebarItem[] = [
  {
    id: "1",
    title: "Início",
    href: "/teacher/dashboard",
    icon: <LayoutDashboard size={22} />,
    isDialog: false,
  },
  {
    id: "2",
    title: "Nova Reserva",
    icon: <AlarmClockPlus size={22} />,
    isDialog: true,
    dialogContent: (
      <NewReservation />
    ),
  },
  {
    id: "3",
    title: "Minhas Reservas",
    href: "/teacher/list",
    icon: <List size={22} />,
    isDialog: false,
  },
  {
    id: "4",
    title: "Cursos e Turmas",
    href: "/teacher/courses",
    icon: <GraduationCap size={22} />,
    isDialog: false,
  },
];

export default function TeacherListReservation() {
  const [activeDialogId, setActiveDialogId] = useState<string | null>(null);

  return (
    <div className="flex flex-row">
      <div>
        <Sidebar
          items={sidebar_items}
          onDialogOpen={(id) => setActiveDialogId(id)}
        />
        {sidebar_items.map((item) => (
          item.dialogContent && (
            <Dialog
              key={item.id}
              open={activeDialogId === item.id}
              onOpenChange={(open) => setActiveDialogId(open ? item.id : null)}
            >
              {item.dialogContent}
            </Dialog>
          )
        ))}
      </div>
      <div className='w-full flex m-6 justify-center'>
      <ListReservation />
      </div>
    </div>
  );
}