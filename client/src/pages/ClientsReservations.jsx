import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { getClient } from "../api/clientApi";
import { getRezervariByClientId } from "../api/reservationsApi";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/rezervariTabelHeads";

function ClientsReservations() {
  const { id } = useParams();
  console.log(id);
  const [client, setClient] = useState({});
  const [rezervari, setRezervari] = useState([]);
  const navigate = useNavigate();

  async function fetchClient() {
    try {
      const clientData = await getClient(id);
      if (!clientData) {
        navigate("/clienti");
        return;
      }

      const rezervariData = await getRezervariByClientId(id);

      setClient(clientData);
      setRezervari(rezervariData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
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

  useEffect(() => {
    if (client?._id) {
      fetchRezervari();
    }
  }, [client]);

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
