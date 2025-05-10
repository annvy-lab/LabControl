import Sidebar from "@/components/sidebar/page";
import {
  LayoutDashboard,
  AlarmClockPlus,
  List,
  GraduationCap,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const sidebar_items: SidebarItem[] = [
  {
    title: "Início",
    href: "/teacher/dashboard",
    icon: <LayoutDashboard size={22} />,
  },
  {
    title: "Nova Reserva",
    href: "#",
    icon: <AlarmClockPlus size={22} />,
  },
  {
    title: "Minhas Reservas",
    href: "/teacher/reservation",
    icon: <List size={22} />,
  },
  {
    title: "Cursos e Turmas",
    href: "/teacher/courses",
    icon: <GraduationCap size={22} />,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <Sidebar items={sidebar_items} />
    </div>
  );
}
