"use client"
import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import { useEffect, useState } from "react";
import axios from "axios";
import CardRequest from "@/components/shared/manager-reservations/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

type Request = {
  id: number;
  date: string;
  hours: string;
  status: "pendente" | "aprovado" | "reprovado" | "cancelado" | "concluído";
  isRecurring: boolean;
  labName: string;
  labLocal: string;
  course: string;
  semester: string;
  subject: string;
  notes?: string;
  responsible: string;
};

export default function ManagerReservations() {
    const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/reservations/pending")
      .then((res) => setRequests(res.data))
      .catch(() => console.error("Erro ao carregar solicitações"))
      .finally(() => setLoading(false));
  }, []);

  const filteredRequests = requests
    .filter((request) => {
      const searchableContent = Object.values(request)
        .join(" ")
        .toLowerCase();
      return searchableContent.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) =>
      a.status === "pendente" && b.status !== "pendente"
        ? -1
        : b.status === "pendente" && a.status !== "pendente"
        ? 1
        : 0
    );

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return;
  return (
    <div className="w-screen h-screen flex">
      <SideBar sectionIsOpen={true} />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Gerenciar Reservas" />
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
              placeholder="Buscar Solicitação..."
              className="pl-10 bg-primary/10 border-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <br className="mb-16" />
        {loading ? (
          <p className="text-muted-foreground">Carregando solicitações...</p>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredRequests.map((reservation) => (
              <CardRequest key={reservation.id} {...reservation} />
            ))}
          </div>
        )}
      </div>
    </div>
      </div>
    </div>
  );
}
