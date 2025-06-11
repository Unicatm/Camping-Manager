import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import CustomHeader from "./components/CustomHeader";
import CustomInput from "./components/CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import "./custom-datepicker.css";

const Calendar = ({
  id,
  name,
  label,
  selected,
  onDateChange,
  selectsStart,
  selectsEnd,
  startDate,
  endDate,
  minDate,
  maxDate,
  error,
  birthDate,
  register,
  selectsRange,
}) => {
  const currentYear = new Date().getFullYear();
  const dateLastMajorYear = new Date(new Date().setFullYear(currentYear - 18));

  const [localDate, setLocalDate] = useState(
    selected || (birthDate ? dateLastMajorYear : new Date())
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setLocalDate(new Date(selected));
    }
  }, [selected]);

  const handleDateChange = (date) => {
    setLocalDate(date);
    if (onDateChange) {
      onDateChange(date);
    }
  };

  const dayClassName = (date) => {
    const isDisabled =
      (minDate && date < minDate) ||
      (maxDate && date > maxDate) ||
      (selectsEnd && startDate && date < startDate);

    return isDisabled ? "disabled-day" : null;
  };

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-blue-950 font-medium"
        >
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        name={name}
        selected={selected}
        onChange={handleDateChange}
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        maxDate={maxDate}
        dayClassName={dayClassName}
        calendarClassName="custom-calendar"
        showPopperArrow={false}
        dateFormat="dd-MM-yyyy"
        customInput={
          <CustomInput
            id={id}
            name={name}
            setIsOpen={setIsOpen}
            register={register}
          />
        }
        renderCustomHeader={(props) => (
          <CustomHeader
            {...props}
            setStartDate={setLocalDate}
            startDate={localDate}
            handleDateChange={handleDateChange}
            birthDate={birthDate}
            isMonthPickerMode={false}
          />
        )}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        onSelect={() => setIsOpen(false)}
        selectsRange={selectsRange}
      />
      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Calendar;
