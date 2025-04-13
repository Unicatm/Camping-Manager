import React from "react";
import TotalReservationsWidget from "./TotalReservationsWidget";
import ActiveReservationsWidget from "./ActiveReservationsWidget";
import AverageDaysSpentWidget from "./AverageDaysSpentWidget";
import FreeSpacesWidget from "./FreeSpacesWidget";

export default function ReservationsWidgets() {
  return (
    <div className="flex flex-row items-center justify-between gap-4 pb-6">
      <TotalReservationsWidget />
      <ActiveReservationsWidget />
      <AverageDaysSpentWidget />
      <FreeSpacesWidget />
    </div>
  );
}
