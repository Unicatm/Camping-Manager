"use client";

import { useState, useRef, useEffect } from "react";
import { LuTreeDeciduous } from "react-icons/lu";

// Datele inițiale pentru locurile de camping
const initialSpots = [
  // Primul rând (10 la 1)
  { id: 10, x: 75, y: 80, occupant: null },
  { id: 9, x: 165, y: 80, occupant: null },
  { id: 8, x: 255, y: 80, occupant: null },
  { id: 7, x: 345, y: 80, occupant: null },
  { id: 6, x: 435, y: 80, occupant: null },
  { id: 5, x: 525, y: 80, occupant: null },
  { id: 4, x: 615, y: 80, occupant: null },
  { id: 3, x: 705, y: 80, occupant: null },
  { id: 2, x: 795, y: 80, occupant: null },
  { id: 1, x: 885, y: 80, occupant: null },

  // Al doilea rând (19 la 11 + Foisor)
  { id: 19, x: 75, y: 280, occupant: null },
  { id: 18, x: 165, y: 280, occupant: null },
  { id: 17, x: 255, y: 280, occupant: null },
  { id: 16, x: 345, y: 280, occupant: null },
  { id: 15, x: 435, y: 280, occupant: null },
  { id: 14, x: 525, y: 280, occupant: null },
  { id: 13, x: 615, y: 280, occupant: null },
  { id: 12, x: 705, y: 280, occupant: null },
  { id: 11, x: 795, y: 280, occupant: null },
  { id: "Foisor", x: 885, y: 280, occupant: "Admin", special: true },
];

// Poziții pentru copaci
const trees = [
  // Copaci mici între locurile din primul rând
  { x: 120, y: 130, size: 0.5 },
  { x: 210, y: 120, size: 0.5 },
  { x: 300, y: 130, size: 0.5 },
  { x: 390, y: 125, size: 0.5 },
  { x: 480, y: 120, size: 0.5 },
  { x: 570, y: 130, size: 0.5 },
  { x: 660, y: 125, size: 0.5 },
  { x: 750, y: 120, size: 0.5 },
  { x: 840, y: 125, size: 0.5 },

  // Copaci mici între locurile din al doilea rând
  { x: 120, y: 330, size: 0.5 },
  { x: 210, y: 335, size: 0.5 },
  { x: 300, y: 330, size: 0.5 },
  { x: 390, y: 340, size: 0.5 },
  { x: 480, y: 330, size: 0.5 },
  { x: 570, y: 335, size: 0.5 },
  { x: 660, y: 335, size: 0.5 },
  { x: 750, y: 330, size: 0.5 },
  { x: 840, y: 340, size: 0.5 },
];

// Componenta pentru un copac mai realist
const TreeSvg = ({ x, y, size }) => {
  const treeSize = 40 * size;
  const trunkWidth = 12 * size;
  const trunkHeight = 25 * size;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Umbra copacului */}
      <ellipse
        cx="0"
        cy={trunkHeight - 5}
        rx={treeSize / 2.5}
        ry={treeSize / 6}
        fill="rgba(0,0,0,0.1)"
      />

      {/* Trunchi */}
      <rect
        x={-trunkWidth / 2}
        y={-trunkHeight / 2}
        width={trunkWidth}
        height={trunkHeight}
        fill="#8B4513"
        rx={trunkWidth / 4}
      />

      {/* Coroana copacului - straturi de frunze */}
      <circle cx="0" cy={-treeSize / 2} r={treeSize * 0.8} fill="#2d9d3a" />
      <circle
        cx={-treeSize / 4}
        cy={-treeSize / 2 - treeSize / 4}
        r={treeSize * 0.6}
        fill="#38a847"
      />
      <circle
        cx={treeSize / 4}
        cy={-treeSize / 2 - treeSize / 5}
        r={treeSize * 0.7}
        fill="#44c356"
      />
      <circle
        cx="0"
        cy={-treeSize / 2 - treeSize / 3}
        r={treeSize * 0.5}
        fill="#4ade80"
      />
    </g>
  );
};

// Componenta pentru drumul central
const Path = () => (
  <>
    {/* Drum principal în centru */}
    <path
      d="M70,220 L925,220"
      stroke="#d4a76a"
      strokeWidth="60"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M70,220 L925,220"
      stroke="#e5c097"
      strokeWidth="50"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="15 10"
    />

    {/* Pietricele pe drum */}
    {Array.from({ length: 30 }).map((_, i) => {
      const x = 50 + (900 / 29) * i;
      const offset = Math.sin(i * 5) * 15;
      return (
        <circle
          key={`stone-${i}`}
          cx={x}
          cy={220 + offset}
          r={1 + Math.random() * 2}
          fill="#c4c4c4"
        />
      );
    })}

    {/* Drum secundar spre foișor */}
    <path
      d="M885,230 L885,280"
      stroke="#d4a76a"
      strokeWidth="30"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M885,230 L885,280"
      stroke="#e5c097"
      strokeWidth="25"
      fill="none"
      strokeLinecap="round"
      strokeDasharray="10 5"
    />
  </>
);

// Componenta pentru popup
const SpotPopup = ({
  spot,
  onClose,
  onAssign,
  onClear,
  newOccupant,
  setNewOccupant,
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <foreignObject
      x={spot.x - 90}
      y={spot.y - 120}
      width="180"
      height="200"
      ref={popupRef}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">
          {spot.special ? "Foisor" : `Locul ${spot.id}`}
        </h3>

        <div className="mb-3">
          <p className="text-sm">
            Status:{" "}
            <span className={spot.occupant ? "text-red-500" : "text-green-500"}>
              {spot.occupant ? "Ocupat" : "Liber"}
            </span>
          </p>
          {spot.occupant && (
            <p className="text-sm mt-1">Ocupant: {spot.occupant}</p>
          )}
        </div>

        {!spot.special && (
          <>
            <input
              type="text"
              value={newOccupant}
              onChange={(e) => setNewOccupant(e.target.value)}
              placeholder="Nume ocupant"
              className="w-full p-2 border rounded mb-2 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={onAssign}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm flex-1"
              >
                {spot.occupant ? "Actualizează" : "Asignează"}
              </button>
              {spot.occupant && (
                <button
                  onClick={onClear}
                  className="bg-gray-500 text-white px-3 py-1 rounded text-sm flex-1"
                >
                  Eliberează
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </foreignObject>
  );
};

export default function CampingMap() {
  const [spots, setSpots] = useState(initialSpots);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [newOccupant, setNewOccupant] = useState("");
  const svgRef = useRef(null);

  const handleSpotClick = (id, event) => {
    event.stopPropagation();
    const spot = spots.find((s) => s.id === id);
    if (spot) {
      setSelectedSpot(spot);
      setNewOccupant(spot.occupant || "");
    }
  };

  const handleAssign = () => {
    if (!selectedSpot) return;

    const updatedSpots = spots.map((spot) =>
      spot.id === selectedSpot.id
        ? { ...spot, occupant: newOccupant || null }
        : spot
    );

    setSpots(updatedSpots);
    setSelectedSpot({ ...selectedSpot, occupant: newOccupant || null });
  };

  const handleClear = () => {
    if (!selectedSpot) return;

    const updatedSpots = spots.map((spot) =>
      spot.id === selectedSpot.id ? { ...spot, occupant: null } : spot
    );

    setSpots(updatedSpots);
    setSelectedSpot({ ...selectedSpot, occupant: null });
    setNewOccupant("");
  };

  const handleClosePopup = () => {
    setSelectedSpot(null);
  };

  const handleSvgClick = () => {
    handleClosePopup();
  };

  return (
    <div className="w-full h-[600px] relative rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
      <svg
        ref={svgRef}
        viewBox="0 0 1000 500"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleSvgClick}
      >
        {/* Fundal cu gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="1000" height="500" fill="url(#skyGradient)" />

        {/* Zona camping cu textură */}
        <defs>
          <pattern
            id="grassPattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <rect width="100" height="100" fill="#86efac" />
            <circle cx="10" cy="10" r="1" fill="#4ade80" />
            <circle cx="30" cy="40" r="1" fill="#4ade80" />
            <circle cx="50" cy="20" r="1" fill="#4ade80" />
            <circle cx="70" cy="50" r="1" fill="#4ade80" />
            <circle cx="90" cy="30" r="1" fill="#4ade80" />
            <circle cx="20" cy="80" r="1" fill="#4ade80" />
            <circle cx="60" cy="70" r="1" fill="#4ade80" />
            <circle cx="80" cy="90" r="1" fill="#4ade80" />
          </pattern>
        </defs>
        <rect
          x="50"
          y="50"
          width="900"
          height="350"
          fill="url(#grassPattern)"
          rx="20"
          stroke="#4ade80"
          strokeWidth="5"
        />

        {/* Potecă */}
        <Path />

        {/* Copaci */}
        {trees.map((tree, index) => (
          <TreeSvg key={index} x={tree.x} y={tree.y} size={tree.size} />
        ))}

        {/* Locuri de camping */}
        {spots.map((spot) => (
          <g
            key={spot.id}
            onClick={(e) => handleSpotClick(spot.id, e)}
            className="cursor-pointer"
            data-testid={`spot-${spot.id}`}
          >
            {/* Umbra locului */}
            <rect
              x={spot.x - 30 + 3}
              y={spot.y + 10}
              width="60"
              height="80"
              rx="10"
              fill="rgba(0,0,0,0.1)"
            />

            {/* Locul de camping */}
            <rect
              x={spot.x - 30}
              y={spot.y + 10}
              width="60"
              height="80"
              rx="10"
              fill={
                spot.special ? "#3b2f2f" : spot.occupant ? "#fca5a5" : "#fef08a"
              }
              stroke={selectedSpot?.id === spot.id ? "#cd8f5d" : "#fef08a"}
              strokeWidth={selectedSpot?.id === spot.id ? "1.2" : "1"}
            />

            {/* Numărul locului */}
            <text
              x={spot.x}
              y={spot.y + 55}
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              fill={spot.special ? "#ffffff" : "#000000"}
            >
              {spot.id}
            </text>

            {/* Text pentru foișor */}
            {spot.special && (
              <text
                x={spot.x}
                y={spot.y + 30}
                fontSize="12"
                textAnchor="middle"
                fill="#ffffff"
              >
                Foisor
              </text>
            )}

            {/* Indicator de ocupare */}
            {spot.occupant && !spot.special && (
              <circle
                cx={spot.x + 20}
                cy={spot.y - 20}
                r="8"
                fill="#ef4444"
                stroke="#ffffff"
                strokeWidth="1"
              />
            )}
          </g>
        ))}

        {/* Popup pentru locul selectat */}
        {selectedSpot && (
          <SpotPopup
            spot={selectedSpot}
            onClose={handleClosePopup}
            onAssign={handleAssign}
            onClear={handleClear}
            newOccupant={newOccupant}
            setNewOccupant={setNewOccupant}
          />
        )}
      </svg>

      {/* Legendă */}
      <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-sm font-semibold mb-2 text-green-800">Legendă:</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-yellow-200 rounded-md border border-white"></div>
            <span className="text-xs">Loc liber</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-200 rounded-md border border-white"></div>
            <span className="text-xs">Loc ocupat</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-800 rounded-md border border-white"></div>
            <span className="text-xs">Foisor</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <rect width="20" height="20" fill="transparent" />
              <circle cx="10" cy="10" r="5" fill="#44c356" />
              <rect x="8" y="12" width="4" height="6" fill="#8B4513" />
            </svg>
            <span className="text-xs">Copac</span>
          </div>
        </div>
      </div>
    </div>
  );
}
