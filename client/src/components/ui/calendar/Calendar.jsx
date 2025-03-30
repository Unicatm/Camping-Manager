import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import CustomHeader from "./components/CustomHeader";
import CustomInput from "./components/CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

export default function Calendar({
  onDateChange,
  id,
  name,
  selected,
  birthDate,
  label,
}) {
  const currentYear = new Date().getFullYear();
  const dateLastMajorYear = new Date(new Date().setFullYear(currentYear - 18));

  const [startDate, setStartDate] = useState(
    selected || (birthDate ? dateLastMajorYear : new Date())
  );
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
      {label !== null ? (
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-blue-950 font-medium"
        >
          {label}
        </label>
      ) : (
        ""
      )}
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
