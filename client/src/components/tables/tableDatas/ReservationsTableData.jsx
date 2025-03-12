import { Link } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import React, { useCallback, useEffect, useState } from "react";
import { TableData, TableRow, TableHead } from "../Table";
import dateFormatter from "../../../utils/dateFormat";
import { getClientName } from "../../../api/clientApi";

function ReservationsTableData({ rezervari, forPreview }) {
  const { getItem, setItem } = useLocalStorage("RESERVATIONSNAME_DATA_TABLE");
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
    const cachedData = getItem("RESERVATIONSNAME_DATA_TABLE");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (parsedData && typeof parsedData === "object") {
        setNumeClienti(parsedData);
      }
    }
    rezervari.forEach((rezervare) => {
      if (!numeClienti[rezervare.idClient]) {
        fetchClientName(rezervare.idClient);
      }
    });
  }, [rezervari]);

  const saveNumeRezToStorage = useCallback(() => {
    if (Object.keys(numeClienti).length > 0) {
      setItem(JSON.stringify(numeClienti));
    }
  }, [numeClienti, setItem]);

  useEffect(() => {
    saveNumeRezToStorage();
  }, [saveNumeRezToStorage]);

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
