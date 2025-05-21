import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};
const reservation = {
    id: 1,
    date: "12/09/25",
    hours: "12:00 - 22:00",
    status: "aprovado",
    isRecurring: true,
    labName: "Inovação em Tecnologia e Saúde III",
    labLocal: "B2 A3º S12",
    course: "ADS - Análise e Desenvolvimento de Sistemas",
    semester: "1º",
    subject: "POO - Programação Orientada a Objetos",
    notes: "Aula de Herança"
}

export default function MyReservations() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType} reservIsOpen={true} />
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Minhas Reservas"/>
      </div>
    </div>
  );
}
