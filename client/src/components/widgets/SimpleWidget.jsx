import React from "react";
import { StatsWidget } from "./StatsWidget";

export default function SimpleWidget({ data, title, unit, icon: Icon }) {
  return (
    <StatsWidget data={data} icon={Icon}>
      <StatsWidget.Title title={title} />
      <StatsWidget.DisplayData unit={unit} />
    </StatsWidget>
  );
}
