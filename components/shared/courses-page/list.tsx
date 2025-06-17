"use client";

import { Card } from "@/components/ui/card";

const colors = [
  "bg-purple-400/90",
  "bg-sky-400/90",
  "bg-lime-400/90",
  "bg-rose-400/90",
  "bg-orange-400/90",
  "bg-emerald-400/90",
];

interface CourseCardProps {
  idCurso: number;
  nome: string;
  escola: string;
  colorIndex: number;
}

export default function CourseCard({ nome, escola, colorIndex }: CourseCardProps) {
  return (
    <Card className="py-0 flex flex-col gap-1 shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300">
      <div className={`h-18 relative bg-center shadow-md overflow-hidden ${colors[colorIndex % colors.length]}`}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: "url('/bgCard_exploracao_global.png')" }}
        />
        <div className="relative z-10 flex items-center h-full px-4 text-white font-semibold text-sm">
          {nome}
        </div>
      </div>
      <div className="bg-white h-12 flex items-center justify-start text-gray-800 text-sm font-medium pl-4">
        Área: {escola}
      </div>
    </Card>
  );
}
