import { useEffect, useState } from "react";
import Table from "../components/clienti/tabels/Table";
import HeaderPage from "../components/HeaderPage";
import SearchAddSection from "../components/clienti/SearchAddSection";
import ModalClienti from "../components/clienti/modals/ModalClienti";
import { useParams } from "react-router-dom";

function Clients() {
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clienti, setClienti] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  async function fetchClienti() {
    const res = await fetch("http://127.0.0.1:3000/api/v1/clients");
    const resData = await res.json();
    setClienti(resData.data.clients);
    setIsFetching(false);
  }

  useEffect(() => {
    if (isEditing) {
      setIsModalOpen(true);
      setSelectedClientId(id);
    }
  }, [id]);

  const handleEdit = (clientId) => {
    setIsEditing(true);
    setSelectedClientId(clientId);
    setIsModalOpen(true);
  };

  const handleDelete = async (clientId) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/v1/clients/${clientId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.ok) {
        fetchClienti();
      } else {
        console.error("Eroare la ștergerea clientului");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchClienti();
  }, []);

  return (
    <div className="h-screen grow bg-blue-100/50">
      <div className="relative w-11/12 place-self-center">
        <HeaderPage path="Clienți" />
        <SearchAddSection openModal={() => setIsModalOpen(true)} />
        <Table
          clienti={clienti}
          isLoading={isFetching}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <ModalClienti
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
