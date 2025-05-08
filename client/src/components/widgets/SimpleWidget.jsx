import React from "react";
import { StatsWidget } from "./StatsWidget";

export default function SimpleWidget({
  data,
  title,
  unit,
  icon: Icon,
  ...props
}) {
  return (
    <StatsWidget data={data} icon={Icon} {...props}>
      <StatsWidget.Title title={title} />
      <StatsWidget.DisplayData unit={unit} />
    </StatsWidget>
  );
}
