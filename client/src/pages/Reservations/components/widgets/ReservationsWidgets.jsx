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
    <div className="grid w-full gap-4 pb-10 lg:pb-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <SimpleWidget
        width="w-full"
        title={"Rezervari totale"}
        data={totalReservations}
        icon={BookmarkIcon}
      />
      <SimpleLabelWidget
        width="w-full"
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={Battery50Icon}
      />
      <SimpleWidget
        width="w-full"
        title={"Media zilelor petrecute"}
        data={averageDays}
        icon={SunIcon}
      />
      <SimpleWidget
        width="w-full"
        title={"Locuri libere"}
        data={averageDays}
        icon={MapPinIcon}
      />
    </div>
  );
}
