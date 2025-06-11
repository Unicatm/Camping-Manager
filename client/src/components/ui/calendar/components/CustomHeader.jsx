import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/16/solid";

export default function CustomHeader({
  date,
  decreaseMonth,
  increaseMonth,
  setStartDate,
  startDate,
  handleDateChange,
  changeYear,
  birthDate,
  isMonthPickerMode,
}) {
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const lastMajorYear = currentYear - 18;

  const years = Array.from(
    { length: birthDate ? lastMajorYear - 1960 + 1 : 2030 - 1960 + 1 },
    (_, i) => 1960 + i
  ).reverse();

  useEffect(() => {
    if (showYearDropdown && dropdownRef.current) {
      const selectedYearElement = dropdownRef.current.querySelector(
        `.year-item[data-year="${birthDate ? lastMajorYear : currentYear}"]`
      );
      if (selectedYearElement) {
        selectedYearElement.scrollIntoView({ block: "center" });
      }
    }
  }, [showYearDropdown, date]);

  return (
    <div className="relative flex justify-between items-center py-2 px-2 bg-white">
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (isMonthPickerMode) {
            changeYear(date.getFullYear() - 1);
          } else {
            decreaseMonth();
          }
        }}
        className="p-2 rounded-sm text-gray-900 hover:bg-gray-100 cursor-pointer"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <div>
        <span
          className="text-sm font-semibold text-gray-900 p-2 rounded-sm cursor-pointer hover:bg-gray-100"
          onClick={() => setShowYearDropdown((prev) => !prev)}
        >
          {new Date(date).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        {showYearDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-14 left-[10%] bg-white border border-gray-200 rounded-md shadow-lg z-10 year-dropdown-container"
          >
            <div className="p-2 grid grid-cols-4 gap-2 max-h-40 overflow-y-auto year-dropdown-grid">
              {years.map((year) => (
                <div
                  key={year}
                  data-year={year}
                  className={`p-2 text-center rounded-md cursor-pointer year-item ${
                    year === date.getFullYear()
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    const newDate = new Date(startDate);
                    newDate.setFullYear(year);
                    changeYear(year);
                    setStartDate(newDate);
                    handleDateChange(newDate);
                    setShowYearDropdown(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (isMonthPickerMode) {
            changeYear(date.getFullYear() + 1);
          } else {
            increaseMonth();
          }
        }}
        className="p-2 rounded-sm text-gray-900 hover:bg-gray-100 cursor-pointer"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
