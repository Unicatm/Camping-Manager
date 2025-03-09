import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import clientiTableHeads from "./clientiTabelHeads";
import dateFormatter from "../../utils/dateFormat";
import TableHead from "./TableHead";
import { Link } from "react-router-dom";

function ClientsTable({ clienti, isLoading, onEdit, onDelete }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHead heads={clientiTableHeads} forPreview={false} />
        <tbody>
          {isLoading && clienti.length === 0 ? (
            <tr>
              <td
                colSpan={clientiTableHeads.length}
                className="px-6 py-4 text-center"
              >
                {"Datele se încarcă..."}
              </td>
            </tr>
          ) : (
            clienti.map((client, index) => (
              <tr
                key={client.id || index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <Link
                    to={`/clienti/${client._id}`}
                    className="underline underline-offset-2"
                  >
                    {client.nume}
                  </Link>
                </th>
                <td className="px-6 py-4">{client._id}</td>
                <td className="px-6 py-4">{client.nationalitate}</td>
                <td className="px-6 py-4">
                  {dateFormatter(client.dataNasterii)}
                </td>
                <td className="px-6 py-4">
                  <div>{client.nrTelefon || ""}</div>
                  <div>{client.email || ""}</div>
                </td>
                <td className="flex justify-center items-center space-x-4 px-2 py-3">
                  <button
                    className="font-medium text-blue-500 hover:underline p-2 cursor-pointer"
                    onClick={() => onEdit(client._id)}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="font-medium text-rose-600 hover:underline p-2 cursor-pointer"
                    onClick={() => {
                      onDelete(client._id);
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ClientsTable;
