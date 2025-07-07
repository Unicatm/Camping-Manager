import Map from "./Map";
import HeaderSection from "../../components/headerSection/HeaderSection";
import { useState } from "react";
import ReservationsForm from "../Reservations/components/form/ReservationsForm";

export default function CampingMap() {
  const [isRezervareModalOpen, setRezervareModalOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  const handleAddRezervareFromMap = (spot) => {
    setSelectedSpot(spot);
    setRezervareModalOpen(true);
  };

  const closeRezervareModal = () => {
    setRezervareModalOpen(false);
    setSelectedSpot(null);
  };

  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <HeaderSection
          title="Hartă"
          subtitle="Vizualizează locurile din camping în timp real"
        />
        {/* <div className="text-blue-950/60">
          <p className="pb-2 text-blue-950 font-medium">Legendă</p>
          <div className="flex gap-1 items-center">
            <div className="w-5 h-5 bg-red-600 rounded-sm"></div>
            <p>- loc ocupat</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-5 h-5 bg-amber-400 rounded-sm"></div>
            <p>- loc fară energie</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="w-5 h-5 bg-lime-600 rounded-sm"></div>
            <p>- loc cu energie</p>
          </div>
        </div> */}
        <Map onAddRezervare={handleAddRezervareFromMap} />

        {isRezervareModalOpen && (
          <ReservationsForm
            onClose={closeRezervareModal}
            isEditing={false}
            initialSpot={selectedSpot}
          />
        )}
      </div>
    </div>
  );
}
