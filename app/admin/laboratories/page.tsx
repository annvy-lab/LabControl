"use client";
import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import { useRouter } from "next/navigation";
import { FlaskConicalOff, Search } from "lucide-react";
import CardLaboratory from "@/components/shared/laboratories/card";
import { Input } from "@/components/ui/input";

type Laboratory = {
  idLaboratorio: number;
  nome: string;
  tipo: string;
  capacidade: number;
  localizacao: string;
  Area?: { nome: string };
};

export default function Laboratories() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }
    axiosClient
      .get("/lab/labs")
      .then((res) => setLaboratories(res.data))
      .catch(() => console.error("Erro ao carregar laboratórios"))
      .finally(() => setLoading(false));
  }, [router]);

  const filteredLabs = laboratories.filter((lab) => {
    const content = Object.values(lab).join(" ").toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  if (loading) return <br />;

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2 w-full">
        <HeaderPage title="Laboratórios" />
        <div className="w-full flex flex-col items-center max-w-270 self-center pb-25">
          <div className="flex w-full self-start relative mb-5 gap-4 md:gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, tipo, área ou local..."
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
              <span className="col-span-2 text-sm text-foreground">Tipo</span>
              <span className="col-span-2 text-sm text-foreground">Capacidade</span>
              <span className="col-span-2 text-sm text-foreground">Área</span>
              <span className="col-span-2 text-sm text-foreground text-right pr-4">Local</span>
            </div>
          </div>
          {filteredLabs.length === 0 ? (
            <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center">
              <FlaskConicalOff size={65} strokeWidth={1.2} className="text-muted-foreground" />
              Nenhum laboratório encontrado.
            </div>
          ) : (
              <div className="w-full flex flex-col gap-4">
              {filteredLabs.map((lab) => (
                <CardLaboratory
                  key={lab.idLaboratorio}
                  id={lab.idLaboratorio}
                  nome={lab.nome}
                  tipo={lab.tipo}
                  capacidade={lab.capacidade}
                  localizacao={lab.localizacao}
                  areaNome={lab.Area?.nome}
                />
              ))}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
