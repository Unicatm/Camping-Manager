import { useEffect, useState } from "react";
import Table from "../components/tables/Table";
import HeaderPage from "../components/HeaderPage";
import ModalRezervari from "../components/modals/ModalRezervari";
import SearchAddSection from "../components/rezervations/SearchAddSection";

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

  console.log(rezervari);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path="Rezervări" />
        <SearchAddSection openModal={() => setIsModalOpen(true)} />
        <Table rezervari={rezervari} isLoading={isFetching} />
        {isModalOpen && (
          <ModalRezervari onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </div>
  );
}

export default Reservations;
