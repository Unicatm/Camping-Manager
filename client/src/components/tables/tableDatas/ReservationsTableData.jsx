import React from "react";
import { TableData, TableRow, TableHead } from "../Table";
import dateFormatter from "../../../utils/dateFormat";

function ReservationsTableData({ rezervari, forPreview }) {
  if (rezervari.length === 0) {
    return (
      <TableRow>
        <TableData className="text-center col-span-full">
          Nu sunt date de afișat...
        </TableData>
      </TableRow>
    );
  }

  return rezervari.map((rezervare, index) => (
    <TableRow key={index}>
      <TableHead>{rezervare.idClient}</TableHead>
      <TableData>{rezervare.idLoc}</TableData>
      <TableData>{dateFormatter(rezervare.dataCheckIn)}</TableData>
      <TableData>{dateFormatter(rezervare.dataCheckOut)}</TableData>
      <TableData>{rezervare.facilitati["Adulti"] || "0"}</TableData>
      <TableData>{rezervare.facilitati["Copii"] || "0"}</TableData>
      <TableData>{rezervare.hasElectricity ? "Da" : "Nu"}</TableData>
      <TableData>
        {rezervare.tipAuto.map((tip, idx) => (
          <div key={idx}>{tip}</div>
        ))}
      </TableData>
      {!forPreview ? (
        <TableData>
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </TableData>
      ) : null}
    </TableRow>
  ));
}

export default ReservationsTableData;
