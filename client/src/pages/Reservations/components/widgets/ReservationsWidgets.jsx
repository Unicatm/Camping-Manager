import React from "react";
import SimpleWidget from "../../../../components/widgets/SimpleWidget";
import { RiLoopLeftFill } from "react-icons/ri";
import SimpleLabelWidget from "../../../../components/widgets/SimpleLabelWidget";
import useAverageDays from "./hooks/useAverageDays";
import useTotalReservationsData from "./hooks/useTotalReservationsData";
import useActiveReservationsData from "./hooks/useActiveReservationsData";

export default function ReservationsWidgets() {
  const { data: totalReservations } = useTotalReservationsData();
  const { data: averageDays } = useAverageDays();
  const { data: totalActiveReservations } = useActiveReservationsData();
  return (
    <div className="flex flex-row items-center justify-between gap-4 pb-6">
      <SimpleWidget
        title={"Rezervari totale"}
        data={totalReservations}
        icon={RiLoopLeftFill}
      />
      <SimpleLabelWidget
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={RiLoopLeftFill}
      />
      <SimpleWidget
        title={"Media zilelor petrecute"}
        data={averageDays}
        icon={RiLoopLeftFill}
      />
      <SimpleWidget
        title={"Locuri libere"}
        data={averageDays}
        icon={RiLoopLeftFill}
      />
    </div>
  );
}
