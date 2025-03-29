import { useQuery } from "@tanstack/react-query";
import IncomingRevenueChart from "./components/charts/IncomingRevenueChart";
import PredominantNationalitiesChart from "./components/charts/PredominantNationalitiesChart";
import ReservationsTrendChart from "./components/charts/ReservationsTrendChart";
import AgeChart from "./components/charts/AgeChart";
import { getAllAvailableYears } from "../../api/reservationsApi";

export default function Stats() {
  const { data } = useQuery({
    queryKey: ["available-years"],
    queryFn: getAllAvailableYears,
  });

  const years = data?.years || [];

  return (
    <div className="h-screen overflow-y-scroll flex gap-4 grow flex-wrap bg-blue-100/50">
      <IncomingRevenueChart years={years} />
      <PredominantNationalitiesChart years={years} />
      <ReservationsTrendChart years={years} />
      <AgeChart years={years} />
    </div>
  );
}
