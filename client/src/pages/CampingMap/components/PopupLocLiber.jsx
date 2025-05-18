import { useRef } from "react";
import useClickOutside from "../../../components/hooks/useClickOutside";

export default function PopupLocLiber({ selectedSpot, onClose, ignoreRef }) {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose, ignoreRef);

  return (
    <div
      ref={popupRef}
      className="absolute bg-white p-4 rounded-lg shadow-lg w-fit z-50 before:absolute before:-bottom-[7px] before:left-1/2 before:transform before:-translate-x-1/2 before:border-l-8 before:border-l-transparent before:border-r-8 before:border-r-transparent before:border-t-8 before:border-t-white before:drop-shadow-[0_2px_1px_rgba(0,0,0,0.1)]"
      style={{
        top: `${selectedSpot.top}%`,
        left: `${selectedSpot.left}%`,
        transform: "translate(-35%, -110%)",
      }}
    >
      <h3 className="text-md font-bold mb-4">Adaugă rezervare</h3>

      <div className="flex flex-col gap-2">
        <button className="text-sm text-gray-600 font-medium border border-gray-300 rounded-md px-4 py-1 bg-white hover:bg-gray-50 transition cursor-pointer">
          Rezervare existentă
        </button>
        <button className="text-sm text-gray-600 font-medium border border-gray-300 rounded-md px-4 py-1 bg-white hover:bg-gray-50 transition cursor-pointer">
          Adaugă rezervare
        </button>
      </div>
    </div>
  );
}
