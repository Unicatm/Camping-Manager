import { useEffect, useState, useCallback } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import HeaderPage from "../components/HeaderPage";
import ReservationsForm from "../components/forms/ReservationsForm";
import SearchAddSection from "../components/tables/SearchAddSection";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/rezervariTabelHeads";
import { getAllRezervari } from "../api/reservationsApi";

function Reservations() {
  const { getItem, setItem } = useLocalStorage("RESERVATIONS_DATA_TABLE");
  const [isFetching, setIsFetching] = useState(false);
  const [rezervari, setRezervari] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchRezervari() {
    setIsFetching(true);
    try {
      const data = await getAllRezervari();
      setRezervari(data);
    } catch (error) {
      console.error("Failed to fetch rezervari:", error);
    } finally {
      setIsFetching(false);
    }
  }

  // useEffect(() => {
  //   setIsFetching(true);
  //   fetchRezervari();
  // }, []);

  useEffect(() => {
    const cachedData = getItem("RESERVATIONS_DATA_TABLE");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (Array.isArray(parsedData)) {
        setRezervari(parsedData);
      }
    }
    fetchRezervari();
  }, []);

  const saveRezervariToStorage = useCallback(() => {
    if (rezervari.length > 0) {
      setItem(JSON.stringify(rezervari));
    }
  }, [rezervari, setItem]);

  useEffect(() => {
    saveRezervariToStorage();
  }, [saveRezervariToStorage]);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path="Rezervări" title="Rezervări" />
        <SearchAddSection
          openModal={() => setIsModalOpen(true)}
          buttonText="Adaugă o rezervare"
        />
        {isModalOpen && (
          <ReservationsForm onClose={() => setIsModalOpen(false)} />
        )}
        <Table
          data={rezervari}
          columns={rezervariTableHeads}
          isLoading={isFetching}
          forPreview={false}
        >
          <ReservationsTableData rezervari={rezervari} forPreview={false} />
        </Table>
      </div>
    </div>
  );
}

export default Reservations;
