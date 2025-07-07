import CampMap from "../CampingMap/Map";
import ReservationsForm from "../Reservations/components/form/ReservationsForm";
import ClientsForm from "../Clients/components/form/ClientsForm";
import ActionSection from "./components/ActionSection";
import CheckOutCard from "./components/CheckOutCard";
import PriceList from "./components/PriceList/PriceList";
import WidgetsSection from "./components/WidgetsSection";
import { useState } from "react";

export default function Home() {
  const [isRezervareModalOpen, setRezervareModalOpen] = useState(false);
  const [isClientModalOpen, setClientModalOpen] = useState(false);

  return (
    <div className="h-fill grow bg-blue-50/90">
      <div className="flex flex-col gap-2 lg:grid lg:grid-cols-4 lg:grid-rows-6 lg:gap-4 relative w-11/12 h-fit lg:h-screen mx-auto py-8">
        <ActionSection
          onAddRezervare={() => setRezervareModalOpen(true)}
          onAddClient={() => setClientModalOpen(true)}
        />
        <WidgetsSection />
        <PriceList />
        <CheckOutCard />

        {isRezervareModalOpen && (
          <ReservationsForm
            onClose={() => setRezervareModalOpen(false)}
            isEditing={false}
          />
        )}

        {isClientModalOpen && (
          <ClientsForm
            onClose={() => setClientModalOpen(false)}
            isEditing={false}
          />
        )}
      </div>
    </div>
  );
}
