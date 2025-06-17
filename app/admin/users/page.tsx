"use client";

import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import CardUser from "@/components/shared/users/card";
import { UserRoundX, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Usuario = {
  idUsuario: number;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
  data_criacao: string;
};

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    axiosClient.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => console.error("Erro ao carregar usuários"))
      .finally(() => setLoading(false));
  }, [router]);

  const filteredUsers = users.filter((user) => {
    const searchableContent = Object.values(user).join(" ").toLowerCase();
    return searchableContent.includes(searchTerm.toLowerCase());
  });

  if (loading) return <br />;

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2 w-full">
        <HeaderPage title="Usuários" />
        <div className="w-full flex flex-col items-center max-w-270 self-center">
          <div className="flex w-full self-start relative mb-5 gap-4 md:gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, e-mail ou tipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 py-2 rounded-md bg-primary/10 border border-primary/20 w-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-4 py-2 border border-muted rounded-lg mb-1">
            <div className="grid grid-cols-12 items-center">
              <span className="col-span-1 text-sm text-foreground">ID</span>
              <span className="col-span-3 text-sm text-foreground ml-2">Nome</span>
              <span className="col-span-3 text-sm text-foreground">E-mail</span>
              <span className="col-span-2 text-sm text-foreground">Tipo</span>
              <span className="col-span-1 text-sm text-foreground">Ativo</span>
              <span className="col-span-2 text-sm text-foreground text-right pr-4">Criado em</span>
            </div>
          </div>
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center">
              <UserRoundX size={70} strokeWidth={1.2} className="text-muted-foreground" />
              Nenhum usuário encontrado.
            </div>
          ) : (
              <div className="w-full flex flex-col gap-4">
                {filteredUsers.map((user) => (
                <CardUser
                  key={user.idUsuario}
                  id={user.idUsuario}
                  nome={user.nome}
                  email={user.email}
                  tipo={user.tipo}
                  ativo={user.ativo}
                  data_criacao={user.data_criacao}
                />
                ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
