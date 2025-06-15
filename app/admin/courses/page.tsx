"use client"
import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import ListCourses from "@/components/shared/courses-page/list";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return;
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto px-7 py-3 gap-2">
        <HeaderPage title="Cursos" />
        <ListCourses />
      </div>
    </div>
  );
}