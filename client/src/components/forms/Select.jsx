import React, { useState } from "react";

export default function Select({
  width,
  flex,
  label,
  id,
  error,
  register,
  data,
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`relative ${width} ${flex}`}>
      <label
        htmlFor={id}
        className="block mb-2 text-sm text-blue-950 font-medium"
      >
        {label}
      </label>
      <input
        className={`relative w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow ${
          isOpen ? " border-t" : ""
        }`}
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      />
      <div
        className={`absolute z-10 bg-white w-full h-40 overflow-y-scroll rounded-b-md border border-slate-200 py-2 transition duration-300 ease shadow-sm ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {data.map((opt) => (
          <div
            className="p-1 hover:bg-gray-100 cursor-pointer px-3"
            key={opt.id}
          >
            {opt.country}
          </div>
        ))}
      </div>

      {error && (
        <span className="absolute -bottom-6 left-0 text-xs text-red-700 bg-red-200/0 py-1 px-2 rounded-xl">
          {error.message}
        </span>
      )}
    </div>
  );
}
