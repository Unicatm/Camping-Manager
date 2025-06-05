import CampMap from "../CampingMap/Map";
import ActionSection from "./components/ActionSection";
import CheckOutCard from "./components/CheckOutCard";
import PriceList from "./components/PriceList/PriceList";
import WidgetsSection from "./components/WidgetsSection";

export default function Home() {
  return (
    <div className="lg:h-max grow bg-blue-50/90">
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-4 lg:grid-rows-6 lg:gap-4 relative w-11/12 h-fit lg:h-screen mx-auto py-8">
        <ActionSection />
        <WidgetsSection />
        <PriceList />
        <CheckOutCard />
        
      </div>
    </div>
  );
}
