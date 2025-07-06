import { useState } from "react";
import MiddleNavMobile from "./MiddleNavMobile";
import BottomNavMobile from "./BottomNavMobile";
import TopNavMobile from "./TopNavMobile";

export default function SideNavMobile() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCloseMenu = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={` w-full bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden
      ${isExpanded ? "h-screen" : "h-18"}`}
    >
      <div className="flex flex-col h-full">
        <TopNavMobile isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

        {isExpanded && (
          <div className="flex flex-col justify-between flex-grow p-4">
            <MiddleNavMobile onLinkClick={handleCloseMenu} />
            <BottomNavMobile onLogoutClick={handleCloseMenu} />
          </div>
        )}
      </div>
    </div>
  );
}
