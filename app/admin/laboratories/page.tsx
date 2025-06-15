"use client";
import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import { useRouter } from "next/navigation";
import { UserRoundX } from "lucide-react";
import CardLaboratory from "@/components/shared/laboratories/card";

type Laboratory = {
  idLaboratorio: number;
  nome: string;
  localizacao: string;
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

    axiosClient.get("/lab/labs")
      .then((res) => setLaboratories(res.data))
      .catch(() => console.error("Erro ao carregar laboratórios"))
      .finally(() => setLoading(false));
  }, [router]);

  const filteredLabs = laboratories.filter((lab) => {
    const content = Object.values(lab).join(" ").toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  if (loading) return;

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Laboratórios" />
        <div className="w-full flex flex-col items-center max-w-270 self-center">
          <div className="flex w-full self-start relative md:mb-1 mb-4 gap-4 md:gap-6">
            <input
              type="text"
              placeholder="Buscar Laboratório..."
              className="pl-4 py-2 rounded-md bg-primary/10 border border-primary/20 w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredLabs.length === 0 ? (
            <div className="flex flex-col gap-2 text-muted-foreground mt-6 items-center justify-center">
              <UserRoundX size={70} strokeWidth={1.2} />
              Nenhum laboratório encontrado.
            </div>
          ) : (
            <>
              <CardLaboratory showHeader={true} />
              {filteredLabs.map((lab) => (
                <CardLaboratory
                  key={lab.idLaboratorio}
                  id={lab.idLaboratorio}
                  nome={lab.nome}
                  localizacao={lab.localizacao}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}