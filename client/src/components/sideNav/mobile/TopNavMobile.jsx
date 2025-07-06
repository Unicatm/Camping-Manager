import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import logo from "../../../assets/logo.png";

export default function TopNavMobile({ isExpanded, setIsExpanded }) {
  return (
    <div
      className={`flex flex-row justify-between px-4 py-4 items-center ${
        isExpanded ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="flex items-center gap-2 overflow-hidden max-w-full">
        <img src={logo} alt="Logo" className="w-12 h-11 min-w-12" />
        <h1 className="text-2xl whitespace-nowrap font-black text-blue-950">
          Dan P.
        </h1>
      </div>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="cursor-pointer min-w-8 min-h-8 w-8 h-8 text-blue-950 rounded-sm p-1 hover:bg-blue-50 transition-all duration-300"
      >
        {isExpanded ? <XMarkIcon /> : <Bars3BottomRightIcon />}
      </button>
    </div>
  );
}
