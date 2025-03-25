import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function ChartSelectButton({
  btnTitle,
  data,
  selectedData,
  setSelectedData,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative w-min h-min" ref={dropdownRef}>
      <button
        className="h-fit flex items-center gap-1 bg-gray-100 text-sm text-blue-950 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {btnTitle}
        <ChevronDownIcon className="w-4 h-4" />
      </button>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } absolute top-full left-1/2 transform -translate-x-1/2 z-10 w-fit h-40 mt-2 overflow-hidden bg-white shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20 cursor-default`}
      >
        <div className="flex flex-col gap-2 overflow-y-scroll h-full rounded-md text-blue-950">
          {data.map((d, index) => (
            <p
              key={index}
              className={`${
                d == selectedData
                  ? "bg-gray-200 hover:bg-gray-300"
                  : " hover:bg-gray-100"
              } px-2 py-1 cursor-pointer`}
              onClick={() => {
                setSelectedData(d);
                setIsOpen(false);
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
