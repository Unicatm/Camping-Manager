import React from "react";
import DropdownDeleteMenu from "../../../../components/tables/DropdownDeleteMenu";
import { TableData, TableRow } from "../../../../components/tables/Table";
import priceListIcons from "./priceListIcons";

export default function PriceListTableData({
  data,
  forPreview,
  onEdit,
  onDelete,
}) {
  return data.map((pret, index) => {
    const { icon: Icon, color } = priceListIcons[index % priceListIcons.length];

    return (
      <TableRow>
        <TableData>
          <div className="flex items-center gap-2">
            <span
              className={`p-2 rounded ${color ?? "bg-gray-200 text-gray-500"}`}
            >
              <Icon className="w-5 h-5" />
            </span>
            <p className="font-medium">{pret?.denumire}</p>
          </div>
        </TableData>
        <TableData>{pret?.pret} lei/ noapte</TableData>
        {!forPreview && (
          <DropdownDeleteMenu
            rezervareId={pret._id}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </TableRow>
    );
  });
}
