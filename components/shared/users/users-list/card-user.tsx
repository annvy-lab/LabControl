"use client";

import Link from "next/link";
import { Shield, Pencil, Fingerprint, UserRound, Mail, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type UserCardProps = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    role: "Coordenador" | "Professor" | "Admin" | "Técnico";
};

export default function CardUser({
    id,
    name,
    email,
    isActive,
    role,
}: UserCardProps) {
    const roleColor = role === "Admin"
        ? "text-red-600"
        : role === "Coordenador"
            ? "text-yellow-500"
            : role === "Técnico"
                ? "text-gray-500"
                : "text-primary/90";

    return (
        <div className="w-full p-4 pb-2 md:py-2 md:px-4 mb-4 flex-col flex md:flex-row justify-center md:justify-between items-start md:items-center bg-card/70 rounded-md shadow-sm">
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
                                <p className="truncate">{name}</p>
                            </div>
                            <div className="w-fit truncate flex text-sm gap-2 justify-start items-center text-foreground">
                                <Mail size={17} strokeWidth={2} className="text-neutral-600" />
                                <p className="w-60 mb-0.5 truncate text-start">{email}</p>
                            </div>
                            <div className="w-30 truncate flex text-sm gap-2 justify-start items-center text-foreground">
                                <Shield size={18} strokeWidth={2} className={roleColor} />
                                {role}
                            </div>
                            <div className="w-32 flex justify-start items-center"></div>
                        </Link>
                    </DialogTrigger>
                </div>
            </Dialog>
            <div className="w-full md:w-fit flex flex-row justify-end md:justify-between items-center text-base mt-[-1rem] md:mt-0 gap-2 md:gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Switch className="mr-2 mt-2" checked={isActive} />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Ativar / Desativar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button variant="ghost">
                                <KeyRound size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Resetar senha</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
}
