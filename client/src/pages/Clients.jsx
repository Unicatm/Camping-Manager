import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { deleteClient, getClienti } from "../api/clientApi";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import HeaderPage from "../components/HeaderPage";
import SearchAddSection from "../components/tables/SearchAddSection";
import ClientsForm from "../components/forms/ClientsForm";
import Table from "../components/tables/Table";
import clientiTableHeads from "../components/tables/tableHeads/clientiTabelHeads";
import ClientsTableData from "../components/tables/tableDatas/ClientsTableData";

function Clients() {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clienti, setClienti] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getItem, setItem } = useLocalStorage("CLIENTS_DATA_TABLE");

  async function fetchClienti() {
    setIsFetching(true);
    try {
      const data = await getClienti();
      setClienti(data);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    const cachedData = getItem("CLIENTS_DATA_TABLE");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (Array.isArray(parsedData)) {
        setClienti(parsedData);
      }
    }
    fetchClienti();
  }, []);

  const saveClientiToStorage = useCallback(() => {
    if (clienti.length > 0) {
      setItem(JSON.stringify(clienti));
    }
  }, [clienti, setItem]);

  useEffect(() => {
    saveClientiToStorage();
  }, [saveClientiToStorage]);

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
      setSelectedClientId(id);
    }
  }, [isEditing, id]);

  const handleEdit = (clientId) => {
    setIsEditing(true);
    setSelectedClientId(clientId);
    setIsModalOpen(true);
  };

  const handleDelete = async (clientId) => {
    try {
      const res = await deleteClient(clientId);
      res.ok ? fetchClienti() : console.error("Eroare la ștergerea clientului");
    } catch (error) {
      console.error(error);
    }
  };

  const filteredClienti = clienti.filter((client) =>
    client.nume.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path="Clienți" title="Clienți" />
        <SearchAddSection
          openModal={() => setIsModalOpen(true)}
          buttonText="Adaugă un client"
          onSearch={(term) => setSearchTerm(term)}
        />

        <Table
          data={filteredClienti}
          columns={clientiTableHeads}
          isLoading={isFetching}
          forPreview={false}
        >
          <ClientsTableData
            clienti={filteredClienti}
            forPreview={false}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Table>

        {isModalOpen && (
          <ClientsForm
            onClientAdded={fetchClienti}
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
