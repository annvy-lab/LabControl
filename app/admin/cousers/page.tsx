import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";
import ListCousers from "@/components/shared/courses-page/list";

export default function CoursesPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto px-7 py-3 gap-2">
        <HeaderPage title="Cursos" />
        <ListCousers />
      </div>
    </div>
  );
}
