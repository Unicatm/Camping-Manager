import React from "react";
import { Link } from "react-router-dom";
import {
  TableData,
  TableRow,
  TableHead,
} from "../../../../components/tables/Table";
import dateFormatter from "../../../../utils/dateFormat";
import DropdownDeleteMenu from "../../../../components/tables/DropdownDeleteMenu";

function ClientsTableData({ clienti, forPreview, onEdit, onDelete }) {
  return clienti.toReversed().map((client, index) => (
    <TableRow key={index}>
      <TableHead>
        <Link to={`/clienti/${client._id}`} className="hover:text-slate-700">
          {client.nume}
        </Link>
      </TableHead>
      <TableData>{client.cnp}</TableData>
      <TableData>{client.nationalitate || "━"}</TableData>
      <TableData>{dateFormatter(client.dataNasterii)}</TableData>
      <TableData>
        {!client.nrTelefon && !client.email ? (
          <div>━</div>
        ) : (
          <>
            <div>{client.nrTelefon || ""}</div>
            <div>{client.email || ""}</div>
          </>
        )}
      </TableData>
      {!forPreview ? (
        <DropdownDeleteMenu
          rezervareId={client._id}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : null}
    </TableRow>
  ));
}

export default ClientsTableData;
