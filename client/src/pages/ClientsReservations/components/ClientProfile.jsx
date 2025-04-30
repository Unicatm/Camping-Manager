import React from "react";
import dateFormatter from "../../../utils/dateFormat";

export default function ClientProfile({ client }) {
  return (
    <div className="flex bg-white w-fit p-6 mb-6 rounded-md divide-blue-950/20 divide-x-[1px]">
      <div className="flex flex-col gap-1 pr-8">
        <h3 className="font-bold text-lg pb-2">Date personale</h3>
        <p>
          <span className="font-semibold">Nume:</span> {client?.nume}
        </p>
        <p>
          <span className="font-semibold">Id:</span> {client?.cnp}
        </p>
        <p>
          <span className="font-semibold">Nationalitate:</span>{" "}
          {client?.nationalitate}
        </p>
        <p>
          <span className="font-semibold">Data nasterii:</span>{" "}
          {dateFormatter(client?.dataNasterii)}
        </p>
      </div>
      {(client?.email || client?.nrTelefon) && (
        <div className="flex flex-col gap-1 pl-8">
          <h3 className="font-bold text-lg pb-2">Date de contact</h3>
          {client?.email && (
            <p>
              <span className="font-semibold">Email:</span> {client?.email}
            </p>
          )}
          {client?.nrTelefon && (
            <p>
              <span className="font-semibold">Telefon:</span>{" "}
              {client?.nrTelefon}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
