"use client";

import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookX } from "lucide-react";

const colors = [
  "bg-purple-400/90",
  "bg-sky-400/90",
  "bg-lime-400/90",
  "bg-rose-400/90",
  "bg-orange-400/90",
  "bg-emerald-400/90",
];

interface Course {
  idCurso: number;
  nome: string;
  escola: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/course/courses")
      .then(({ data }) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar cursos:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = courses.filter((course) => {
    const content = Object.values(course).join(" ").toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col flex-1 py-6 pt-0 overflow-y-auto max-w-full">
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
      {loading ? (
        <br />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <Card
                  key={course.idCurso}
                  className="py-0 flex flex-col gap-1 shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
                >
                  <div
                    className={`h-18 relative bg-center shadow-md overflow-hidden ${colors[index % colors.length]}`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-40"
                      style={{ backgroundImage: "url('/bgCard_exploracao_global.png')" }}
                    />
                    <div className="relative z-10 flex items-center h-full px-4 text-white font-semibold text-sm">
                      {course.nome}
                    </div>
                  </div>

                  <div className="bg-white h-12 flex items-center justify-start text-gray-800 text-sm font-medium pl-4">
                    Área: {course.escola}
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col gap-2 text-foreground mt-6 items-center justify-center">
                <BookX size={70} strokeWidth={1.2} />
                Nenhum curso encontrado..
              </div>
          )}
        </div>
      )}
    </div>
  );
}
