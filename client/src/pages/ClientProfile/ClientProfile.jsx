import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientReservations } from "../../api/clientApi";
import Table from "../../components/tables/Table";
import ReservationsTableData from "../Reservations/components/table/ReservationsTableData";
import rezervariTableHeads from "../Reservations/components/table/rezervariTabelHeads";
import ClientCard from "./components/ClientCard";
import ClientWidgetsSection from "./components/ClientWidgetsSection";
import ClientProfileHeaderSection from "./components/ClientProfileHeaderSection";

function ClientsReservations() {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["client", "rezervari"],
    queryFn: () => getClientReservations(id),
  });

  return (
    <div className="w-full h-max flex flex-col bg-blue-50/90">
      <div className="w-11/12 mx-auto py-8 flex flex-col flex-grow">
        <ClientProfileHeaderSection id={id} />

        <div className="flex flex-col lg:grid xl:grid-cols-4 xl:grid-rows-5 gap-6 flex-grow h-full">
          <ClientCard client={data} />

          <ClientWidgetsSection idClient={id} />
          <div className="lg:col-start-1 lg:col-end-3 lg:row-start-6 lg:row-end-7 xl:col-start-2 xl:col-end-5 xl:row-start-2 xl:row-end-6 flex flex-col gap-6">
            <div>
              <h2 className="text-lg font-bold">Istoricul rezervărilor</h2>
              <p className="text-sm text-slate-500">
                Toate rezervările clientului {data?.nume}
              </p>
            </div>
            <div className="flex-grow overflow-auto">
              <Table
                data={data?.rezervari ?? []}
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
        </div>
      </div>
    </div>
  );
}

export default ClientsReservations;
