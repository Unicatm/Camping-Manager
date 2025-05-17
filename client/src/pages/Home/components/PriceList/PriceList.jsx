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
    <div className="p-6 bg-white rounded-xl border border-gray-200 flex flex-col lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-7">
      <div className="flex flex-col lg:flex-row lg:justify-between items-start pb-4 lg:pb-0">
        <div>
          <h1 className="text-2xl font-bold mb-1">Lista de prețuri</h1>
          <p className="text-gray-500 text-sm mb-6">
            Prețurile curente ale facilităților
          </p>
        </div>
        <ExportButton handleOpenPdf={""} />
      </div>

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
  );
}
