import SideBar from "@/components/shared/sidebar/page";
import HeaderPage from "@/components/shared/header-page/page";


export default function Courses() {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
        <HeaderPage title="Cursos" />
      </div>
    </div>
  );
}
