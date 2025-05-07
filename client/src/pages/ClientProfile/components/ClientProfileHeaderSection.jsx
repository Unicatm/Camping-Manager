import React from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import HeaderSection from "../../../components/headerSection/HeaderSection";

export default function ClientProfileHeaderSection() {
  return (
    <HeaderSection
      title="Profil client"
      subtitle="Vizualizează și gestionează informațiile clienților"
    >
      <div className="flex gap-4">
        <div>
          <button
            className="cursor-pointer flex justify-center items-center gap-2 w-max border-[1px] border-slate-200 bg-white text-slate-600 text-sm px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-slate-100 hover:text-slate-800 hover:transition-all hover:duration-300 hover:ease-in-out"
            // onClick={handleOpenPdf}
          >
            <ArrowDownTrayIcon className="h-4 w-4 font-light stroke-2" />
            <p className="whitespace-nowrap">Export</p>
          </button>
        </div>
      </div>
    </HeaderSection>
  );
}
