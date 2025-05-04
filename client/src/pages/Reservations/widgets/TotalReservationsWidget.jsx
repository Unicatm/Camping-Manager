import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";

export default function TotalReservationsWidget({ data }) {
  return (
    <StatsWidget data={data} icon={RiLoopLeftFill}>
      <StatsWidget.Title title="Rezervari totale" />
      <StatsWidget.DisplayData />
    </StatsWidget>
  );
}
