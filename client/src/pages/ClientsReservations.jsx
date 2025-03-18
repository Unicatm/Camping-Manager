import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { getClient } from "../api/clientApi";
import { getRezervariByClientId } from "../api/reservationsApi";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/rezervariTabelHeads";

function ClientsReservations() {
  const { id } = useParams();

  const { data: client } = useQuery({
    queryKey: ["client"],
    queryFn: () => getClient(id),
  });

  const { data: rezervari, isFetching } = useQuery({
    queryKey: ["rezervari", "client"],
    queryFn: () => getRezervariByClientId(id),
  });

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage
          path={`Clienti/ ${client?.nume}`}
          title={`${client?.nume}`}
        />
        <Table
          data={rezervari}
          columns={rezervariTableHeads}
          forPreview={true}
          isFetching={isFetching}
        >
          <ReservationsTableData rezervari={rezervari} forPreview={true} />
        </Table>
      </div>
    </div>
  );
}

export default ClientsReservations;
