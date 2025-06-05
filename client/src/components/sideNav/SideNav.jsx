import { useState } from "react";
import MiddleNav from "./MiddleNav";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";

import logo from "../../assets/logo.png";
import BottomNav from "./BottomNav";
import TopLogoNav from "./TopLogoNav";

function SideNav() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div
      className={`hidden md:flex flex-col justify-between pb-1 sticky top-0 min-h-screen bg-white shadow-lg transition-all duration-300 ease-in-out ${
        isExpanded ? "w-60" : "w-16"
      }`}
    >
      <div>
        <TopLogoNav isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <MiddleNav isExpanded={isExpanded} />
      </div>
      <BottomNav isExpanded={isExpanded} />
    </div>
  );
}

export default SideNav;
