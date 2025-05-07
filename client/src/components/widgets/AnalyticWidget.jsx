import React from "react";
import { StatsWidget } from "./StatsWidget";

export default function AnalyticWidget({
  data,
  title,
  icon: Icon,
  referenceText,
}) {
  return (
    <StatsWidget data={data}>
      <StatsWidget.Title title={title} icon={Icon} />
      <StatsWidget.ChangeIndicator referenceText={referenceText} />
    </StatsWidget>
  );
}
