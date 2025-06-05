import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/logo.png";

export default function TopLogoNav({ isExpanded, setIsExpanded }) {
  return (
    <div
      className={`flex flex-row justify-between px-4 py-4 items-center border-b-[1px] border-blue-800/20 ${
        isExpanded ? "gap-2" : ""
      }`}
    >
      <div className="flex items-center gap-2 overflow-hidden max-w-full">
        <img src={logo} alt="Logo" className="w-12 h-11 min-w-12 min-h-11" />
        <h1
          className={`text-2xl whitespace-nowrap font-black text-blue-950 transition-all duration-300 ${
            isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0 hidden"
          }`}
        >
          Dan P.
        </h1>
      </div>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer min-w-8 min-h-8 w-8 h-8 text-blue-950 rounded-sm p-1 hover:bg-blue-50 transition-all duration-300"
      >
        {isExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
    </div>
  );
}
