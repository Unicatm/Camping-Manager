import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { getClientReservations } from "../api/clientApi";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/rezervariTabelHeads";

function ClientsReservations() {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["client", "rezervari"],
    queryFn: () => getClientReservations(id),
  });

  console.log(data);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path={`Clienti/ ${data?.nume}`} title={`${data?.nume}`} />
        <Table
          data={data?.rezervari}
          columns={rezervariTableHeads}
          forPreview={true}
          isFetching={isFetching}
        >
          <ReservationsTableData
            rezervari={data?.rezervari}
            numeClient={data?.nume}
            forPreview={true}
          />
        </Table>
      </div>
    </div>
  );
}

export default ClientsReservations;
