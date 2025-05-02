import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/16/solid";

export default function QuantitySelect({
  width,
  flex,
  label,
  id,
  error,
  data,
  setData,
  labelData,
}) {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleIncrement = (type) => {
    const currentCount = data[type] || 0;
    const newQuantities = {
      ...data,
      [type]: currentCount + 1,
    };
    setData(newQuantities);
  };

  const handleDecrement = (type) => {
    setData((prevData) => {
      const newQuantities = { ...prevData };
      if (newQuantities[type] > 1) {
        newQuantities[type] -= 1;
      } else {
        delete newQuantities[type];
      }
      return newQuantities;
    });
  };

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

  const maxVisibleItems = 2;

  return (
    <div ref={dropdownRef} className={`relative ${width} ${flex}`}>
      {label ? (
        <label
          htmlFor={id}
          className="block mb-2 text-sm text-blue-950 font-medium"
        >
          {label}
        </label>
      ) : null}
      <div
        className="h-fit flex items-center justify-between flex-nowrap gap-1 bg-white border border-slate-200 px-3 py-2 text-sm text-blue-950 rounded-md cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex gap-1">
          {Object.entries(data)
            .filter(([, value]) => value > 0)
            .slice(0, maxVisibleItems)
            .map(([key, value]) => (
              <span
                key={key}
                className="bg-blue-100 text-blue-900 px-2 py-1 text-xs rounded-md"
              >
                {key}: {value}
              </span>
            ))}
          {Object.entries(data).filter(([, value]) => value > 0).length >
            maxVisibleItems && (
            <span className="bg-blue-200 text-blue-900 px-2 py-1 text-xs rounded-md">
              +{Object.entries(data).length - maxVisibleItems}
            </span>
          )}
        </div>
        <ChevronDownIcon className="w-4 h-4" />
      </div>
      {isOpen && (
        <div className="absolute w-full min-h-fit max-h-40 h-40 top-full left-0 z-10 mt-2 bg-white shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20 cursor-default">
          <div className="flex flex-col overflow-y-auto h-full rounded-md text-blue-950">
            {labelData?.map((label) => (
              <div
                key={label}
                className="flex justify-between gap-2 py-2 px-3 border-b-[1px] border-blue-950/20 bg-white"
              >
                <label htmlFor={label}>{label}</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-xs shadow-blue-950/10 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDecrement(label)}
                  >
                    <MinusIcon className="text-blue-950 w-4 h-4" />
                  </button>
                  <input
                    className="p-0 w-6 h-6 bg-transparent border-0 text-blue-950 text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    type="number"
                    value={data[label] || 0}
                    readOnly
                  />
                  <button
                    type="button"
                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-xs shadow-blue-950/10 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleIncrement(label)}
                  >
                    <PlusIcon className="text-blue-950 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}
