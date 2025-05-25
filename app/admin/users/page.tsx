import Sidebar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import ListUsers from "@/components/shared/users/users-list/page"

const userData = {
  userName: "Lilinha da Silva",
  userType: "Coordenador",
};

const usersData = [
  {
    id: 222222,
    name: "Lilinha da Silva Soares",
    email: "emaildalilinha66@gmail.com",
    isActive: true,
    role: "Coordenador" as const,
  },
  {
    id: 222276,
    name: "Gabriel Babaka da Silva",
    email: "emaildogabriel@gmail.com",
    isActive: false,
    role: "Professor" as const,
  },
  {
    id: 222255,
    name: "Icaro Michael Salvino",
    email: "emaildoicaromichael@gmail.com",
    isActive: true,
    role: "Admin" as const,
  },
  {
    id: 222275,
    name: "Maria do Rosário",
    email: "emaildamariachael@gmail.com",
    isActive: true,
    role: "Técnico" as const,
  },
];

export default function Users() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar userName={userData.userName} userType={userData.userType} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
      <HeaderPage title="Usuários"/>
        <ListUsers data={usersData} />
      </div>
    </div>
  );
}
