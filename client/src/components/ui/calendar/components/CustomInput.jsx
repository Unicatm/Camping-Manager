import React from "react";
import { CalendarIcon } from "@heroicons/react/16/solid";

export default function CustomInput({ value, id, name, setIsOpen }) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name}
        type="text"
        className="w-full bg-white text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow pr-10"
        value={value}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        readOnly
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <CalendarIcon className="h-5 w-5 text-slate-400" />
      </div>
    </div>
  );
}
