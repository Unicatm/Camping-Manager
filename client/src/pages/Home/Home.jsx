import CampMap from "../CampingMap/Map";
import ActionSection from "./components/ActionSection";
import CheckOutCard from "./components/CheckOutCard";
import PriceList from "./components/PriceList/PriceList";
import WidgetsSection from "./components/WidgetsSection";

export default function Home() {
  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="grid grid-cols-4 grid-rows-6 gap-4 relative w-11/12 h-full mx-auto py-8">
        <ActionSection />
        <WidgetsSection />
        <PriceList />
        <CheckOutCard />
      </div>
    </div>
  );
}
