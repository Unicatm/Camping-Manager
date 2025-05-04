import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import HeaderSection from "../../../components/headerSection/HeaderSection";
import { getRevenueRaport } from "../../../api/pdfsApi/index";

export default function ReservationsHeaderSection({ openModal }) {
  const handleOpenPdf = async () => {
    try {
      const response = await getRevenueRaport();

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "raport.pdf";
      link.click();
    } catch (error) {
      console.error("Eroare la descărcarea PDF-ului:", error);
    }
  };

  return (
    <HeaderSection
      title="Rezervări"
      subtitle="Gestionează rezervările simplu și ușor"
    >
      <div className="flex gap-4">
        <div>
          <button
            className="cursor-pointer flex justify-center items-center gap-2 w-max border-[1px] border-slate-200 bg-white text-slate-600 text-sm px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-800 hover:transition-all hover:duration-300 hover:ease-in-out"
            onClick={handleOpenPdf}
          >
            <ArrowDownTrayIcon className="h-4 w-4 font-light stroke-2" />
            <p className="whitespace-nowrap">Export</p>
          </button>
        </div>
        <button
          onClick={openModal}
          className="cursor-pointer flex justify-center items-center gap-2 w-max bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-blue-800 hover:transition-all hover:duration-300 hover:ease-in-out"
        >
          <PlusIcon className="h-4 w-4 stroke-3" />
          <p className="whitespace-nowrap">Adaugă rezervare</p>
        </button>
      </div>
    </HeaderSection>
  );
}
