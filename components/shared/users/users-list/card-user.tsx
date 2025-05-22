"use client";

import { Shield, Pencil, CircleX, Fingerprint, UserRound, Mail, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

type UserCardProps = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    role: "coordenador" | "professor" | "admin";
};

export default function CardUser({
    id,
    name,
    email,
    isActive,
    role,
}: UserCardProps) {
    return (
        <div className="w-full p-4 pb-2 md:py-2 md:px-4 mb-4 flex-col flex md:flex-row justify-center md:justify-between items-start md:items-center bg-card/70 rounded-md shadow-sm">
            <Dialog>
                <div className="col-span-2 flex-1 flex md:pr-4 flex-row justify-between items-center cursor-pointer">
                    <DialogTrigger className="w-full flex flex-row justify-start md:justify-between items-center">
                        <div className="w-full hidden md:flex flex-row justify-between items-center gap-2">
                            <div className="w-20 truncate flex text-sm gap-2 justify-start items-center text-foreground md:pl-2">
                                <Fingerprint size={18} strokeWidth={2} className="text-red-700" />
                                {id}
                            </div>
                            <div className="w-50 truncate flex text-sm gap-2 justify-start items-center text-foreground">
                                <UserRound size={18} strokeWidth={2} className="text-foreground/80" />
                                {name}
                            </div>
                            <div className="w-62 truncate flex text-sm gap-2 justify-start items-center text-foreground">
                                <Mail size={17} strokeWidth={2} className="text-neutral-600" />
                                <p className="mb-0.5">{email}</p>
                            </div>
                            <div className="w-30 truncate flex text-sm gap-2 justify-start items-center text-foreground">
                                <Shield size={18} strokeWidth={2} className="text-primary/90" />
                                {role}
                            </div>
                            <div className="w-32 flex justify-start items-center"></div>
                        </div>
                    </DialogTrigger>
                </div>
            </Dialog>
            <div className="hidden md:flex flex-row justify-between items-center text-base">
                <Switch className="mr-2" checked={isActive} />
                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <KeyRound size={18} strokeWidth={2.3} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <CircleX size={18} strokeWidth={2.3} className="text-red-800" />
                </Button>
            </div>
        </div>
    );
}
