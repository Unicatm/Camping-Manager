import React, { useMemo, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/16/solid";

const TableElement = ({ children }) => (
  <div className="relative h-full overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      {children}
    </table>
  </div>
);

const TableColumns = ({
  columns,
  forPreview,
  handleSortClick,
  sortedColumns,
}) => {
  return (
    <thead className="sticky top-0 text-xs text-white uppercase bg-blue-600">
      <tr>
        {columns.map((th, index) => (
          <th
            key={index}
            scope="col"
            className={`${
              th.alphabetical ? "cursor-pointer" : ""
            } px-6 py-3 not-first:text-right select-none`}
          >
            <div
              onClick={() => {
                handleSortClick(index);
              }}
              className="flex gap-2"
            >
              {th.title}
              {th.alphabetical ? (
                <ArrowDownIcon
                  className={`${
                    sortedColumns[th.id] ? "rotate-180" : ""
                  } w-4 h-4`}
                />
              ) : (
                ""
              )}
            </div>
          </th>
        ))}
        {forPreview ? null : <th scope="col" className="px-6 py-3"></th>}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, columns, isLoading, children, forPreview }) => (
  <tbody>
    {isLoading && data == undefined ? (
      <tr>
        <td
          colSpan={columns.length + (forPreview ? 0 : 1)}
          className="bg-white px-6 py-4 text-center"
        >
          {"Datele se încarcă..."}
        </td>
      </tr>
    ) : data.length === 0 ? (
      <tr>
        <td
          colSpan={columns.length + (forPreview ? 0 : 1)}
          className="bg-white px-6 py-4 text-center"
        >
          Nu sunt date de afișat...
        </td>
      </tr>
    ) : (
      children
    )}
  </tbody>
);

const TableRow = ({ children }) => (
  <tr className="bg-white border-b border-gray-200 hover:bg-gray-50">
    {children}
  </tr>
);

const TableData = ({ children }) => (
  <td className="px-6 py-4 not-first:text-right">{children}</td>
);

const TableHead = ({ children }) => (
  <th
    scope="row"
    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
  >
    {children}
  </th>
);

export {
  TableElement,
  TableColumns,
  TableHead,
  TableBody,
  TableData,
  TableRow,
};

export const Table = ({
  data,
  columns,
  forPreview,
  isError,
  isLoading,
  children,
}) => {
  const initialSortedState = useMemo(() => {
    return columns.reduce((acc, col) => {
      if (col.id !== undefined) {
        acc[col.id] = false;
      }
      return acc;
    }, {});
  }, [columns]);

  const [sortedColumns, setSortedColumns] = useState(initialSortedState);

  const handleSortClick = (index) => {
    if (!columns[index].alphabetical) return;
    setSortedColumns((prev) => ({
      ...prev,
      [columns[index].id]: !prev[columns[index].id],
    }));
  };

  return (
    <>
      <TableElement>
        <TableColumns
          columns={columns}
          forPreview={forPreview}
          handleSortClick={handleSortClick}
          sortedColumns={sortedColumns}
        />
        <TableBody
          data={data}
          columns={columns}
          isLoading={isLoading}
          isError={isError}
          forPreview={forPreview}
        >
          {children}
        </TableBody>
      </TableElement>
    </>
  );
};

export default Table;
