import { Link } from "react-router-dom";
import {
  TableData,
  TableRow,
  TableHead,
} from "../../../../components/tables/Table";
import { dateFormatter } from "../../../../utils/dateFormat";
import DropdownDeleteMenu from "../../../../components/tables/DropdownDeleteMenu";
import { useEffect, useState } from "react";

function ReservationsTableData({
  rezervari,
  highlightId,
  forPreview,
  onEdit,
  onDelete,
  ...props
}) {
  const [highlightedId, setHighlightedId] = useState(highlightId);

  useEffect(() => {
    if (highlightId) {
      setHighlightedId(highlightId);
      const timeout = setTimeout(() => setHighlightedId(null), 2000);
      return () => clearTimeout(timeout);
    }
  }, [highlightId]);

  return rezervari?.map((rezervare, index) => {
    const isHighlighted = rezervare._id === highlightedId;
    return (
      <TableRow isHighlighted={isHighlighted} key={index}>
        <TableHead>
          {forPreview ? (
            rezervare?.numeClient || props.numeClient
          ) : (
            <Link
              to={`/clienti/${rezervare?.idClient}`}
              className="hover:text-slate-700"
            >
              {rezervare?.numeClient || props.numeClient}
            </Link>
          )}
        </TableHead>
        <TableData>{rezervare?.idLoc}</TableData>
        <TableData>
          <div
            className={`w-fit px-2 py-0.5 text-xs rounded-full border-[1px] cursor-pointer transition-all duration-200 ease-in-out hover:transition-all hover:duration-200 hover:ease-in-out ${
              rezervare?.status == "În curs"
                ? "bg-green-100 border-green-200 text-green-700 hover:bg-green-200/70 hover:border-green-300 hover:text-green-800"
                : "bg-orange-100 border-orange-200 text-orange-700 hover:bg-orange-200/70 hover:border-orange-300 hover:text-orange-800"
            }`}
          >
            {rezervare?.status}
          </div>
        </TableData>
        <TableData>{dateFormatter(rezervare?.dataCheckIn)}</TableData>
        <TableData>{dateFormatter(rezervare?.dataCheckOut)}</TableData>
        <TableData>
          <div>{`${rezervare?.facilitati["Adult"] || "0"} Adulți`}</div>
          <div>{`${rezervare?.facilitati["Copii 3-12 ani"] || "0"} Copii`}</div>
        </TableData>
        <TableData>
          {"Electric: "}
          {rezervare?.hasElectricity ? "Da" : "Nu"}
          {Object.entries(rezervare?.tipAuto || {}).map(([key, value], idx) => (
            <div key={idx}>
              {key}: {value}
            </div>
          ))}
        </TableData>
        <TableData>{rezervare?.suma + " lei"}</TableData>
        <TableData>{rezervare?.sumaPerDay + " lei"}</TableData>

        {!forPreview ? (
          <DropdownDeleteMenu
            rezervareId={rezervare._id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : null}
      </TableRow>
    );
  });
}

export default ReservationsTableData;
