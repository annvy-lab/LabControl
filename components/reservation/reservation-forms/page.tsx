"use client";
import * as React from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown, AlarmClockPlus, CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { VerticalProgress } from "@/components/reservation/reservation-forms/vertical-progress-bar"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"



const labs = [
    {
        value: "lab1",
        label: "Inovação em Tecnologia e Saúde I",
    },
    {
        value: "lab2",
        label: "Inovação em Tecnologia e Saúde II",
    },
    {
        value: "lab3",
        label: "Inovação em Tecnologia e Saúde III",
    },
];

const courses = [
    {
        value: "course1",
        label: "ADS - Análise e Desenvolvimento de Sistemas",
    },
    {
        value: "course2",
        label: "ENF - Enfermagem",
    },
    {
        value: "course3",
        label: "FISIO - Fisioterapia",
    },
];

const semesters = [
    {
        value: "semester1",
        label: "1º Período",
    },
    {
        value: "semester2",
        label: "2º Período",
    },
    {
        value: "semester3",
        label: "3º Período",
    }
];
const disciplines = [
    {
        value: "d1",
        label: "POO",
    },
];

export default function NewReservation() {
    const [date, setDate] = React.useState<Date>();
    const [openLab, setOpenLab] = React.useState(false);
    const [labValue, setLabValue] = React.useState("");
    const [openCourse, setOpenCourse] = React.useState(false);
    const [courseValue, setCourseValue] = React.useState("");
    const [openSemester, setOpenSemester] = React.useState(false);
    const [semesterValue, setSemesterValue] = React.useState("");
    const [openDiscipline, setOpenDiscipline] = React.useState(false);
    const [disciplineValue, setDisciplineValue] = React.useState("");

    return (
        <DialogContent className="w-170 gap-4">
            <DialogHeader>
                <DialogTitle className="text-2xl flex text-[var--(header)] items-center gap-3"> <AlarmClockPlus size={26} strokeWidth={1.5} className="ml-[-0.6rem] text-muted-foreground"></AlarmClockPlus> Nova Reserva
                </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col">

                <div className="flex flex-row gap-5.5">
                    <VerticalProgress
                        value={30}
                        className=" transition-all duration-500 [&>div]:bg-[var(--highlight)] [&>div]:transition-all [&>div]:duration-500"
                    />
                    <div className="flex flex-col gap-3 w-full">
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-3 gap-2">
                                <Label >Data:</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal truncate border-input bg-card hover:bg-card focus-visible:border-input focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground",
                                                !date && "text-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-1 h-4 w-4" />
                                            {date ? format(date, "PPP") : "--/--/--"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="center">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label >Início:</Label>
                                <Input type="time" id="time" className="w-full truncate " placeholder="Digite aqui" />
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label >Fim:</Label>
                                <Input type="time" id="time" className="w-full truncate " placeholder="Digite aqui" />
                            </div>

                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label>Laboratório:</Label>
                                <Popover open={openLab} onOpenChange={setOpenLab}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openLab}
                                            className="w-full justify-between truncate"
                                        >
                                            <span className="truncate">
                                                {labValue
                                                    ? labs.find((lab) => lab.value === labValue)?.label
                                                    : "Selecionar laboratório..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Pesquisar..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>Nenhum laboratório encontrado.</CommandEmpty>
                                                <CommandGroup>
                                                    {labs.map((lab) => (
                                                        <CommandItem
                                                            key={lab.value}
                                                            value={lab.value}
                                                            onSelect={(currentValue) => {
                                                                setLabValue(
                                                                    currentValue === labValue ? "" : currentValue
                                                                );
                                                                setOpenLab(false);
                                                            }}
                                                            className="truncate"
                                                        >
                                                            <span className="whitespace-normal break-words">{lab.label}</span>
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    labValue === lab.value ? "opacity-100 text-primary" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                            </div>
                            <div className="flex flex-col col-span-2 gap-3.5">
                                <div className="flex flex-row gap-2">
                                    <Label>Recorrente:</Label>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger><CircleHelp size={16} className="text-muted-foreground" /></TooltipTrigger>
                                            <TooltipContent >
                                                <p>A reserva irá se repetir toda semana, <br />no mesmo dia e horário.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                </div>
                                <Switch />
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                                <Label >Curso:</Label>
                                <Popover open={openCourse} onOpenChange={setOpenCourse}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openCourse}
                                            className="w-full justify-between truncate"
                                        >
                                            <span className="truncate">
                                                {courseValue
                                                    ? courses.find((course) => course.value === courseValue)?.label
                                                    : "Selecionar curso..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Pesquisar..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>Nenhum curso encontrado.</CommandEmpty>
                                                <CommandGroup>
                                                    {courses.map((course) => (
                                                        <CommandItem
                                                            key={course.value}
                                                            value={course.value}
                                                            onSelect={(currentValue) => {
                                                                setCourseValue(
                                                                    currentValue === courseValue ? "" : currentValue
                                                                );
                                                                setOpenCourse(false);
                                                            }}
                                                            className="truncate"
                                                        >
                                                            <span className="whitespace-normal break-words">
                                                                {course.label}
                                                            </span>
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    courseValue === course.value ? "opacity-100 text-primary" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <Label >Período:</Label>
                                <Popover open={openSemester} onOpenChange={setOpenSemester}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={openSemester}
                                            className="w-full justify-between truncate"
                                        >
                                            <span className="truncate">
                                                {semesterValue
                                                    ? semesters.find((semester) => semester.value === semesterValue)?.label
                                                    : "..."}
                                            </span>
                                            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Pesquisar..."
                                                className="h-9"
                                            />
                                            <CommandList>
                                                <CommandEmpty>Nenhum período encontrado.</CommandEmpty>
                                                <CommandGroup>
                                                    {semesters.map((semester) => (
                                                        <CommandItem
                                                            key={semester.value}
                                                            value={semester.value}
                                                            onSelect={(currentValue) => {
                                                                setSemesterValue(
                                                                    currentValue === semesterValue ? "" : currentValue
                                                                );
                                                                setOpenSemester(false);
                                                            }}
                                                            className="truncate"
                                                        >
                                                            <span className="truncate">{semester.label}</span>
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    semesterValue === semester.value ? "opacity-100 text-primary" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-6 w-full">
                            <div className="flex flex-col col-span-5 gap-2">
                            <Label >Disciplina:</Label>
                            <Popover open={openDiscipline} onOpenChange={setOpenDiscipline}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={openDiscipline}
                                        className="w-full justify-between truncate"
                                    >
                                        <span className="truncate">
                                            {disciplineValue
                                                ? disciplines.find((d) => d.value === disciplineValue)?.label
                                                : "Selecionar disciplina..."}
                                        </span>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Pesquisar..."
                                            className="h-9"
                                        />
                                        <CommandList>
                                            <CommandEmpty>Nenhuma disciplina encontrada.</CommandEmpty>
                                            <CommandGroup>
                                                {disciplines.map((d) => (
                                                    <CommandItem
                                                        key={d.value}
                                                        value={d.value}
                                                        onSelect={(currentValue) => {
                                                            setDisciplineValue(
                                                                currentValue === disciplineValue ? "" : currentValue
                                                            );
                                                            setOpenDiscipline(false);
                                                        }}
                                                        className="truncate"
                                                    >
                                                        <span className="whitespace-normal break-words">{d.label}</span>
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                disciplineValue === d.value ? "opacity-100 text-primary" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full mt-4">
                    <Label >Observações:</Label>
                    <Input type="text" id="note" className="w-full truncate" placeholder="Digite aqui" />
                </div>
                <div className="flex flex-row w-full mt-6 justify-center items-center gap-3">
                    <Button variant="secondary" className="flex-1">Cancelar</Button>
                    <Button className="flex-1">Finalizar</Button>
                </div>
            </div>
        </DialogContent>
    );
}