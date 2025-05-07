import React from "react";
import { StatsWidget } from "./StatsWidget";

export default function SimpleLabelWidget({ data, title, label, icon: Icon }) {
  return (
    <StatsWidget data={data} icon={Icon}>
      <StatsWidget.Title title={title} />
      <StatsWidget.DisplayDataLabel label={label} />
    </StatsWidget>
  );
}
