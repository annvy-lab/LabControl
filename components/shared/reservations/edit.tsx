"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { format, parse } from "date-fns";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from "@/components/ui/tooltip";
import { AlarmClockPlus, CalendarIcon, CircleHelp } from "lucide-react";

import { mockLaboratories } from "@/data/laboratories";
import { mockReservations } from "@/data/reservations";

const labs = mockLaboratories.map((lab) => ({
    value: lab.name,
    label: lab.name,
}));

const courses = [
    { value: "Engenharia de Software", label: "Engenharia de Software" },
    { value: "Sistemas de Informação", label: "Sistemas de Informação" },
];

const semesters = [
    { value: "2025.1", label: "2025.1" },
    { value: "2025.2", label: "2025.2" },
];

const disciplines = [
    { value: "Disciplina 1", label: "Disciplina 1" },
    { value: "Disciplina 2", label: "Disciplina 2" },
];

const schema = z.object({
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    lab: z.string().min(1),
    course: z.string().min(1),
    semester: z.string().min(1),
    discipline: z.string().min(1),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type EditReservationProps = {
    id: number;
};

export default function EditReservation({ id }: EditReservationProps) {
    const reservation = mockReservations.find((res) => res.id === id);

    const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            startTime: "",
            endTime: "",
            lab: "",
            course: "",
            semester: "",
            discipline: "",
            notes: "",
        },
    });

    const [date, setDate] = useState<Date>();
    const [recurring, setRecurring] = useState(false);
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const formValues = watch();

    useEffect(() => {
        if (!reservation) return;

        const [startTime, endTime] = reservation.hours.split(" - ");
        setValue("startTime", startTime);
        setValue("endTime", endTime);
        setValue("course", reservation.course);
        setValue("semester", reservation.semester);
        setValue("discipline", reservation.subject);
        setValue("notes", reservation.notes || "");
        setValue("lab", reservation.labId.toString());

        const parsedDate = parse(reservation.date, "dd/MM/yy", new Date());
        setDate(parsedDate);
        setRecurring(reservation.isRecurring);
    }, [reservation, setValue]);

    const onSubmit = (data: FormData) => {
        if (!date) {
            toast.error("Por favor, selecione a data.");
            return;
        }

        const today = new Date();
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            toast.error("A data selecionada já passou.");
            return;
        }

        const [startHour, startMinute] = data.startTime.split(":").map(Number);
        const [endHour, endMinute] = data.endTime.split(":").map(Number);
        const start = new Date();
        const end = new Date();
        start.setHours(startHour, startMinute, 0, 0);
        end.setHours(endHour, endMinute, 0, 0);

        if (start >= end) {
            toast.error("O horário de início deve ser antes do horário de fim.");
            return;
        }

        toast.success("Reserva atualizada com sucesso!");
        reset();
        setDate(undefined);
        setRecurring(false);
        dialogCloseRef.current?.click();
    };

    const onError = () => {
        toast.error("Por favor, preencha os campos corretamente.");
    };

    const handleCancel = () => {
        reset();
        setDate(undefined);
        setRecurring(false);
    };

    return (
        <DialogContent className="w-full md:w-170 gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-center gap-2 md:gap-3">
                    <AlarmClockPlus size={26} strokeWidth={1.5} className="text-muted-foreground" />
                    Editar #{id}
                </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col mt-[-0.5rem]">
                <div className="flex w-full gap-4 md:gap-6 pr-5">
                    <div className="w-full flex flex-row gap-5.5">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col md:col-span-3 col-span-5 gap-2">
                                    <Label>Data: <p className="text-red-800">*</p></Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal truncate border-input bg-card hover:bg-card focus-visible:border-input focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground"
                                            >
                                                <CalendarIcon className="mr-1 h-4 w-4" />
                                                {date ? format(date, "PPP") : "--/--/--"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 border-primary/90" align="center">
                                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                                    <Label>Início: <p className="text-red-800">*</p></Label>
                                    <Input type="time" placeholder="Digite aqui" {...register("startTime")} className="w-full truncate" />
                                </div>
                                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                                    <Label>Fim: <p className="text-red-800">*</p></Label>
                                    <Input type="time" placeholder="Digite aqui" {...register("endTime")} className="w-full truncate" />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col col-span-5 gap-2">
                                    <Label>Laboratório: <p className="text-red-800">*</p></Label>
                                    <Select value={formValues.lab} onValueChange={(value) => setValue("lab", value)}>
                                        <SelectTrigger className="w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue>
                                                {
                                                    labs.find((lab) => lab.value === formValues.lab)?.label ||
                                                    "Selecionar laboratório..."
                                                }
                                            </SelectValue>

                                        </SelectTrigger>
                                        <SelectContent className="border-primary/90">
                                            {labs.map((lab) => (
                                                <SelectItem key={lab.value} value={lab.value}>
                                                    {lab.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col col-span-2 gap-3.5">
                                    <div className="flex flex-row gap-2">
                                        <Label>Recorrente:</Label>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleHelp size={16} className="text-muted-foreground" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>A reserva irá se repetir toda semana, <br />no mesmo dia e horário.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Switch checked={recurring} onCheckedChange={setRecurring} />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col col-span-5 gap-2">
                                    <Label>Curso: <p className="text-red-800">*</p></Label>
                                    <Select value={formValues.course} onValueChange={(value) => setValue("course", value)}>
                                        <SelectTrigger className="w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue placeholder="Selecionar curso..." />
                                        </SelectTrigger>
                                        <SelectContent className="border-primary/90">
                                            {courses.map((course) => (
                                                <SelectItem key={course.value} value={course.value}>
                                                    {course.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col col-span-2 gap-2">
                                    <Label>Período: <p className="text-red-800">*</p></Label>
                                    <Select value={formValues.semester} onValueChange={(value) => setValue("semester", value)}>
                                        <SelectTrigger className="w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue placeholder="Selecionar..." />
                                        </SelectTrigger>
                                        <SelectContent className="border-primary/90">
                                            {semesters.map((semester) => (
                                                <SelectItem key={semester.value} value={semester.value}>
                                                    {semester.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col col-span-5 gap-2">
                                    <Label>Disciplina: <p className="text-red-800">*</p></Label>
                                    <Select value={formValues.discipline} onValueChange={(value) => setValue("discipline", value)}>
                                        <SelectTrigger className="min-w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue placeholder="Selecionar disciplina..." />
                                        </SelectTrigger>
                                        <SelectContent className="border-primary/90">
                                            {disciplines.map((discipline) => (
                                                <SelectItem key={discipline.value} value={discipline.value}>
                                                    {discipline.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-4">
                    <Label>Observações:</Label>
                    <Input type="text" placeholder="Digite aqui" {...register("notes")} className="w-full truncate" />
                </div>
                <div className="flex flex-row w-full mt-6 justify-center items-center gap-3">
                    <DialogClose asChild>
                        <Button variant="secondary" className="flex-1" type="button" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button className="flex-1" type="submit">
                        Finalizar
                    </Button>
                    <DialogClose asChild>
                        <button type="button" ref={dialogCloseRef} className="hidden">
                            Fechar
                        </button>
                    </DialogClose>
                </div>
            </form>
        </DialogContent>
    );
}
