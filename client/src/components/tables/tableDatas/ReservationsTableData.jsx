import { Link } from "react-router-dom";
import { TrashIcon, PencilIcon } from "@heroicons/react/16/solid";
import { TableData, TableRow, TableHead } from "../Table";
import dateFormatter from "../../../utils/dateFormat";

function ReservationsTableData({
  rezervari,
  forPreview,
  onEdit,
  onDelete,
  ...props
}) {
  return rezervari.map((rezervare, index) => (
    <TableRow key={index}>
      <TableHead>
        {forPreview ? (
          rezervare?.numeClient || props.numeClient
        ) : (
          <Link
            to={`/clienti/${rezervare?.idClient}`}
            className="underline underline-offset-2"
          >
            {rezervare?.numeClient || props.numeClient}
          </Link>
        )}
      </TableHead>
      <TableData>{rezervare?.idLoc}</TableData>
      <TableData>{dateFormatter(rezervare?.dataCheckIn)}</TableData>
      <TableData>{dateFormatter(rezervare?.dataCheckOut)}</TableData>
      <TableData>{rezervare?.facilitati["Adult"] || "0"}</TableData>
      <TableData>{rezervare?.facilitati["Copii 3-12 ani"] || "0"}</TableData>
      <TableData>{rezervare?.hasElectricity ? "Da" : "Nu"}</TableData>
      <TableData>
        {rezervare?.tipAuto.map((tip, idx) => (
          <div key={idx}>{tip}</div>
        ))}
      </TableData>
      <TableData>{rezervare?.suma + " lei"}</TableData>
      <TableData>{rezervare?.sumaPerDay + " lei"}</TableData>

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
