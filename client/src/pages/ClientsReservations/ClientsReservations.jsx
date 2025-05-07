import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getClientReservations } from "../../api/clientApi";
import Table from "../../components/tables/Table";
import ReservationsTableData from "../Reservations/components/table/ReservationsTableData";
import rezervariTableHeads from "../Reservations/components/table/rezervariTabelHeads";
import ClientProfile from "./components/ClientProfile";
import HeaderSection from "../../components/headerSection/HeaderSection";
import ClientWidgetsSection from "./components/ClientWidgetsSection";

function ClientsReservations() {
  const { id } = useParams();

  const { data, isFetching } = useQuery({
    queryKey: ["client", "rezervari"],
    queryFn: () => getClientReservations(id),
  });

  return (
    <div className="w-full h-screen flex flex-col bg-blue-50/90">
      <div className="w-11/12 mx-auto py-8 flex flex-col flex-grow">
        <HeaderSection
          title={"Profil client"}
          subtitle={"Vizualizează și gestionează informațiile clienților"}
        />

        <div className="grid grid-cols-4 grid-rows-5 gap-6 flex-grow h-full">
          <ClientProfile client={data} />

          <div className="col-start-2 col-end-5 row-start-1 row-end-6 flex flex-col gap-6">
            <ClientWidgetsSection idClient={id} />
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
