import { Outlet } from "react-router-dom";
import SideNav from "../components/sideNav/SideNav";

export default function SidebarLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
