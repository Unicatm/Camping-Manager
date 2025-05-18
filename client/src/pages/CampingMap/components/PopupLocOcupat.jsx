import { useRef } from "react";
import useClickOutside from "../../../components/hooks/useClickOutside";
import { dateFormatter } from "../../../utils/dateFormat";

export default function PopupLocOcupat({ selectedSpot, onClose, ignoreRef }) {
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
      <h3 className="text-md font-bold mb-2">Detalii rezervare</h3>
      <p className="mb-1 text-xs">
        <span className="font-semibold">Loc:</span> {selectedSpot.id}
      </p>
      <p className="mb-1 text-xs">
        <span className="font-semibold">Client:</span>{" "}
        {selectedSpot.clientName || "Nespecificat"}
      </p>
      <p className="mb-2 text-xs">
        <span className="font-semibold">Check-out:</span>{" "}
        {dateFormatter(selectedSpot.checkoutDate) || "Nespecificat"}
      </p>
      <button className="text-xs text-gray-600 font-medium border border-gray-300 rounded-md px-4 py-1 bg-white hover:bg-gray-50 transition cursor-pointer">
        Detalii
      </button>
    </div>
  );
}
