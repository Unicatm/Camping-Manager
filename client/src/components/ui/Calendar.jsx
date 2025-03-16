import React, { useState, useRef, useEffect } from "react";
import {
  CalendarIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/16/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const CustomInput = ({ value, id, name, setIsOpen }) => (
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

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  setStartDate,
  startDate,
  handleDateChange,
  changeYear,
  birthDate,
}) => {
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
          decreaseMonth();
        }}
        className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <div className="">
        <span
          className="text-sm font-semibold text-gray-900 p-2 rounded-sm cursor-pointer hover:bg-gray-100"
          onClick={() => setShowYearDropdown((prev) => !prev)}
        >
          {new Date(
            date.setYear(birthDate ? lastMajorYear : new Date().getFullYear())
          ).toLocaleString("default", {
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
          increaseMonth();
        }}
        className="p-2 rounded-sm text-gray-900 hover:bg-gray-100"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function Calendar({
  onDateChange,
  id,
  name,
  selected,
  birthDate,
}) {
  const [startDate, setStartDate] = useState(selected || new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setStartDate(new Date(selected));
    }
  }, [selected]);

  const handleDateChange = (date) => {
    setStartDate(date);
    setIsOpen(true);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  return (
    <div className="relative w-full">
      <DatePicker
        dateFormat={"dd-MM-yyyy"}
        calendarClassName="custom-calendar"
        showPopperArrow={false}
        selected={startDate}
        onChange={handleDateChange}
        showYearDropdown
        customInput={<CustomInput id={id} name={name} setIsOpen={setIsOpen} />}
        renderCustomHeader={(props) => (
          <CustomHeader
            {...props}
            setStartDate={setStartDate}
            startDate={startDate}
            handleDateChange={handleDateChange}
            birthDate={birthDate}
          />
        )}
        open={isOpen}
        onClickOutside={(e) => {
          if (!e.target.closest("input")) {
            setIsOpen(false);
          }
        }}
      />
    </div>
  );
}
