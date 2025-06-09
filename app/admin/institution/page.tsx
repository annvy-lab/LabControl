import SideBar from "@/components/layout/navbar";
import HeaderPage from "@/components/layout/header";

export default function Reservations() {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex flex-col flex-12/12 overflow-y-auto items-start px-7 py-3 gap-2">
      <HeaderPage title="Instituição"/>
      </div>
    </div>
  );
}
