import { useQuery } from "@tanstack/react-query";
import IncomingRevenueChart from "./components/charts/IncomingRevenueChart";
import PredominantNationalitiesChart from "./components/charts/PredominantNationalitiesChart";
import ReservationsTrendChart from "./components/charts/ReservationsTrendChart";
import AgeChart from "./components/charts/AgeChart";
import { getAllAvailableYears } from "../../api/reservationsApi";
import SimpleWidget from "../../components/widgets/SimpleWidget";
import StatsWidgets from "./components/StatsWidgets";

export default function Stats() {
  const { data } = useQuery({
    queryKey: ["available-years"],
    queryFn: getAllAvailableYears,
  });

  const years = data?.years || [];

  return (
    <div className="h-max grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col gap-4">
        <h2 className="font-bold text-2xl pb-4 lg:pb-6 lg:text-2xl">
          Statistici
        </h2>
        <StatsWidgets />
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 flex-1">
          <div className="w-fit text-2xl pt-6 pb-2 font-bold">Grafice</div>
          <IncomingRevenueChart years={years} />
          <PredominantNationalitiesChart years={years} />
          <ReservationsTrendChart years={years} />
          <AgeChart years={years} />
        </div>
      </div>
    </div>
  );
}
