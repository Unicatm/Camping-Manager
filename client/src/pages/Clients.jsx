import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteClient, getClienti } from "../api/clientApi";
import HeaderPage from "../components/HeaderPage";
import SearchAddSection from "../components/tables/SearchAddSection";
import ClientsForm from "../components/forms/ClientsForm";
import Table from "../components/tables/Table";
import clientiTableHeads from "../components/tables/clientiTabelHeads";
import ClientsTableData from "../components/tables/tableDatas/ClientsTableData";

function Clients() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: clienti,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["clienti", "list"],
    queryFn: getClienti,
  });

  const queryClient = useQueryClient();

  const deleteMutationClient = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
    },
  });

  const handleDeleteClient = (id) => {
    deleteMutationClient.mutate(id);
  };

  const handleEdit = (clientId) => {
    setIsEditing(true);
    setSelectedClientId(clientId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
      setSelectedClientId(id);
    }
  }, [id]);

  const filteredClienti = () => {
    if (clienti == undefined) {
      return clienti;
    } else {
      return clienti.filter((client) =>
        client.nume.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <HeaderPage path="Clienți" title="Clienți" />
        <SearchAddSection
          openModal={() => setIsModalOpen(true)}
          buttonText="Adaugă un client"
          onSearch={(term) => setSearchTerm(term)}
        />

        <Table
          data={filteredClienti()}
          columns={clientiTableHeads}
          isLoading={isLoading}
          forPreview={false}
          isError={isError}
        >
          <ClientsTableData
            clienti={filteredClienti()}
            forPreview={false}
            onEdit={handleEdit}
            onDelete={handleDeleteClient}
          />
        </Table>

        {isModalOpen && (
          <ClientsForm
            onClose={() => {
              setIsModalOpen(false);
              setSelectedClientId(null);
              setIsEditing(false);
            }}
            isEditing={isEditing}
            clientId={selectedClientId}
          />
        )}
      </div>
    </div>
  );
}

export default Clients;
