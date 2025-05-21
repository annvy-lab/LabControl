import { AlarmClock, Pencil, Copy, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";
import ViewReservation from "@/components/shared/reservations/view-reservation";

type ReservCardProps = {
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
};

export default function CardReservation({
    id,
    date,
    hours,
    status,
    isRecurring,
    labName,
    labLocal,
    course,
    semester,
    subject,
    notes,
}: ReservCardProps) {
    return (
        <div className="w-full p-4 pb-2 md:py-2 md:px-4 mb-4 flex-col flex md:flex-row justify-center md:justify-between items-start md:items-center bg-card/70 rounded-md shadow-sm">
            <Dialog>
                <div className="col-span-2 flex-1 flex md:pr-4 flex-row justify-between items-center">
                    <DialogTrigger className="w-full flex flex-row justify-start md:justify-between items-center">
                        <div className="w-full hidden md:flex flex-row justify-between items-center">
                            <div className="w-22 truncate flex text-base justify-center items-center text-foreground">
                                {date}
                            </div>
                            <div className="flex items-center">
                                <div className="w-38 truncate flex text-base justify-center items-center gap-2 text-foreground bg-neutral-100 rounded-md py-0.5">
                                    <AlarmClock size={19} strokeWidth={2} className="mb-0.5" />
                                    <p>{hours}</p>
                                </div>
                            </div>
                            <div className="w-72 truncate flex text-base items-center text-foreground">
                                {labName}
                            </div>
                            <div className="w-20 truncate flex text-base items-center text-foreground">
                                {labLocal}
                            </div>
                            <div className="w-32 flex justify-center items-center">
                                <div className="flex text-base items-center text-foreground gap-2 bg-green-100 rounded-md px-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    <p className="text-green-500">{status}</p>
                                </div>
                            </div>
                        </div>

                        {/* <-- CARD MOBILE --> */}
                        <div className="w-full flex md:hidden gap-2 flex-col justify-start items-start p-0">
                            <div className="w-full flex items-start justify-between mr-0 pl-0 gap-3">
                                <div className="flex flex-col text-base gap-1 justify-center items-start text-foreground">
                                    <div className="flex text-base items-start text-foreground text-start">
                                {date}
                                </div>
                                    <div className="truncate flex text-sm justify-center items-center gap-2 text-foreground bg-neutral-100 rounded-md pl-2 px-2">
                                        <AlarmClock size={14} strokeWidth={2} className="mb-0.5" />
                                        <p>{hours}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex text-base items-center text-start text-foreground gap-2 bg-green-100 rounded-md px-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <p className="text-green-500 text-sm text-start">{status}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full truncate flex flex-col text-base items-center text-foreground text-start">
                                <div className="w-full truncate flex text-base items-start text-foreground text-start">
                                {labName}
                                </div>
                                <div className="w-full truncate flex text-sm items-center text-foreground/70 text-start">
                                    {labLocal}
                                </div>
                            </div>
                        </div>
                        {/* <-- CARD MOBILE FIM --> */}
                    </DialogTrigger>
                </div>
                <ViewReservation
                    id={id}
                    date={date}
                    hours={hours}
                    status={status}
                    isRecurring={isRecurring}
                    labName={labName}
                    labLocal={labLocal}
                    course={course}
                    semester={semester}
                    subject={subject}
                    notes={notes}
                />
            </Dialog>
            <div className="hidden md:flex flex-row justify-between items-center text-base">
                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.4} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <Copy size={18} strokeWidth={2.4} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <CircleX size={18} strokeWidth={2.4} className="text-red-800" />
                </Button>
            </div>
            {/* <-- CARD MOBILE --> */}
            <div className="md:hidden flex flex-row w-full mt-[-1rem] justify-end items-end text-base">
                <Button variant="ghost">
                    <Pencil size={18} strokeWidth={2.4} className="text-secondary-foreground" />
                </Button>
                <Button variant="ghost">
                    <CircleX size={18} strokeWidth={2.4} className="text-red-800" />
                </Button>
            </div>
            {/* <-- CARD MOBILE FIM--> */}
        </div>
    );
}
