'use client';

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
    <div className="flex flex-col flex-1 px-6 py-6 overflow-y-auto max-w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
  );
}
