import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderPage from "../components/HeaderPage";
import ReservationsForm from "../components/forms/ReservationsForm";
import SearchAddSection from "../components/tables/SearchAddSection";
import Table from "../components/tables/Table";
import ReservationsTableData from "../components/tables/tableDatas/ReservationsTableData";
import rezervariTableHeads from "../components/tables/rezervariTabelHeads";
import { deleteRezervare, getAllRezervari } from "../api/reservationsApi";

function Reservations() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRezervareId, setSelectedRezervareId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: rezervari,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["rezervari", "list"],
    queryFn: getAllRezervari,
  });

  console.log(rezervari);

  const queryClient = useQueryClient();

  const deleteMutationRezervare = useMutation({
    mutationFn: deleteRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      refetch();
    },
  });

  const handleDeleteRezervare = (id) => {
    deleteMutationRezervare.mutate(id);
  };

  const handleEdit = (rezervareId) => {
    console.log("handleEdit called with rezervareId:", rezervareId);
    setIsEditing(true);
    setSelectedRezervareId(rezervareId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
      setSelectedRezervareId(id);
      console.log("Rez uf");
      console.log(id);
    }
  }, [id]);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 py-8 place-self-center">
        <HeaderPage path="Rezervări" title="Rezervări" />
        <SearchAddSection
          openModal={() => {
            setIsEditing(false);
            setSelectedRezervareId(null);
            setIsModalOpen(true);
          }}
          buttonText="Adaugă o rezervare"
        />
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
        <Table
          data={rezervari}
          columns={rezervariTableHeads}
          forPreview={false}
          isFetching={isFetching}
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
  );
}

export default Reservations;
