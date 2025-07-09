import { useSearchParams } from "react-router-dom";
import ReservationsForm from "./components/form/ReservationsForm";
import Table from "../../components/tables/Table";
import ReservationsTableData from "./components/table/ReservationsTableData";
import rezervariTableHeads from "./components/table/rezervariTabelHeads";
import ReservationsHeaderSection from "./components/ReservationsHeaderSection";
import ReservationsFilterSection from "./components/ReservationsFilterSection";
import ReservationsWidgets from "./components/widgets/ReservationsWidgets";
import useDeleteReservation from "./hooks/useDeleteReservation";
import useModal from "../../components/hooks/useModal";
import useHandleEditReservation from "./hooks/useHandleEditReservation";
import useFetchReservations from "./hooks/useFetchReservations";
import { useEffect, useState } from "react";

function Reservations() {
  const [filters, setFilters] = useState({ searchText: "", status: "Toate" });
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    data: rezervari,
    isError,
    isFetching,
  } = useFetchReservations({ status: filters.status });
  const handleDeleteRezervare = useDeleteReservation();
  const { isEditing, selectedRezervareId, handleEdit, resetEdit } =
    useHandleEditReservation(openModal);

  const filteredReservations = rezervari?.filter((rezervare) => {
    const clientName = rezervare.numeClient || "";
    return clientName.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  useEffect(() => {
    console.log(filteredReservations);
  }, [filteredReservations]);

  return (
    <div className="h-max grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <ReservationsHeaderSection
          openModal={() => {
            openModal();
          }}
        />

        <ReservationsWidgets />
        <ReservationsFilterSection onSearch={setFilters} filters={filters} />

        {isModalOpen && (
          <ReservationsForm
            onClose={() => {
              closeModal();
              resetEdit();
            }}
            rezervareId={selectedRezervareId}
            isEditing={isEditing}
          />
        )}
        <Table
          data={filteredReservations}
          columns={rezervariTableHeads}
          forPreview={false}
          isFetching={isFetching}
          isError={isError}
        >
          <ReservationsTableData
            rezervari={filteredReservations}
            forPreview={false}
            onEdit={handleEdit}
            onDelete={handleDeleteRezervare}
            highlightId={highlightId}
          />
        </Table>
      </div>
    </div>
  );
}

export default Reservations;
