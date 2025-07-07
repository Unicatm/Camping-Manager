import useTotalReservationsData from "../../Reservations/components/widgets/hooks/useTotalReservationsData";
import useClientGrowthData from "../../Clients/components/widgets/hooks/useClientGrowthData";
import useTotalSpaces from "../hooks/useTotalSpaces";
import useCurrentYearRevenue from "../hooks/useCurrentYearRevenue";
import {
  BanknotesIcon,
  UserGroupIcon,
  BookmarkIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import SimpleWidget from "../../../components/widgets/SimpleWidget";

export default function StatsWidgets() {
  const { data: totalReservations } = useTotalReservationsData();
  const { data: clientGrowthData } = useClientGrowthData();
  const { data: totalNumberOfSpaces } = useTotalSpaces();
  const { data: currentYearRevenue } = useCurrentYearRevenue();
  return (
    <div className="grid w-full gap-4 pb-10 lg:pb-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <SimpleWidget
        title={"Rezervari totale"}
        data={totalReservations}
        icon={BookmarkIcon}
      />
      <SimpleWidget
        title={"Număr clienți"}
        data={clientGrowthData}
        icon={UserGroupIcon}
      />
      <SimpleWidget
        title={"Total locuri"}
        data={totalNumberOfSpaces}
        icon={MapPinIcon}
      />
      <SimpleWidget
        title={"Încasări an curent"}
        data={currentYearRevenue}
        icon={BanknotesIcon}
        unit={"lei"}
      />
    </div>
  );
}
