import React from "react";
import TotalReservationsWidget from "./TotalReservationsWidget";
import ActiveReservationsWidget from "./ActiveReservationsWidget";
import AverageDaysSpentWidget from "./AverageDaysSpentWidget";
import FreeSpacesWidget from "./FreeSpacesWidget";
import useTotalReservationsData from "./hooks/useTotalReservationsData";

export default function ReservationsWidgets() {
  const { data: totalReservations } = useTotalReservationsData();
  return (
    <div className="flex flex-row items-center justify-between gap-4 pb-6">
      <TotalReservationsWidget data={totalReservations} />
      <ActiveReservationsWidget />
      <AverageDaysSpentWidget />
      <FreeSpacesWidget />
    </div>
  );
}
