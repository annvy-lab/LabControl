'use client';

import { useEffect, useState } from "react";
import { axiosClient } from "@/services/axiosClient";

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
    axiosClient.get("/course/courses").then(({ data }) => {
      setCourses(data);
    }).catch((error) => {
      console.error("Erro ao buscar cursos:", error);
    })
    .finally(() => setLoading(false));    
  }, []);

  const filteredCourses = courses.filter((course) => {
    const content = Object.values(course).join(" ").toLowerCase();
    return content.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col flex-1 px-6 py-6 overflow-y-auto max-w-full">
      <div className="flex w-full mb-4 gap-4">
        <input
          type="text"
          placeholder="Buscar curso..."
          className="pl-4 py-2 rounded-md bg-primary/10 border border-primary/20 w-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-32 text-muted-foreground">
          Carregando cursos...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <div
              key={course.idCurso}
              className="rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <div
                className={`h-20 relative bg-center shadow-md overflow-hidden ${colors[index % colors.length]}`}
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
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="flex flex-col gap-2 text-muted-foreground mt-6 items-center justify-center">
              <p>Nenhum curso encontrado.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
