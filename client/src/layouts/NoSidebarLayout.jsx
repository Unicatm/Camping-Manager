import { Outlet } from "react-router-dom";

export default function NoSidebarLayout() {
  return (
    <div className="h-screen overflow-hidden">
      <Outlet />
    </div>
  );
}
