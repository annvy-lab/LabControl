"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Eye } from "lucide-react";
import { labs as labsData } from "@/data/labs"; 
import ViewLab from "./view-lab";

type Lab = {
  id: number;
  nome: string;
  labLocal: string;
  capacidade: number;
  descricao: string;
};

export default function LabsPage() {
  const [selectedLab, setSelectedLab] = React.useState<Lab | null>(null);

  return (
    
    <div className="p-4 md:p-6">
      <div className="hidden md:grid grid-cols-12 items-center gap-4 w-full px-4 pb-2 border-b">
        <p className="col-span-5 text-sm text-secondary-foreground font-medium">Nome</p>
        <p className="col-span-2 text-sm text-secondary-foreground font-medium">Local</p>
        <p className="pl-10 col-span-3 text-sm text-secondary-foreground font-medium">Capacidade</p>
        <p className="pl-15 col-span-1 text-sm text-secondary-foreground font-medium text-right">Ações</p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {labsData.length === 0 ? (
          <div className="text-center text-muted-foreground mt-8">
            Nenhum laboratório encontrado.
          </div>
        ) : (
          labsData.map((lab) => (
            <Dialog key={lab.id} onOpenChange={(isOpen) => !isOpen && setSelectedLab(null)}>
              <div className="w-full">
                <div className="grid grid-cols-12 items-center gap-4 bg-white p-2 rounded-md shadow-sm w-full hover:bg-gray-50 transition-colors duration-150">
                  
                  <div className="col-span-5">
                    <p className="text-sm text-secondary-foreground">{lab.nome}</p>
                  </div>

                  <div className="col-span-3">
                      <p className="text-sm text-muted-foreground">{lab.labLocal}</p>
                  </div>

                  <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">{lab.capacidade}</p>
                  </div>
                  
                  <div className="col-span-2 flex justify-end items-center gap-2">
                      <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLab(lab)}
                          >
                            <Eye size={18} className="text-sky-600" />
                          </Button>
                      </DialogTrigger>
                      <Button variant="ghost" size="icon">
                          <Pencil size={16} className="text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                          <Trash2 size={16} className="text-red-600" />
                      </Button>
                  </div>
                </div>
              </div>

              {selectedLab?.id === lab.id && (
                <ViewLab
                  id={lab.id}
                  nome={lab.nome}
                  local={lab.labLocal}
                  capacidade={lab.capacidade}
                  descricao={lab.descricao}
                />
              )}
            </Dialog>
          ))
        )}
      </div>
    </div>
  );
}

