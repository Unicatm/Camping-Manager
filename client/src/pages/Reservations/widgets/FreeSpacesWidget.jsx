import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";
import useAverageDays from "./hooks/useAverageDays";

export default function FreeSpacesWidget({ width }) {
  const { data: averageDays } = useAverageDays();
  return (
    <StatsWidget width={width} data={averageDays} icon={RiLoopLeftFill}>
      <StatsWidget.Title title="Locuri libere" />
      <StatsWidget.DisplayData />
    </StatsWidget>
  );
}
