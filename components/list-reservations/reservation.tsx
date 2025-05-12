import { AlarmClock, Pencil, Copy, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reservation() {
    return (
        <div className="w-full flex flex-row py-3 px-4 mb-4 pr-2 justify-between items-center bg-card rounded-md shadow-sm">
                <div className="w-22 truncate flex text-base justify-center items-center text-foreground">
                    13/03/2333
                </div>
                <div className="flex items-center">
                    <div className="w-38 truncate flex text-base justify-center items-center gap-2 text-foreground bg-neutral-100 rounded-md py-0.5">
                        <AlarmClock size={19} strokeWidth={2} className="mb-0.5" />
                        <p>18:00</p> -
                        <p>20:05</p>
                    </div>
                </div>
                <div className="w-72 truncate flex text-base items-center text-foreground">Inovação em Tecnologia e Saúde III
                </div>
                <div className="w-20 truncate flex text-base items-center text-foreground">
                    B1 A3° S12
                </div>
                <div className="w-32 flex justify-center items-center">
                    <div className="flex text-base items-center text-foreground gap-2 bg-green-100 rounded-md px-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"><br className="hidden" /></div>
                        <p className="text-green-500">aprovado</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-30 truncate flex text-base items-center text-foreground">
                        <Button variant="ghost" className="">
                            <Pencil size={18} strokeWidth={2.5} className="text-secondary-foreground" />
                        </Button>
                        <Button variant="ghost" className="">
                            <Copy size={18} strokeWidth={2.5} className="text-secondary-foreground" />
                        </Button>
                        <Button variant="ghost" className="">
                            <CircleX size={18} strokeWidth={2.5} className="text-secondary-foreground" />
                        </Button>
                    </div>
                </div>
            </div>
    );
}