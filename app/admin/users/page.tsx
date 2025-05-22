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
    role: "coordenador" as const,
  },
  {
    id: 222276,
    name: "Gabriel Babaka da Silva",
    email: "emaildogabriel@gmail.com",
    isActive: false,
    role: "professor" as const,
  },
];

export default function Users() {
  return (
    <div className="w-screen flex items-start">
      <Sidebar userName={userData.userName} userType={userData.userType} />
      <div className="w-full flex flex-col items-start px-7 py-3 gap-2">
      <HeaderPage title="Usuários"/>
        <ListUsers data={usersData} />
      </div>
    </div>
  );
}
