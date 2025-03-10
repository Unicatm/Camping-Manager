import React from "react";
import { Link } from "react-router-dom";
import { TableData, TableRow, TableHead } from "../Table";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import dateFormatter from "../../../utils/dateFormat";

function ClientsTableData({ clienti, forPreview, onEdit, onDelete }) {
  return clienti.map((client, index) => (
    <TableRow key={index}>
      <TableHead>
        <Link
          to={`/clienti/${client._id}`}
          className="underline underline-offset-2"
        >
          {client.nume}
        </Link>
      </TableHead>
      <TableData>{client._id}</TableData>
      <TableData>{client.nationalitate}</TableData>
      <TableData>{dateFormatter(client.dataNasterii)}</TableData>
      <TableData>
        {" "}
        <div>{client.nrTelefon || ""}</div>
        <div>{client.email || ""}</div>
      </TableData>
      {!forPreview ? (
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
      ) : null}
    </TableRow>
  ));
}

export default ClientsTableData;
