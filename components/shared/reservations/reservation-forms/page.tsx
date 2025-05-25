import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
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
import { format } from "date-fns";
import { VerticalProgress } from "./vertical-progress-bar";

const labs = [
    { value: "lab1", label: "Laboratório 1" },
    { value: "lab2", label: "Laboratório 2" },
];

const courses = [
    { value: "course1", label: "Curso 1" },
    { value: "course2", label: "Curso 2" },
];

const semesters = [
    { value: "semester1", label: "2025.1" },
    { value: "semester2", label: "2025.2" },
];

const disciplines = [
    { value: "discipline1", label: "Disciplina 1" },
    { value: "discipline2", label: "Disciplina 2" },
];

const schema = z.object({
    startTime: z.string().min(1, "Horário de início é obrigatório"),
    endTime: z.string().min(1, "Horário de fim é obrigatório"),
    lab: z.string().min(1, "Laboratório é obrigatório"),
    course: z.string().min(1, "Curso é obrigatório"),
    semester: z.string().min(1, "Período é obrigatório"),
    discipline: z.string().min(1, "Disciplina é obrigatório"),
    notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function FormsReservation() {
    const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>({
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });

    const formValues = watch();
    const [date, setDate] = useState<Date>();
    const [recurring, setRecurring] = useState(false);
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    const onSubmit = (data: FormData) => {
        if (!date) {
            toast.error("Por favor, selecione a data.");
            return;
        }
        toast.success("Reserva criada com sucesso!");
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

    const calculateProgress = (formData: Partial<FormData>, date?: Date) => {
        let filledFields = 0;
        const requiredFields = [
            "startTime",
            "endTime",
            "lab",
            "course",
            "semester",
            "discipline",
        ];
        requiredFields.forEach((field) => {
            if (formData[field as keyof FormData]) {
                filledFields++;
            }
        });
        if (date) filledFields++;
        const totalFields = requiredFields.length + 1;
        return Math.round((filledFields / totalFields) * 100);
    };

    return (
        <DialogContent className="w-full md:w-170 gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var(--header)] items-bottom gap-2 md:gap-3">
                    <AlarmClockPlus
                        size={26}
                        strokeWidth={1.5}
                        className="ml-[-0.6rem] text-muted-foreground"
                    />
                    Nova Reserva
                </DialogTitle>
            </DialogHeader>
            <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="flex flex-col mt-[-0.5rem]"
            >
                <div className="flex w-full gap-4 md:gap-6 pr-5">
                    <VerticalProgress
                        value={calculateProgress(formValues, date)}
                        className="md:w-1.5 transition-all duration-500 [&>div]:bg-[var(--highlight)] [&>div]:transition-all [&>div]:duration-500"
                    />
                    <div className="w-full flex flex-row gap-5.5">
                        <div className="flex flex-col gap-4 w-full">
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col md:col-span-3 col-span-5 gap-2">
                                    <Label>
                                        Data: <p className="text-red-800">*</p>
                                    </Label>
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
                                        <PopoverContent
                                            className="w-auto p-0 border-primary/90"
                                            align="center"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                                    <Label>
                                        Início: <p className="text-red-800">*</p>
                                    </Label>
                                    <Input
                                        type="time"
                                        placeholder="Digite aqui"
                                        {...register("startTime")}
                                        className="w-full truncate"
                                    />
                                </div>
                                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                                    <Label>
                                        Fim: <p className="text-red-800">*</p>
                                    </Label>
                                    <Input
                                        type="time"
                                        placeholder="Digite aqui"
                                        {...register("endTime")}
                                        className="w-full truncate"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col col-span-5 gap-2">
                                    <Label>
                                        Laboratório: <p className="text-red-800">*</p>
                                    </Label>
                                    <Select onValueChange={(value) => setValue("lab", value)}>
                                        <SelectTrigger className="w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue placeholder="Selecionar laboratório..." />
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
                                                    <p>
                                                        A reserva irá se repetir toda semana, <br />
                                                        no mesmo dia e horário.
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <Switch
                                        checked={recurring}
                                        onCheckedChange={setRecurring}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                                <div className="flex flex-col col-span-5 gap-2">
                                    <Label>
                                        Curso: <p className="text-red-800">*</p>
                                    </Label>
                                    <Select onValueChange={(value) => setValue("course", value)}>
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
                                    <Label>
                                        Período: <p className="text-red-800">*</p>
                                    </Label>
                                    <Select
                                        onValueChange={(value) => setValue("semester", value)}
                                    >
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
                                    <Label>
                                        Disciplina: <p className="text-red-800">*</p>
                                    </Label>
                                    <Select
                                        onValueChange={(value) => setValue("discipline", value)}
                                    >
                                        <SelectTrigger className="min-w-full justify-between truncate bg-card hover:bg-card border-input">
                                            <SelectValue placeholder="Selecionar disciplina..." />
                                        </SelectTrigger>
                                        <SelectContent className="border-primary/90">
                                            {disciplines.map((discipline) => (
                                                <SelectItem
                                                    key={discipline.value}
                                                    value={discipline.value}
                                                >
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
                    <Input
                        type="text"
                        placeholder="Digite aqui"
                        {...register("notes")}
                        className="w-full truncate"
                    />
                </div>
                <div className="flex flex-row w-full mt-6 justify-center items-center gap-3">
                    <DialogClose asChild>
                        <Button
                            variant="secondary"
                            className="flex-1"
                            type="button"
                            onClick={handleCancel}
                        >
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
