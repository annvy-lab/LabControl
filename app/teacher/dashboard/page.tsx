"use client";
import { useState } from 'react';
import Sidebar from "@/components/sidebar/page";
import {
  LayoutDashboard,
  AlarmClockPlus,
  List,
  GraduationCap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Reserva</DialogTitle>
          <DialogDescription>Awawi</DialogDescription>
        </DialogHeader>
      </DialogContent>
    ),
  },
  {
    id: "3",
    title: "Minhas Reservas",
    href: "/teacher/reservation",
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

export default function DashboardPage() {
  const [activeDialogId, setActiveDialogId] = useState<string | null>(null);

  return (
    <div className="flex">
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
  );
}