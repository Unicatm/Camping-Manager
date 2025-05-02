import PricesListWidget from "./components/widgets/PricesListWidget";
import FreeSpacesWidget from "../Reservations/widgets/FreeSpacesWidget";
import AverageDaysSpentWidget from "../Reservations/widgets/AverageDaysSpentWidget";

export default function Home() {
  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <FreeSpacesWidget width={"w-fit"} />
        <AverageDaysSpentWidget width={"w-fit"} />
        <PricesListWidget />
      </div>
    </div>
  );
}
