import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRezervariCuCheckoutInUrmatoareleDouaZile } from "../../../api/reservationsApi";
import { useNavigate } from "react-router-dom";

export default function CheckOutCard() {
  const { data: rezervari, isLoading } = useQuery({
    queryKey: ["checkoutCard"],
    queryFn: getRezervariCuCheckoutInUrmatoareleDouaZile,
  });

  return (
    <div className="lg:col-start-3 lg:col-end-5 lg:row-start-3 lg:row-end-7 bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-1">Check-out-uri pentru astăzi</h2>
      <p className="text-gray-500 text-sm mb-6">
        Clienți care urmează să plece
      </p>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {isLoading ? (
          <p className="text-sm text-gray-400">Se încarcă...</p>
        ) : rezervari.length === 0 ? (
          <p className="text-sm text-gray-400">
            Niciun client cu check-out în curând.
          </p>
        ) : (
          rezervari.map((rezervare) => (
            <Field key={rezervare._id} rezervare={rezervare} />
          ))
        )}
      </div>
    </div>
  );
}

const Field = ({ rezervare }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rezervari?highlight=${rezervare._id}`);
  };

  return (
    <div className="flex gap-4 lg:gap:0 flex-col lg:flex-row items-start lg:items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
      <div className="flex gap-2 lg:gap:0 flex-col lg:flex-row items-start lg:items-center space-x-4">
        <div className="bg-blue-200 text-blue-800 font-bold rounded-full w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-md lg:text-lg">
          {rezervare?.idClient?.nume?.charAt(0).toUpperCase() || "A"}
        </div>
        <div>
          <div className="font-semibold text-lg">
            {rezervare.idClient?.nume || "Client Necunoscut"}
          </div>
          <div className="text-gray-500 text-sm">
            {rezervare.idLoc?._id || "N/A"} • {rezervare.facilitati?.Adult || 0}{" "}
            Adulți, {rezervare.facilitati?.["Copii 3-12 ani"] || 0} Copii •{" "}
            {rezervare.tipAuto ? Object.keys(rezervare.tipAuto).length : 0}{" "}
            Autovehicule
          </div>
          <div className="text-blue-700 font-medium text-xs mt-1">
            Check-out în {rezervare.zileRamase}{" "}
            {rezervare.zileRamase === 1 ? "zi" : "zile"}
          </div>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="text-sm text-gray-600 font-medium border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition cursor-pointer"
      >
        Vizualizează
      </button>
    </div>
  );
};
