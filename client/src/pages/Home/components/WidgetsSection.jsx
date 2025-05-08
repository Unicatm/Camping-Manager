import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import useActiveReservationsData from "../../Reservations/components/widgets/hooks/useActiveReservationsData";
import SimpleLabelWidget from "../../../components/widgets/SimpleLabelWidget";
import SimpleWidget from "../../../components/widgets/SimpleWidget";

export default function WidgetsSection() {
  const { data: totalActiveReservations } = useActiveReservationsData();
  return (
    <>
      <SimpleLabelWidget
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={RiLoopLeftFill}
        grid={"col-start-1 col-end-2 row-start-2 row-end-3"}
      />
      <SimpleLabelWidget
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={RiLoopLeftFill}
        grid={"col-start-2 col-end-3 row-start-2 row-end-3"}
      />
      <SimpleWidget
        title={"Locuri libere"}
        data={totalActiveReservations}
        icon={RiLoopLeftFill}
        grid={"col-start-3 col-end-5 row-start-2 row-end-3"}
      />
    </>
  );
}
