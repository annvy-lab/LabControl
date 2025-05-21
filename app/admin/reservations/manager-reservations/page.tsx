import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};

export default function ManagerReservations() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType} reservIsOpen={true}/>
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Gerenciar Reservas"/>
      </div>
    </div>
  );
}
