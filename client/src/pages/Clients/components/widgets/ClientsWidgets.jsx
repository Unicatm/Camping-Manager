import React from "react";
import AnalyticWidget from "../../../../components/widgets/AnalyticWidget";
import useClientGrowthData from "./hooks/useClientGrowthData";
import { RiLoopLeftFill } from "react-icons/ri";
import useWeeklyNewClientsStats from "./hooks/useWeeklyNewClientsStats";

export default function ClientsWidgets() {
  const { data: clientGrowthData } = useClientGrowthData();
  const { data: weeklyNewClientsData } = useWeeklyNewClientsStats();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-10 lg:pb-6">
      <AnalyticWidget
        data={clientGrowthData}
        title={"Total clienți"}
        icon={RiLoopLeftFill}
        referenceText={"față de săptămâna trecută"}
      />
      <AnalyticWidget
        data={weeklyNewClientsData}
        title={"Clienți noi"}
        icon={RiLoopLeftFill}
        referenceText={"față de săptămâna trecută"}
      />
    </div>
  );
}
