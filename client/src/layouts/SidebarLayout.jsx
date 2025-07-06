import { Outlet } from "react-router-dom";
import SideNav from "../components/sideNav/SideNav";
import SideNavMobile from "../components/sideNav/mobile/SideNavMobile";

export default function SidebarLayout() {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="hidden lg:block">
        <SideNav />
      </div>

      <div className="lg:hidden">
        <SideNavMobile />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
