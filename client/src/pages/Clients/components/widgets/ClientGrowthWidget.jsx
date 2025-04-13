import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { StatsWidget } from "../../../../components/widgets/StatsWidget";
import useClientGrowthData from "./hooks/useClientGrowthData";

export default function ClientGrowthWidget() {
  const { data: clientGrowthData } = useClientGrowthData();
  return (
    <StatsWidget data={clientGrowthData}>
      <StatsWidget.Title title="Numar clienti" icon={RiLoopLeftFill} />
      <StatsWidget.ChangeIndicator referenceText="fata de saptamana trecuta" />
    </StatsWidget>
  );
}
