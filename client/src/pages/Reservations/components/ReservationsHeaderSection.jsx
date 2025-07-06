import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import HeaderSection from "../../../components/headerSection/HeaderSection";
import { getRevenueRaport } from "../../../api/pdfsApi/index";
import ExportButton from "../../../components/ui/buttons/ExportButton";
import Calendar from "../../../components/ui/calendar/Calendar";
import useToggleDropdown from "../../../components/hooks/useToggleDropdown";
import { formatDateForServer } from "../../../utils/dateFormat";

export default function ReservationsHeaderSection({ openModal }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [error, setIsError] = useState(false);
  const { isOpen, toggle, close, dropdownRef, toggleRef } = useToggleDropdown();

  useEffect(() => {
    if (!isOpen) setIsError(false);
  }, [isOpen]);

  const handleOpenPdf = async () => {
    if (!startDate || !endDate) {
      setIsError(true);
      return;
    }

    try {
      const response = await getRevenueRaport(startDate, endDate);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `raport_${formatDateForServer(
        startDate
      )}_${formatDateForServer(endDate)}.pdf`;
      link.click();
      close();
    } catch (error) {
      console.error("Eroare la descarcarea PDF-ului:", error);
    }
  };

  return (
    <HeaderSection
      title="Rezervări"
      subtitle="Gestionează rezervările simplu și ușor"
    >
      <div className="flex gap-4">
        <div className="relative">
          <ExportButton onClickHandler={toggle} toggleRef={toggleRef} />
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute translate-y-2 -translate-x-[35%] w-72 flex flex-col gap-4 p-4 z-99999 bg-white pr-2 border border-slate-200 rounded-lg focus:border-slate-400 hover:border-slate-300"
            >
              <p className="text-sm text-center font-semibold pb-1 pt-1">
                Selectează perioada pentru export
              </p>
              <Calendar
                id="dataCheckIn"
                name="dataCheckIn"
                label="Data de început"
                selected={startDate}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
              />
              <Calendar
                id="dataCheckOut"
                name="dataCheckOut"
                label="Dată final"
                selected={endDate}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
              />
              <button
                className="bg-blue-600 rounded-lg px-1 py-2 text-white hover:bg-blue-700 cursor-pointer"
                onClick={() => {
                  handleOpenPdf();
                }}
              >
                Generează
              </button>
              {error && (
                <div className="py-2 px-1 text-xs bg-red-300/40 text-red-800 rounded-lg pl-4">
                  <p>Alege o perioadă validă!</p>
                </div>
              )}
            </div>
          )}
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
