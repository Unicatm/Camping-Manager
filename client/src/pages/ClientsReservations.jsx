import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { getClient } from "../api/clientApi";
import { getRezervariByClientId } from "../api/reservationsApi";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/tableHeads/rezervariTabelHeads";

function ClientsReservations() {
  const { id } = useParams();
  const [client, setClient] = useState({});
  const [rezervari, setRezervari] = useState([]);
  const navigate = useNavigate();

  async function fetchClient() {
    try {
      const data = await getClient(id);
      if (data == null) {
        navigate("/clienti");
      } else {
        setClient(data);
        fetchRezervari();
      }
    } catch (error) {
      console.error("Failed to fetch client:", error);
    }
  }

  async function fetchRezervari() {
    try {
      const data = await getRezervariByClientId(id);
      setRezervari(data);
    } catch (error) {
      console.error("Failed to fetch rezervari:", error);
    }
  }

  useEffect(() => {
    fetchClient();
  }, [id]);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path={`Clienti/ ${client.nume}`} title={`${client.nume}`} />
        <Table data={rezervari} columns={rezervariTableHeads} forPreview={true}>
          <ReservationsTableData rezervari={rezervari} forPreview={true} />
        </Table>
      </div>
    </div>
  );
}

export default ClientsReservations;
