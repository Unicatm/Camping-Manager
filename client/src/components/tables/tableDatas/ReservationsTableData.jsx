import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { TableData, TableRow, TableHead } from "../Table";
import dateFormatter from "../../../utils/dateFormat";
import { getClientName } from "../../../api/clientApi";

function ReservationsTableData({ rezervari, forPreview, onEdit, onDelete }) {
  const [numeClienti, setNumeClienti] = useState({});

  async function fetchClientName(id) {
    const nume = await getClientName(id);
    setNumeClienti((prevNumeClienti) => ({
      ...prevNumeClienti,
      [id]: nume,
    }));
  }

  useEffect(() => {
    rezervari.forEach((rezervare) => {
      if (!numeClienti[rezervare.idClient]) {
        fetchClientName(rezervare.idClient);
      }
    });
  }, [rezervari, numeClienti]);

  useEffect(() => {
    rezervari.forEach((rezervare) => {
      if (!numeClienti[rezervare.idClient]) {
        fetchClientName(rezervare.idClient);
      }
    });
  }, [rezervari, numeClienti]);

  if (rezervari == undefined) {
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
      <TableHead>
        <Link
          to={`/clienti/${rezervare?.idClient}`}
          className="underline underline-offset-2"
        >
          {numeClienti[rezervare?.idClient]}
        </Link>
      </TableHead>
      <TableData>{rezervare?.idLoc}</TableData>
      <TableData>{dateFormatter(rezervare?.dataCheckIn)}</TableData>
      <TableData>{dateFormatter(rezervare?.dataCheckOut)}</TableData>
      <TableData>{rezervare?.facilitati["Adulti"] || "0"}</TableData>
      <TableData>{rezervare?.facilitati["Copii"] || "0"}</TableData>
      <TableData>{rezervare?.hasElectricity ? "Da" : "Nu"}</TableData>
      <TableData>
        {rezervare?.tipAuto.map((tip, idx) => (
          <div key={idx}>{tip}</div>
        ))}
      </TableData>
      {!forPreview ? (
        <td className="flex justify-center items-center space-x-4 px-2 py-3">
          <button
            className="font-medium text-blue-500 hover:underline p-2 cursor-pointer"
            onClick={() => {
              console.log("Edit clicked, rezervare._id:", rezervare._id);
              onEdit(rezervare._id);
            }}
          >
            <PencilIcon className="w-4 h-4" />
          </button>
          <button
            className="font-medium text-rose-600 hover:underline p-2 cursor-pointer"
            onClick={() => {
              onDelete(rezervare._id);
            }}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </td>
      ) : null}
    </TableRow>
  ));
}

export default ReservationsTableData;
