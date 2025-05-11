import { useQuery } from "@tanstack/react-query";
import IncomingRevenueChart from "./components/charts/IncomingRevenueChart";
import PredominantNationalitiesChart from "./components/charts/PredominantNationalitiesChart";
import ReservationsTrendChart from "./components/charts/ReservationsTrendChart";
import AgeChart from "./components/charts/AgeChart";
import { getAllAvailableYears } from "../../api/reservationsApi";
import { RiLoopLeftFill } from "react-icons/ri";
import { MdOutlinePlace, MdOutlineBookmarks } from "react-icons/md";
import { BanknotesIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import useTotalReservationsData from "../Reservations/components/widgets/hooks/useTotalReservationsData";
import SimpleWidget from "../../components/widgets/SimpleWidget";
import useClientGrowthData from "../Clients/components/widgets/hooks/useClientGrowthData";
import useTotalSpaces from "./hooks/useTotalSpaces";
import useCurrentYearRevenue from "./hooks/useCurrentYearRevenue";

export default function Stats() {
  const { data } = useQuery({
    queryKey: ["available-years"],
    queryFn: getAllAvailableYears,
  });

  const years = data?.years || [];

  const { data: totalReservations } = useTotalReservationsData();
  const { data: clientGrowthData } = useClientGrowthData();
  const { data: totalNumberOfSpaces } = useTotalSpaces();
  const { data: currentYearRevenue } = useCurrentYearRevenue();

  return (
    <div className="h-fit grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col gap-4">
        <h2 className="font-bold text-xl pb-6">Statistici</h2>
        <div className="grid grid-cols-4 gap-4 flex-1">
          <SimpleWidget
            title={"Rezervari totale"}
            data={totalReservations}
            icon={MdOutlineBookmarks}
          />
          <SimpleWidget
            title={"Număr clienți"}
            data={clientGrowthData}
            icon={UserGroupIcon}
          />
          <SimpleWidget
            title={"Total locuri"}
            data={totalNumberOfSpaces}
            icon={MdOutlinePlace}
          />
          <SimpleWidget
            title={"Încasări an curent"}
            data={currentYearRevenue}
            icon={BanknotesIcon}
            unit={"lei"}
          />

          <IncomingRevenueChart years={years} />
          <PredominantNationalitiesChart years={years} />
          <ReservationsTrendChart years={years} />
          <AgeChart years={years} />
        </div>
      </div>
    </div>
  );
}
