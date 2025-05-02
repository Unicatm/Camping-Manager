import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";
import useTotalReservationsData from "./hooks/useTotalReservationsData";

export default function TotalReservationsWidget() {
  const { data: totalReservations } = useTotalReservationsData();

  return (
    <StatsWidget data={totalReservations} icon={RiLoopLeftFill}>
      <StatsWidget.Title title="Rezervari totale" />
      <StatsWidget.DisplayData />
    </StatsWidget>
  );
}
