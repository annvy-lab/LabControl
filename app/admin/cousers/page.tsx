'use client';

import SideBar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";

const courses = [
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-purple-400/90" },
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-purple-400/90" },
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-sky-400/90" },
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-sky-400/90" },
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-lime-400/90" },
  { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-lime-400/90" },
];

export default function Courses() {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-y-auto px-7 py-6 gap-4">
        <HeaderPage title="Cursos e períodos" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
          {courses.map((course, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <div
                className={`h-20 relative bg-center shadow-md overflow-hidden ${course.color}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: "url('/bgCard_exploracao_global.png')" }}
                />

                <div className="relative z-10 flex items-center h-full px-4 text-white font-semibold text-sm">
                  {course.title}
                </div>
              </div>

              <div className="bg-white h-12 flex items-center justify-start text-gray-800 text-sm font-medium pl-4">
                {course.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



/*
const colorOptions = [
  "bg-purple-400/90",
  "bg-sky-400/90",
  "bg-lime-400/90",
  "bg-rose-400/90",
  "bg-amber-400/90",
  "bg-pink-400/90",
  "bg-green-400/90",
];

// Função que escolhe uma cor com base no texto da disciplina (hash)
interface Course {
  title: string;
  period: string;
  color: string;
}

function getColorByTitle(title: string): string {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colorOptions.length;
  return colorOptions[index];
}

export default function Courses() {
  const [courses, setCourses] = useState([
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-purple-400/90" },
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-purple-400/90" },
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-sky-400/90" },
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-sky-400/90" },
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-lime-400/90" },
    { title: "Análise e Desenvolvimento de Sistemas", period: "ADS – B3 – Noturno – 2025.1", color: "bg-lime-400/90" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newPeriod, setNewPeriod] = useState("");

  interface NewCourse {
    title: string;
    period: string;
    color: string;
  }

  function handleAddCourse(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTitle.trim() || !newPeriod.trim()) return;

    const color: string = getColorByTitle(newTitle);

    setCourses((prev: NewCourse[]) => [
      ...prev,
      { title: newTitle.trim(), period: newPeriod.trim(), color },
    ]);
    setNewTitle("");
    setNewPeriod("");
  }

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-1 overflow-y-auto px-7 py-6 gap-4">
        <HeaderPage title="Cursos e períodos" />

        <form onSubmit={handleAddCourse} className="flex flex-col md:flex-row gap-3 items-center mb-6">
          <input
            type="text"
            placeholder="Nome da disciplina"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          />
          <input
            type="text"
            placeholder="Período (ex: ADS – B3 – Noturno – 2025.1)"
            value={newPeriod}
            onChange={(e) => setNewPeriod(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Adicionar
          </button>
        </form> 

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
          {courses.map((course, index) => (
            <div
              key={index}
              className="rounded-xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <div
                className={`h-20 relative bg-center shadow-md overflow-hidden ${course.color}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{ backgroundImage: "url('/bgCard_exploracao_global.png')" }}
                />

                <div className="relative z-10 flex items-center h-full px-4 text-white font-semibold text-sm">
                  {course.title}
                </div>
              </div>

              <div className="bg-white h-12 flex items-center justify-start text-gray-800 text-sm font-medium pl-4">
                {course.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 */