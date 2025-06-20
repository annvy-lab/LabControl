"use client";

import Link from "next/link";
import { Shield, Pencil, Fingerprint, UserRound, Mail, KeyRound } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";

type UserCardProps = {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
  tipo: string;
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

const tipoLabel: Record<string, string> = {
  reitoria: "Reitoria",
  auditor: "Auditor",
  coordenador_lab: "Coord. Lab.",
  coordenador_curso: "Coord. Curso",
  professor: "Professor",
  tecnico: "Técnico",
};

export default function CardUser({
  id,
  nome,
  email,
  ativo,
  tipo,
}: UserCardProps) {
  return (
    <Card className="w-full p-4 pb-2 md:py-2 md:px-4 mb-0 flex-col flex md:flex-row justify-center md:justify-between items-start md:items-center shadow-sm hover:-translate-y-1 hover:shadow-lg duration-300">
      <Dialog>
        <div className="col-span-2 flex-1 flex md:pr-4 flex-row justify-between items-center cursor-pointer">
          <DialogTrigger asChild className="focus:outline-none">
            <Link
              href={`/admin/users/${id}`}
              className="w-full flex flex-col md:flex-row md:justify-between justify-start items-start md:items-center gap-2"
            >
              <div className="w-20 truncate flex text-sm gap-2 justify-start items-center text-foreground md:pl-2">
                <Fingerprint size={18} strokeWidth={2} className="text-red-700" />
                {id}
              </div>
              <div className="w-50 truncate flex text-sm gap-2 text-start justify-start items-center text-foreground">
                <UserRound size={18} strokeWidth={2} className="text-foreground/80" />
                <p className="truncate">{nome}</p>
              </div>
              <div className="w-fit truncate flex text-sm gap-2 justify-start items-center text-foreground">
                <Mail size={17} strokeWidth={2} className="text-neutral-600" />
                <p className="w-60 mb-0.5 truncate text-start">{email}</p>
              </div>
              <div className="w-30 truncate flex text-sm gap-2 justify-start items-center text-foreground">
                <Shield
                  size={18}
                  strokeWidth={2}
                  className={roleColor[tipo] || "text-primary/90"}
                />
                {/* Se não encontrar o label, mostra o tipo formatado */}
                {tipoLabel[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1).replace(/_/g, " ")}
              </div>
              <div className="w-32 flex justify-start items-center" />
            </Link>
          </DialogTrigger>
        </div>
      </Dialog>
      <div className="w-full md:w-fit flex flex-row justify-end md:justify-between items-center text-base mt-[-1rem] md:mt-0 gap-2 md:gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Switch className="mr-2 mt-2" checked={ativo} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Ativar / Desativar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="cursor-pointer flex items-center p-2 rounded-lg">
          <Pencil size={18} strokeWidth={2.3} className="text-secondary-foreground" />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-pointer flex items-center p-2 rounded-lg">
              <KeyRound size={18} strokeWidth={2.3} className="text-secondary-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Resetar senha</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
}
