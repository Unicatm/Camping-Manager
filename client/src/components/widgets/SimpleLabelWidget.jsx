import { StatsWidget } from "./StatsWidget";

export default function SimpleLabelWidget({
  data,
  title,
  label,
  icon: Icon,
  ...props
}) {
  return (
    <StatsWidget data={data} icon={Icon} {...props}>
      <StatsWidget.Title title={title} />
      <StatsWidget.DisplayDataLabel label={label} />
    </StatsWidget>
  );
}
