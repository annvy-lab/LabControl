"use client";
import { useState } from "react";
import { LogOut, ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  items: {
    id: string;
    title: string;
    href?: string;
    icon: React.ReactNode;
    isDialog?: boolean;
  }[];
  onDialogOpen: (id: string) => void;
}

export default function Sidebar({ items, onDialogOpen }: SidebarProps) {
  const [isClosed, setIsClosed] = useState(false);

  const toggleSidebar = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div
      className={`flex flex-col justify-between min-h-lvh items-right px-2 overflow-hidden 
        bg-[var(--sidebar)] text-[var(--background)] transition-all duration-500
        ${isClosed ? "w-18" : "w-60"}`}
    >
      <div>
        <header className="w-full h-20 gap-5">
          <div className="flex items-center p-4 px-2.5 w-full h-20 gap-5.5">
            <Avatar>
              <AvatarImage alt="foto de perfil" />
              <AvatarFallback className="text-[var(--primary)] font-bold tracking-tighter">
                AWA
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium whitespace-nowrap">User Tal</p>
            <Button
              onClick={toggleSidebar}
              className={`absolute w-6 h-6 bg-[var(--sidebar)] rounded-full hover:bg-[var(--sidebar)] cursor-pointer transition-all duration-500 ${isClosed ? 'left-14' : 'left-56'
                }`}
            >
              {isClosed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
            </Button>
          </div>
          <Separator />
        </header>
        <div className="p-4 h-[100%] gap-4 pt-9 pr-1">
          {items.map((item) => (
            item.isDialog ? (
              <div
                key={item.id}
                onClick={() => onDialogOpen(item.id)}
                className="flex gap-7 w-53 h-10 items-center justify-start mb-5 text-sm rounded-[0.20rem] hover:border-r-5 transition-all duration-75 cursor-pointer"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>{item.title}</div>
              </div>
            ) : (
                <a
                  key={item.id}
                  href={item.href}
                  className="flex gap-7 w-53 h-10 items-center justify-start mb-5 text-sm rounded-[0.20rem] hover:border-r-5 transition-all duration-75"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div>{item.title}</div>
                </a>
              )
          ))}
        </div>
      </div>
      <footer className="w-full h-15">
        <Separator />
        <div className="flex p-4 pb-0 gap-7 w-50 h-10 items-center justify-start text-sm">
          <LogOut size={22} />
          Sair
        </div>
      </footer>
    </div>
  );
}