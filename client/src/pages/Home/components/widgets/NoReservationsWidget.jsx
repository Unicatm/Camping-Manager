import React, { useState } from "react";
import { RiLoopLeftFill } from "react-icons/ri";

export default function NoReservationsWidget() {
  const [isLower, setIsLower] = useState(false);

  return (
    <div className="w-60 h-max p-4 rounded-md shadow-sm bg-white text-blue-950">
      <div className="flex items-center gap-2">
        <RiLoopLeftFill className="w-5 h-5 self-center" />
        <h2 className="w-fit text-md font-medium text-blue-950">
          Rezervări în curs
        </h2>
      </div>
      <div>
        <div className="flex items-center gap-4 w-fit h-max py-2">
          <p className="text-4xl font-medium">17</p>
          <p
            className={`text-xs py-0.5 px-1 rounded-sm ${
              isLower
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            +13%
          </p>
        </div>
        <p className="text-xs text-blue-950/80">
          <span className={` ${isLower ? "text-red-600" : "text-green-600"}`}>
            +23{" "}
          </span>
          față de saptămâna trecută
        </p>
      </div>
    </div>
  );
}
