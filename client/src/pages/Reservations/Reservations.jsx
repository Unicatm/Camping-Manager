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

function Reservations() {
  const [searchParams] = useSearchParams();
  const highlightId = searchParams.get("highlight");

  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: rezervari, isError, isFetching } = useFetchReservations();
  const handleDeleteRezervare = useDeleteReservation();
  const { isEditing, selectedRezervareId, handleEdit, resetEdit } =
    useHandleEditReservation(openModal);

  return (
    <div className="h-fit lg:h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <ReservationsHeaderSection
          openModal={() => {
            openModal();
          }}
        />

        <ReservationsWidgets />
        <ReservationsFilterSection />

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
          data={rezervari}
          columns={rezervariTableHeads}
          forPreview={false}
          isFetching={isFetching}
          isError={isError}
        >
          <ReservationsTableData
            rezervari={rezervari}
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
