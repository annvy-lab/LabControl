import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};

export default function Dashboard() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType}/>
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Dashboard"/>
      </div>
    </div>
  );
}
