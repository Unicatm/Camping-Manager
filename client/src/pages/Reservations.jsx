import { useEffect, useState } from "react";
import ReservationsTable from "../components/tables/ReservationsTable";
import HeaderPage from "../components/HeaderPage";
import ReservationsForm from "../components/forms/ReservationsForm";
import SearchAddSection from "../components/tables/SearchAddSection";

function Reservations() {
  const [isFetching, setIsFetching] = useState(false);
  const [rezervari, setRezervari] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    async function fetchRezervari() {
      const res = await fetch("http://127.0.0.1:3000/api/v1/rezervari");
      const resData = await res.json();
      setRezervari(resData.data.rezervari);
      setIsFetching(false);
    }

    fetchRezervari();
  }, []);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path="Rezervări" />
        <SearchAddSection
          openModal={() => setIsModalOpen(true)}
          buttonText="Adaugă o rezervare"
        />
        <ReservationsTable rezervari={rezervari} isLoading={isFetching} />
        {isModalOpen && (
          <ReservationsForm onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default Reservations;
