import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";
import useTotalReservationsData from "./hooks/useTotalReservationsData";

export default function TotalReservationsWidget() {
  const { data: totalReservations } = useTotalReservationsData();

  return (
    <StatsWidget data={totalReservations}>
      <StatsWidget.Title title="Rezervari totale" icon={RiLoopLeftFill} />
      <StatsWidget.DisplayData />
    </StatsWidget>
  );
}
