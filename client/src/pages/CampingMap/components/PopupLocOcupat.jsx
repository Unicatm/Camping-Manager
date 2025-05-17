import { useRef } from "react";
import useClickOutside from "../../../components/hooks/useClickOutside";
import { dateFormatter } from "../../../utils/dateFormat";

export default function PopupLocOcupat({ selectedSpot, onClose }) {
  const popupRef = useRef(null);
  useClickOutside(popupRef, onClose);

  return (
    <div
      ref={popupRef}
      className="absolute bg-white p-4 rounded-lg shadow-lg w-fit z-50"
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
