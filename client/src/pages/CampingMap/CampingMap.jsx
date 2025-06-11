import Map from "./Map";
import HeaderSection from "../../components/headerSection/HeaderSection";

export default function CampingMap() {
  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <HeaderSection
          title="Hartă"
          subtitle="Vizualizează locurile din camping în timp real"
        />
        <Map />
      </div>
    </div>
  );
}
