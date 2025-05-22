"use client"

import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import ListReservation from "@/components/shared/reservations/reservations-list/page";

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};
const reservationsData = [
  {
    id: 2,
    date: "15/10/25",
    hours: "2:00 PM - 4:00 PM",
    status: "pendente" as const,
    isRecurring: false,
    labName: "Inovação em Tecnologia e Saúde II",
    labLocal: "B1 A2º S10",
    course: "Engenharia de Software",
    semester: "5º",
    subject: "Inteligência Artificial",
    notes: "Apresentação de projeto",
  },
  {
    id: 3,
    date: "20/11/25",
    hours: "18:00 AM - 12:00 PM",
    status: "reprovado" as const,
    isRecurring: false,
    labName: "Laboratório de Redes",
    labLocal: "B3 A1º S05",
    course: "Sistemas de Informação",
    semester: "4º",
    subject: "Redes de Computadores",
    notes: "Configuração de roteadores",
  },
  {
    id: 4,
    date: "25/11/25",
    hours: "9:00 AM - 11:00 AM",
    status: "cancelado" as const,
    isRecurring: false,
    labName: "Laboratório de Robótica",
    labLocal: "B2 A3º S15",
    course: "Engenharia Mecatrônica",
    semester: "6º",
    subject: "Automação Industrial",
    notes: "Testes com braços robóticos",
  },
  {
    id: 5,
    date: "30/11/25",
    hours: "1:00 PM - 5:00 PM",
    status: "concluído" as const,
    isRecurring: true,
    labName: "Inovação em Tecnologia e Saúde II",
    labLocal: "B2 A3º S10",
    course: "Engenharia Biomédica",
    semester: "3º",
    subject: "Sistemas Embarcados",
    notes: "Apresentação de projetos finais",
  },
  {
    id: 6,
    date: "25/11/25",
    hours: "9:00 AM - 11:00 AM",
    status: "aprovado" as const,
    isRecurring: false,
    labName: "Laboratório de Robótica",
    labLocal: "B2 A3º S15",
    course: "Engenharia Mecatrônica",
    semester: "6º",
    subject: "Automação Industrial",
    notes: "Testes com braços robóticos",
  },
];

export default function MyReservations() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType} reservIsOpen={true} />
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Minhas Reservas"/>
        <ListReservation data={reservationsData} />
      </div>
    </div>
  );
}
