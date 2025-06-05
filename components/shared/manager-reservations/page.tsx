"use client";

import { useState } from "react";
import CardRequest from "./card-request";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockRequests } from "@/data/requests";

export default function ManagerRequests() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = mockRequests
    .filter((reservation) => {
      const searchableContent = Object.values(reservation)
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

  return (
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
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredRequests.map((reservation) => (
            <CardRequest key={reservation.id} {...reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}
