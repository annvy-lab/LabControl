"use client";

import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import CardUser from "@/components/shared/users/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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

  useEffect(() => {
    axiosClient.get("/users")
      .then((res) => setUsers(res.data))
      .catch(() => console.error("Erro ao carregar usuários"))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchableContent = Object.values(user).join(" ").toLowerCase();
    return searchableContent.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Usuários" />
        <div className="w-full flex flex-col items-center max-w-270 self-center">
          <div className="w-full flex flex-col items-center">
            <div className="flex w-full self-start relative md:mb-1 mb-4 gap-4 md:gap-6">
              <div className="flex w-full items-start">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  type="text"
                  placeholder="Buscar Usuário..."
                  className="pl-10 bg-primary/10 border-primary/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full hidden md:flex flex-row py-3 pl-4 items-center justify-end pr-35"></div>

            {loading ? (
              <p className="text-muted-foreground">Carregando usuários...</p>
            ) : (
              filteredUsers.map((user) => (
                <CardUser
                  key={user.idUsuario}
                  id={user.idUsuario}
                  nome={user.nome}
                  email={user.email}
                  tipo={user.tipo}
                  ativo={user.ativo}
                  data_criacao={user.data_criacao}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
