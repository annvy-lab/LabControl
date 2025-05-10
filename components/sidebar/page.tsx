"use client";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
export default function Sidebar({
  items,
}: {
  items: Array<{ href: string; icon: React.ReactNode; title: string }>;
}) {
  return (
    <div className="flex flex-col justify-between w-60 min-h-lvh items-right px-2 overflow-hidden bg-[var(--sidebar)] text-[var(--background)]">
      <div>
        <header className="w-full h-20 gap-5">
          <div className="flex items-center p-4 px-2.5 w-full h-20 gap-5.5">
            <Avatar>
              <AvatarImage alt="foto de perfil" />
              <AvatarFallback className="text-[var(--primary)] font-bold tracking-tighter">
                AWA
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">User Tal</p>
          </div>
          <Separator />
        </header>
        <div className="p-4 h-[100%] gap-4 pt-9">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex gap-7 w-50 h-10 items-center justify-start mb-5 text-sm hover:border-r-3"
            >
              <div className="text-3xl">{item.icon}</div>
              <div>{item.title}</div>
            </a>
          ))}
        </div>
      </div>
      <footer className="w-full h-15">
        <Separator />
        <div className="flex items-center p-4 px-2 w-full h-15 gap-6">
          <LogOut size={22} /> Sair
        </div>
      </footer>
    </div>
  );
}
