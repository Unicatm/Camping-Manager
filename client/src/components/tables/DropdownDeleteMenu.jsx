import React from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import useToggleDropdown from "../hooks/useToggleDropdown";

export default function DropdownDeleteMenu({ rezervareId, onEdit, onDelete }) {
  const { isOpen, toggle, dropdownRef, toggleRef } = useToggleDropdown();
  return (
    <td className="relative">
      <button
        ref={toggleRef}
        onClick={toggle}
        className="font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:underline p-1 cursor-pointer hover:text-slate-600/90 hover:border-slate-300/80"
      >
        <EllipsisHorizontalIcon className="w-4 h-4" />
      </button>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 z-50 flex flex-col gap-1 text-sm text-slate-600 bg-white p-2 border border-slate-200 rounded-md shadow-md"
        >
          <button
            className="py-0.5 text-left hover:text-slate-800 cursor-pointer"
            onClick={() => {
              onEdit(rezervareId);
              close();
            }}
          >
            Edit
          </button>
          <button
            className="py-0.5 text-left hover:text-slate-800 cursor-pointer"
            onClick={() => {
              onDelete(rezervareId);
              close();
            }}
          >
            Șterge
          </button>
        </div>
      )}
    </td>
  );
}
