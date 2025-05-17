import React from "react";
import SimpleWidget from "../../../../components/widgets/SimpleWidget";
import {
  SunIcon,
  BanknotesIcon,
  BookmarkIcon,
  MapPinIcon,
  Battery50Icon,
} from "@heroicons/react/20/solid";
import SimpleLabelWidget from "../../../../components/widgets/SimpleLabelWidget";
import useAverageDays from "./hooks/useAverageDays";
import useTotalReservationsData from "./hooks/useTotalReservationsData";
import useActiveReservationsData from "./hooks/useActiveReservationsData";

export default function ReservationsWidgets() {
  const { data: totalReservations } = useTotalReservationsData();
  const { data: averageDays } = useAverageDays();
  const { data: totalActiveReservations } = useActiveReservationsData();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-10 lg:pb-6">
      <SimpleWidget
        title={"Rezervari totale"}
        data={totalReservations}
        icon={BookmarkIcon}
      />
      <SimpleLabelWidget
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={Battery50Icon}
      />
      <SimpleWidget
        title={"Media zilelor petrecute"}
        data={averageDays}
        icon={SunIcon}
      />
      <SimpleWidget
        title={"Locuri libere"}
        data={averageDays}
        icon={MapPinIcon}
      />
    </div>
  );
}
