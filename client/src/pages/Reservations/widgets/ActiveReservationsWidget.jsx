import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";
import useActiveReservationsData from "./hooks/useActiveReservationsData";

export default function ActiveReservationsWidget() {
  const { data: totalActiveReservations } = useActiveReservationsData();
  return (
    <StatsWidget data={totalActiveReservations}>
      <StatsWidget.Title title="Rezervari in curs" icon={RiLoopLeftFill} />
      <StatsWidget.DisplayDataLabel label="În curs" />
    </StatsWidget>
  );
}
