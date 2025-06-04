import SideBar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";
import ListCousers from "@/components/shared/courses-page/page";

export default function CoursesPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideBar sectionIsOpen={true} />
      <div className="flex flex-col flex-12/12 overflow-y-auto px-7 py-3 gap-2">
        <HeaderPage title="Cursos" />
        <ListCousers />
      </div>
    </div>
  );
}
