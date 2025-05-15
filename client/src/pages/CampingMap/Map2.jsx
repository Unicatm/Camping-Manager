import { useState } from "react";
import spotsData from "./spots";
import CampSpot from "./CampSpot";

export default function Map2() {
  const [spots, setSpots] = useState(spotsData);

  const topRowSpots = spots.filter((spot) => spot.row === 0);
  const bottomRowSpots = spots.filter((spot) => spot.row === 2);

  const handleSelect = (id) => {
    setSpots((prev) =>
      prev.map((spot) => {
        if (spot.id === id && spot.status === "available") {
          return { ...spot, status: "selected" };
        } else if (spot.status === "selected") {
          return { ...spot, status: "available" };
        }
        return spot;
      })
    );
  };

  return (
    <div className="relative w-2/3 h-3/5 bg-sky-100 rounded-lg border-[1px] border-gray-300 p-4 shadow-md">
      {/* Legendă */}
      <div className="absolute top-2 right-2 text-xs space-y-1">
        <div>
          <span className="inline-block w-3 h-3 bg-green-400 mr-1"></span> Liber
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-red-500 mr-1"></span> Ocupat
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-yellow-400 mr-1"></span>{" "}
          Selectat
        </div>
      </div>

      {/* Locuri */}
      <div className="absolute inset-4">
        <div className="absolute inset-0">
          {topRowSpots.map((spot) => (
            <div
              key={spot.id}
              style={{
                top: 0,
                left: `${spot.col * 15}%`,
              }}
              className="absolute"
            >
              <CampSpot
                name={spot.name}
                status={spot.status}
                onClick={() => handleSelect(spot.id)}
              />
            </div>
          ))}
        </div>

        <div>
          {bottomRowSpots.map((spot) => (
            <div
              key={spot.id}
              style={{
                bottom: 0,
                left: `${spot.col * 15}%`,
              }}
              className="absolute"
            >
              <CampSpot
                name={spot.name}
                status={spot.status}
                onClick={() => handleSelect(spot.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
