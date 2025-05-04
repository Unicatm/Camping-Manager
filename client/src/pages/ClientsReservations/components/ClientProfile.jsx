import React from "react";
import {
  UserIcon,
  MapPinIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import dateFormatter from "../../../utils/dateFormat";
import { format } from "date-fns";
import { ro } from "date-fns/locale";

export default function ClientProfile({ client }) {
  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-6 bg-white rounded-lg p-6 shadow-sm shadow-slate-200 w-full h-full border-[1px] border-slate-300">
      <h2 className="text-lg font-bold mb-6">Informații Client</h2>

      <div className="flex flex-col items-center text-center mb-6">
        <div className="bg-blue-100 text-blue-700 w-16 h-16 flex items-center justify-center rounded-full text-2xl font-semibold">
          MI
        </div>
        <h3 className="text-xl font-bold mt-2">{client?.nume}</h3>
        <p className="text-sm text-slate-500">
          {client?.createdAt &&
            `Client din ${formatCreatedAt(client?.createdAt)}`}
        </p>
      </div>

      <div className="border-t border-slate-300 pt-4">
        <p className="text-sm font-semibold text-slate-500 mb-2">
          Date personale
        </p>
        <Field title="ID Client" data={client?.cnp} icon={UserIcon} />
        <Field
          title="Naționalitate"
          data={client?.nationalitate}
          icon={MapPinIcon}
        />
        <Field
          title="Data nașterii"
          data={`${dateFormatter(client?.dataNasterii)}`}
          icon={CalendarIcon}
        />
      </div>
      {client?.email || client?.telefon ? (
        <div className="border-t border-slate-300 mt-4 pt-4">
          <p className="text-sm font-semibold text-slate-500 mb-2">
            Date de contact
          </p>
          {client?.email ? (
            <Field title="Email" data={client?.email} icon={EnvelopeIcon} />
          ) : null}
          {client?.telefon ? (
            <Field title="Telefon" data={client?.telefon} icon={PhoneIcon} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const formatCreatedAt = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return capitalize(format(date, "MMMM yyyy", { locale: ro }));
};

const Field = ({ title, data, icon: Icon }) => (
  <div className="flex items-start gap-3 mb-3">
    <Icon className="w-5 h-5 text-slate-500 mt-1" />
    <div>
      <p className="text-xs font-medium text-slate-950">{title}</p>
      <p className="text-sm text-slate-500">{data}</p>
    </div>
  </div>
);
