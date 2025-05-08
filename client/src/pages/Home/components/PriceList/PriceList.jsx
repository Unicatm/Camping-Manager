import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFacilitati } from "../../../../api/facilitatiApi";
import priceListTabelHeads from "./priceListTableHeads";
import Table from "../../../../components/tables/Table";
import PriceListTableData from "./PriceListTableData";
import ExportButton from "../../../../components/ui/buttons/ExportButton";

export default function PriceList() {
  const {
    data: preturi,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["facilitati", "list"],
    queryFn: getFacilitati,
  });

  return (
    <div className="col-start-1 col-end-3 row-start-3 row-end-7 p-6 bg-white rounded-xl border border-gray-200 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-1">Pricing List</h1>
          <p className="text-gray-500 text-sm mb-6">
            Current rates for different spot types
          </p>
        </div>
        <ExportButton handleOpenPdf={""} />
      </div>

      <div className="overflow-y-auto">
        <Table
          data={preturi}
          columns={priceListTabelHeads}
          forPreview={false}
          isFetching={isFetching}
          isError={isError}
        >
          <PriceListTableData data={preturi} forPreview={false} />
        </Table>
      </div>
    </div>
  );
}
