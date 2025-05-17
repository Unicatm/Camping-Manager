import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PopupLocOcupat from "./components/PopupLocOcupat";
import { getLocuriZi } from "../../api/locuriApi";
import spots from "./spots";

export default function Map() {
  const [selectedSpot, setSelectedSpot] = useState(null);

  const { data: locuri = [] } = useQuery({
    queryKey: ["locuriZi"],
    queryFn: getLocuriZi,
  });

  const locuriMap = Object.fromEntries(locuri.map((loc) => [loc.id, loc]));

  const handleSpotClick = (spot) => {
    if (spot.status === "Ocupat") {
      setSelectedSpot(spot);
    }
  };

  const closePopup = () => setSelectedSpot(null);

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full max-w-5xl">
        <img
          src="/CampingMapImg3.svg"
          alt="Camping Map"
          className="w-full h-auto rounded-lg border border-gray-300"
        />

        {spots.map((pos) => {
          const spotData = locuriMap[pos.id] || {};
          const fullSpot = {
            ...pos,
            ...spotData,
          };

          return (
            <div
              key={fullSpot.id}
              className={`absolute flex justify-center items-center w-12 h-18 border-2 ${
                fullSpot.status === "Ocupat"
                  ? "bg-red-400 border-red-600"
                  : "bg-amber-200 border-amber-400"
              } rounded-lg px-2 py-1 font-bold text-sm cursor-pointer`}
              style={{
                top: `${fullSpot.top}%`,
                left: `${fullSpot.left}%`,
              }}
              onClick={() => handleSpotClick(fullSpot)}
            >
              {fullSpot.id}
            </div>
          );
        })}

        {selectedSpot && (
          <PopupLocOcupat selectedSpot={selectedSpot} onClose={closePopup} />
        )}
      </div>
    </div>
  );
}
