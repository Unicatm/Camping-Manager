import React, { useState } from "react";
import {
  CalendarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/16/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const CustomInput = ({
  value,
  onClick,
  id,
  name,
  isOpen,
  setIsOpen,
  setViewMode,
}) => (
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
        setViewMode("date");
      }}
      readOnly
    />
    <div
      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(() => (isOpen ? false : true));
        onClick();
      }}
    >
      <CalendarIcon className="h-5 w-5 text-slate-400" />
    </div>
  </div>
);
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  setViewMode,
  viewMode,
  setIsOpen,
}) => (
  <div className="flex justify-between items-center py-2 px-2 bg-white">
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        decreaseMonth();
      }}
      className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
    >
      <ArrowLeftIcon className="w-5 h-5" />
    </button>
    <span
      className="text-sm font-semibold text-gray-900 p-2 rounded-sm cursor-pointer hover:bg-gray-100"
      onClick={() => {
        setViewMode(viewMode === "date" ? "year" : "date");
        setIsOpen(false);
      }}
    >
      {date.toLocaleString("default", { month: "long", year: "numeric" })}
    </span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        increaseMonth();
      }}
      className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
    >
      <ArrowRightIcon className="w-5 h-5" />
    </button>
  </div>
);

const CustomYearPicker = ({
  date,
  onChange,
  onClose,
  setViewMode,
  setIsOpen,
}) => {
  const startYear = date.getFullYear() - ((date.getFullYear() - 1) % 12);
  const [currentStartYear, setCurrentStartYear] = useState(startYear);

  const years = Array.from({ length: 12 }, (_, i) => currentStartYear + i);

  const handleYearClick = (year) => {
    onChange(year);
    setViewMode("date");
    setIsOpen(true);
    onClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full mt-2 border-[1px] border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCurrentStartYear(currentStartYear - 12);
          }}
          className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <span
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setViewMode("date");
            setIsOpen(true);
          }}
          className="text-sm font-semibold p-2 rounded-sm text-gray-900 cursor-pointer hover:bg-gray-100"
        >
          {currentStartYear} - {currentStartYear + 11}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setCurrentStartYear(currentStartYear + 12);
          }}
          className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
        >
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => handleYearClick(year)}
            className={`p-2 text-sm rounded-md cursor-pointer ${
              date.getFullYear() === year
                ? "bg-blue-500 text-white"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default function Calendar({ onDateChange, id, name }) {
  const [startDate, setStartDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("date");
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const handleYearChange = (year) => {
    setStartDate(new Date(year, startDate.getMonth(), startDate.getDate()));
    setViewMode("date");
    setIsOpen(true);
  };

  return (
    <div className="relative w-full">
      <DatePicker
        calendarClassName="custom-calendar"
        showPopperArrow={false}
        selected={startDate}
        onChange={handleDateChange}
        customInput={
          <CustomInput
            id={id}
            name={name}
            onClick={() => {
              setIsOpen((prev) => !prev);
              setViewMode("date"); // Setează modul de vizualizare la "date" când se face click pe input
            }}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setViewMode={setViewMode}
            viewMode={viewMode}
          />
        }
        renderCustomHeader={(props) => (
          <CustomHeader
            {...props}
            setViewMode={setViewMode}
            viewMode={viewMode}
            setIsOpen={setIsOpen}
          />
        )}
        open={isOpen && viewMode === "date"}
        onClickOutside={(e) => {
          if (!e.target.closest("input")) {
            setIsOpen(false);
          }
        }}
      />
      {viewMode === "year" && (
        <div className="absolute top-full left-0 w-full z-10">
          <CustomYearPicker
            date={startDate}
            onChange={handleYearChange}
            onClose={() => {
              setViewMode("date");
            }}
            setViewMode={setViewMode}
            viewMode={viewMode}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </div>
  );
}
