import React, { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function ChartMultiSelectButton({
  btnTitle,
  data,
  checkedData,
  setCheckedData,
  minSelection,
  maxSelection,
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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleCheckboxChange = (value) => {
    setCheckedData((prev) => {
      if (prev.includes(value)) {
        if (prev.length <= minSelection) return prev;
        return prev.filter((year) => year !== value);
      } else {
        if (prev.length >= maxSelection) return prev;
        return [...prev, value];
      }
    });
  };

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
        } absolute top-full left-1/2 transform -translate-x-1/2 z-10 w-max min-h-fit max-h-40 mt-2 bg-white shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20 cursor-default`}
      >
        <div className="flex flex-col overflow-y-auto h-full rounded-md text-blue-950">
          {data?.map((year, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-gray-100"
            >
              <label htmlFor={year}>{year}</label>
              <input
                className="cursor-pointer"
                type="checkbox"
                id={year}
                checked={checkedData.includes(year)}
                onChange={() => handleCheckboxChange(year)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
