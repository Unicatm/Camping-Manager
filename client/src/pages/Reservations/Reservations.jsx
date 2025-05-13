import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReservationsForm from "./components/form/ReservationsForm";
import Table from "../../components/tables/Table";
import ReservationsTableData from "./components/table/ReservationsTableData";
import rezervariTableHeads from "./components/table/rezervariTabelHeads";
import { deleteRezervare, getAllRezervari } from "../../api/reservationsApi";
import ReservationsHeaderSection from "./components/ReservationsHeaderSection";
import ReservationsFilterSection from "./components/ReservationsFilterSection";
import ReservationsWidgets from "./components/widgets/ReservationsWidgets";

function Reservations() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRezervareId, setSelectedRezervareId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: rezervari,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["rezervari", "list"],
    queryFn: getAllRezervari,
  });

  const queryClient = useQueryClient();

  const deleteMutationRezervare = useMutation({
    mutationFn: deleteRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      queryClient.invalidateQueries({ queryKey: ["totalReservations"] });
      queryClient.invalidateQueries({ queryKey: ["averageDaysSpent"] });
      queryClient.invalidateQueries({ queryKey: ["totalActiveReservations"] });
      queryClient.invalidateQueries({ queryKey: ["currentYearRevenue"] });
      queryClient.invalidateQueries({ queryKey: ["checkoutCard"] });
      refetch();
    },
  });

  const handleDeleteRezervare = (id) => {
    deleteMutationRezervare.mutate(id);
  };

  const handleEdit = (rezervareId) => {
    setIsEditing(true);
    setSelectedRezervareId(rezervareId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
      setSelectedRezervareId(id);
    }
  }, [id]);

  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <ReservationsHeaderSection
          openModal={() => {
            setIsEditing(false);
            setSelectedRezervareId(null);
            setIsModalOpen(true);
          }}
        />

        <ReservationsWidgets />
        <ReservationsFilterSection />

        {isModalOpen && (
          <ReservationsForm
            onClose={() => {
              setIsModalOpen(false);
              setIsEditing(false);
              setSelectedRezervareId(null);
            }}
            rezervareId={selectedRezervareId}
            isEditing={isEditing}
          />
        )}
        <div className="flex-1 overflow-hidden">
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
            />
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Reservations;
