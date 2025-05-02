import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import HeaderSection from "../../../components/headerSection/HeaderSection";

export default function ClientsHeaderSection({ openModal }) {
  return (
    <HeaderSection
      title="Clienți"
      subtitle="Gestionează clienții simplu și ușor"
    >
      <button
        onClick={openModal}
        className="cursor-pointer flex justify-center items-center gap-2 w-max bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
      >
        <PlusIcon className="h-4 w-4 stroke-3" />
        <p className="whitespace-nowrap">Adaugă un client</p>
      </button>
    </HeaderSection>
  );
}
