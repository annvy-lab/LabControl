import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import ListReservation from "@/components/shared/reservations/reservations-list/page"

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};

export default function MyReservations() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType} reservIsOpen={true} />
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Minhas Reservas"/>
        <ListReservation />
      </div>
    </div>
  );
}
