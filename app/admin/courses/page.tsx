"use client";

import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import CourseCard from "@/components/shared/courses-page/list";
import { Input } from "@/components/ui/input";
import { Search, BookX } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/services/axiosClient";

interface Course {
  idCurso: number;
  nome: string;
  escola: string;
}

export default function CoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
      return;
    }

    axiosClient
      .get("/course/courses")
      .then(({ data }) => setCourses(data))
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const filteredCourses = courses.filter((course) => {
    const content = Object.values(course).join(" ").toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  if (loading) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto px-7 py-3 gap-2">
        <HeaderPage title="Cursos" />
        <div className="flex w-full self-start relative mb-5 gap-4 md:gap-6 p-1">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou área do curso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 py-2 rounded-md bg-primary/10 border border-primary/20 w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, idx) => (
              <CourseCard
                key={course.idCurso}
                {...course}
                colorIndex={idx}
              />
            ))
          ) : (
            <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center col-span-full">
              <BookX size={70} strokeWidth={1.2} />
              Nenhum curso encontrado..
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
