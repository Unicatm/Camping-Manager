import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../components/widgets/StatsWidget";
import useAverageDays from "./hooks/useAverageDays";

export default function AverageDaysSpentWidget() {
  const { data: averageDays } = useAverageDays();
  return (
    <StatsWidget data={averageDays}>
      <StatsWidget.Title
        title="Media zilelor petrecute"
        icon={RiLoopLeftFill}
      />
      <StatsWidget.DisplayData />
    </StatsWidget>
  );
}
