"use client";

import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import { Fingerprint, UserRound, Shield, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";

type Usuario = {
  idUsuario: number;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
  data_criacao: string;
};

const roleColor: Record<string, string> = {
  reitoria: "text-red-600",
  auditor: "text-red-600",
  coordenador_lab: "text-yellow-500",
  coordenador_curso: "text-yellow-500",
  professor: "text-primary/90",
  tecnico: "text-gray-500",
};

function formatTipo(tipo: string) {
  return tipo.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function ManagerUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }
    axiosClient.get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id, router]);

  if (loading) return null;
  if (!user) return <div className="p-8">Usuário não encontrado.</div>;

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2 w-full">
        <HeaderPage title={`Usuário: ${user.nome || "Não identificado"}`} />
        <div className="w-full min-w-0 grid md:grid-cols-12 grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Fingerprint size={18} strokeWidth={2} className="text-red-700" />
              R.A
            </div>
            <Input value={user.idUsuario} className="bg-card" readOnly />
          </div>
          <div className="col-span-4 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <UserRound size={18} strokeWidth={2} className="text-foreground/80" />
              Nome
            </div>
            <Input value={user.nome} className="bg-card" readOnly />
          </div>
          <div className="col-span-3 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Shield size={18} strokeWidth={2} className={roleColor[user.tipo] || "text-primary/90"} />
              Tipo
            </div>
            <Input value={formatTipo(user.tipo)} className="bg-card" readOnly />
          </div>
          <div className="col-span-3 flex flex-col gap-2">
            <div className="flex gap-2 items-center text-secondary-foreground/80">
              <Mail size={17} strokeWidth={2} className="text-neutral-600" />
              Email
            </div>
            <Input value={user.email} className="bg-card" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}
