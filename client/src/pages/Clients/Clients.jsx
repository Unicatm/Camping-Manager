import { useState } from "react";
import SearchAddSection from "../../components/tables/SearchAddSection";
import ClientsForm from "./components/form/ClientsForm";
import Table from "../../components/tables/Table";
import clientiTableHeads from "./components/table/clientiTabelHeads";
import ClientsTableData from "./components/table/ClientsTableData";
import ClientsWidgets from "./components/widgets/ClientsWidgets";
import useFetchClients from "./hooks/useFetchClients";
import useDeleteClient from "./hooks/useDeleteClient";
import useModal from "../../components/hooks/useModal";
import useHandleEdit from "./hooks/useHandleEdit";
import ClientsHeaderSection from "./components/ClientsHeaderSection";
import ClientsFilterSection from "./components/ClientsFilterSection";

function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedColumns, setSortedColumns] = useState({});

  const { isModalOpen, openModal, closeModal } = useModal();
  const { data: clienti, isError, isFetching } = useFetchClients();
  const handleDeleteClient = useDeleteClient();
  const { isEditing, selectedClientId, handleEdit, resetEdit } =
    useHandleEdit(openModal);

  const filteredClienti = () => {
    if (!clienti) return [];

    let sortedData = [...clienti];

    const activeSort = Object.entries(sortedColumns).find(
      ([, direction]) => direction !== "none"
    );

    if (activeSort) {
      const [columnId, direction] = activeSort;

      sortedData.sort((a, b) => {
        if (a[columnId] < b[columnId]) return direction === "asc" ? -1 : 1;
        if (a[columnId] > b[columnId]) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedData.filter((client) =>
      client.nume.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSortChange = (newSortedColumns) => {
    setSortedColumns(() => ({ ...newSortedColumns }));
  };

  filteredClienti();

  return (
    <div className="h-screen grow bg-blue-50/90">
      <div className="relative w-11/12 h-full mx-auto py-8 flex flex-col">
        <ClientsHeaderSection openModal={() => openModal()} />

        <ClientsWidgets />
        <ClientsFilterSection onSearch={(term) => setSearchTerm(term)} />

        <Table
          data={filteredClienti()}
          columns={clientiTableHeads}
          forPreview={false}
          isError={isError}
          isFetching={isFetching}
          onSortChange={handleSortChange}
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
              closeModal();
              resetEdit();
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
