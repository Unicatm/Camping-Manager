import { StatsWidget } from "./StatsWidget";

export default function DoubleDataWidget({
  data,
  title,
  icon: Icon,
  firstUnit,
  secontUnit,
  firstDataKey,
  secondDataKey,
  ...props
}) {
  return (
    <StatsWidget data={data} icon={Icon} {...props}>
      <StatsWidget.Title title={title} />
      <StatsWidget.DisplayDoubleDataLabel
        firstUnit={firstUnit}
        secondUnit={secontUnit}
        firstDataKey={firstDataKey}
        secondDataKey={secondDataKey}
      />
    </StatsWidget>
  );
}
