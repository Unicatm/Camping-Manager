import React, { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "@heroicons/react/16/solid";

const TableElement = ({ children }) => (
  <div className="relative h-full overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg bg-white">
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
              th.sorting ? "cursor-pointer" : ""
            } px-6 py-3 not-first:text-right select-none`}
          >
            <div
              onClick={() => {
                handleSortClick(index);
              }}
              className="flex gap-2"
            >
              {th.title}
              {th.sorting ? (
                <ArrowDownIcon
                  className={`
                  ${
                    sortedColumns[th.id] === "none"
                      ? "text-blue-400"
                      : "text-white"
                  }
                  ${sortedColumns[th.id] === "asc" ? "rotate-180" : ""}
                  w-4 h-4
                `}
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

const TableBody = ({ data, columns, children, forPreview, isFetching }) => {
  console.log("Fetching: " + isFetching);
  return (
    <tbody>
      {isFetching ? (
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
};

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
  isFetching,
  children,
  onSortChange,
}) => {
  const initialSortedState = useMemo(() => {
    return columns.reduce((acc, col) => {
      if (col.id !== undefined) {
        acc[col.id] = "none";
      }
      return acc;
    }, {});
  }, [columns]);

  const [sortedColumns, setSortedColumns] = useState(initialSortedState);

  const handleSortClick = (index) => {
    if (!columns[index].sorting) return;

    setSortedColumns((prev) => {
      const currentState = prev[columns[index].id];

      const nextState =
        currentState === "none"
          ? "asc"
          : currentState === "asc"
          ? "desc"
          : "none";

      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = "none";
        return acc;
      }, {});

      newState[columns[index].id] = nextState;

      return newState;
    });
  };

  useEffect(() => {
    if (onSortChange) {
      onSortChange(sortedColumns);
    }
  }, [sortedColumns]);

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
          isError={isError}
          forPreview={forPreview}
          isFetching={isFetching}
        >
          {children}
        </TableBody>
      </TableElement>
    </>
  );
};

export default Table;
