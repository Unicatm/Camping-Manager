import { useEffect, useState } from "react";
import HeaderPage from "../components/HeaderPage";
import ReservationsForm from "../components/forms/ReservationsForm";
import SearchAddSection from "../components/tables/SearchAddSection";
import Table from "../components/tables/Table";
import rezervariTableHeads from "../components/tables/tableHeads/rezervariTabelHeads";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";

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
