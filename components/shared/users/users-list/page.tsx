"use client";

import { useState } from "react";
import CardUser from "@/components/shared/users/users-list/card-user";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { mockUsers } from "@/data/users";

export default function ListUsers() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = mockUsers.filter((user) => {
        const searchableContent = Object.values(user).join(" ").toLowerCase();
        return searchableContent.includes(searchTerm.toLowerCase());
    });

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
                            placeholder="Buscar Usuário..."
                            className="pl-10 bg-primary/10 border-primary/20"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>
              </div>
              <div className="w-full hidden md:flex flex-row py-3 pl-4 items-center justify-end pr-35"></div>
              {filteredUsers.map((user) => (
                  <CardUser key={user.id} {...user} />
              ))}
          </div>
      </div>
  );
}
