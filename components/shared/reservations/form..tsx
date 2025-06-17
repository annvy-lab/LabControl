"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { axiosClient } from "@/services/axiosClient";

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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlarmClockPlus, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { VerticalProgress } from "../../ui/vertical-progress-bar";
import { getUserFromToken } from "@/services/auth";

const schema = z.object({
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  lab: z.string().min(1),
  course: z.string().min(1),
  turma: z.string().min(1),
  subject: z.string().min(1),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function FormReservation({ onSuccess }: { onSuccess?: () => void }) {
  const { register, handleSubmit, setValue, reset, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: {
      startTime: "",
      endTime: "",
      lab: "",
      course: "",
      turma: "",
      subject: "",
      notes: "",
    },
  });

  const formValues = watch();
  const [labs, setLabs] = useState<{ value: string; label: string }[]>([]);
  const [courses, setCourses] = useState<{ value: string; label: string }[]>([]);
  const [subjects, setSubjects] = useState<{ value: string; label: string }[]>([]);
  const [semesters, setSemesters] = useState<{ value: string; label: string }[]>([]);
  const [coursesFull, setCoursesFull] = useState<any[]>([]); // salva a resposta bruta dos cursos
  const [date, setDate] = useState<Date>();
  const [recurring, setRecurring] = useState(false);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const user = getUserFromToken();
  const userId = user?.id;

  useEffect(() => {
    axiosClient.get("/lab/labs").then(({ data }) => {
      const mapped = data.map((lab: any) => ({
        value: String(lab.idLaboratorio),
        label: lab.nome,
      }));
      setLabs(mapped);
    });

    if (userId) {
      axiosClient.get(`/course/professor/${user.id}/courses`).then(({ data }) => {
        console.log("Resposta da API /course/professor/:id/courses:", data); // 👈 Aqui!
        setCoursesFull(data);
        setCourses(data.map((course: any) => ({
        value: String(course.idCurso),
        label: course.nome,
        })));
    });
    }
  }, [userId]);


  useEffect(() => {
    const courseId = formValues.course;
    if (!courseId) {
      setSubjects([]);
      setSemesters([]);
      setValue("subject", "");
      setValue("turma", "");
      return;
    }
    const courseObj = coursesFull.find((c) => String(c.idCurso) === courseId);
    setSubjects((courseObj?.Disciplina || []).map((d: any) => ({
      value: String(d.idDisciplina),
      label: d.nome,
    })));
    setSemesters([]);
    setValue("subject", "");
    setValue("turma", "");
  }, [formValues.course, coursesFull, setValue]);

  useEffect(() => {
    const courseId = formValues.course;
    const subjectId = formValues.subject;
    if (!courseId || !subjectId) {
      setSemesters([]);
      setValue("turma", "");
      return;
    }
    const courseObj = coursesFull.find((c) => String(c.idCurso) === courseId);
    const subjectObj = (courseObj?.Disciplina || []).find(
      (d: any) => String(d.idDisciplina) === subjectId
    );
    setSemesters((subjectObj?.Turmas || []).map((turma: any) => ({
      value: String(turma.idTurma),
      label: `${turma.nome} - ${turma.periodo_letivo}`,
    })));
    setValue("turma", "");
  }, [formValues.subject, formValues.course, coursesFull, setValue]);

  const onSubmit = async (data: FormData) => {
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

    const startDate = new Date(date);
    const endDate = new Date(date);
    startDate.setHours(startHour, startMinute, 0, 0);
    endDate.setHours(endHour, endMinute, 0, 0);

    if (startDate >= endDate) {
      toast.error("O horário de início deve ser antes do horário de fim.");
      return;
    }

    const payload = {
      data_hora_inicio: startDate,
      data_hora_fim: endDate,
      status: "pendente",
      observacoes: data.notes,
      idLaboratorio: Number(data.lab),
      idTurma: Number(data.turma),
      idCurso: Number(data.course),
      idDisciplina: Number(data.subject),
      idProfessor: userId,
      recorrente: Boolean(recurring),
    };

    try {
      await axiosClient.post("/reservations", payload);
      toast.success("Reserva criada com sucesso!");
      reset();
      setDate(undefined);
      setRecurring(false);
      dialogCloseRef.current?.click();
      onSuccess?.();
    } catch (error: any) {
      console.error("Erro ao criar reserva:", {
        message: error.message,
        status: error?.response?.status,
        data: error?.response?.data,
        payload,
      });
      toast.error("Erro ao criar a reserva.");
    }
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
    const requiredFields = ["startTime", "endTime", "lab", "course", "turma", "subject"];
    requiredFields.forEach((field) => {
      if (formData[field as keyof FormData]) filledFields++;
    });
    if (date) filledFields++;
    const totalFields = requiredFields.length + 1;
    return Math.round((filledFields / totalFields) * 100);
  };

  return (
    <DialogContent className="w-full md:w-170 gap-4">
      <DialogHeader>
        <DialogTitle className="text-2xl flex text-[var(--header)] items-bottom gap-2 md:gap-3">
          <AlarmClockPlus size={26} strokeWidth={1.5} className="ml-[-0.6rem] text-muted-foreground" />
          Nova Reserva
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col mt-[-0.5rem]">
        <div className="flex w-full gap-4 md:gap-6 pr-5">
          <VerticalProgress
            value={calculateProgress(formValues, date)}
            className="md:w-1.5 transition-all duration-500 [&>div]:bg-[var(--highlight)] [&>div]:transition-all [&>div]:duration-500"
          />
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
                        {date ? format(date, "PPP", { locale: ptBR }) : "--/--/--"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-primary/90" align="center">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                  <Label>Início: <p className="text-red-800">*</p></Label>
                  <Input type="time" {...register("startTime")} className="w-full truncate" />
                </div>
                <div className="flex flex-col md:col-span-2 col-span-3 gap-2">
                  <Label>Fim: <p className="text-red-800">*</p></Label>
                  <Input type="time" {...register("endTime")} className="w-full truncate" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                <div className="flex flex-col col-span-5 gap-2">
                  <Label>Laboratório: <p className="text-red-800">*</p></Label>
                  <Select value={formValues.lab} onValueChange={(value) => setValue("lab", value)}>
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
              </div>
              <div className="grid grid-cols-7 gap-3 md:gap-6 w-full">
                <div className="flex flex-col col-span-5 gap-2">
                  <Label>Disciplina: <p className="text-red-800">*</p></Label>
                  <Select value={formValues.subject} onValueChange={(value) => setValue("subject", value)}>
                    <SelectTrigger className="min-w-full justify-between truncate bg-card hover:bg-card border-input">
                      <SelectValue placeholder="Selecionar disciplina..." />
                    </SelectTrigger>
                    <SelectContent className="border-primary/90">
                      {subjects.map((subject) => (
                        <SelectItem key={subject.value} value={subject.value}>
                          {subject.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col col-span-2 gap-2">
                  <Label>Turma: <p className="text-red-800">*</p></Label>
                  <Select value={formValues.turma} onValueChange={(value) => setValue("turma", value)}>
                    <SelectTrigger className="w-full justify-between truncate bg-card hover:bg-card border-input">
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent className="border-primary/90">
                      {semesters.map((turma) => (
                        <SelectItem key={turma.value} value={turma.value}>
                          {turma.label}
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