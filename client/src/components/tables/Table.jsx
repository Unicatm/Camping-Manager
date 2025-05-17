import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/16/solid";
import { LuArrowUpDown } from "react-icons/lu";

const TableElement = ({ children }) => (
  <div className="h-96 lg:h-fill relative flex-grow rounded-xl overflow-x-auto overflow-y-auto bg-white border border-slate-300">
    <table className="w-full text-sm text-left rounded-xl text-slate-600">
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
    <thead className="sticky top-0 z-30 text-sm font-medium text-slate-500 bg-slate-50 border-b border-slate-300">
      <tr>
        {columns.map((th, index) => (
          <th
            key={index}
            scope="col"
            className={`${
              th.sorting ? "cursor-pointer" : ""
            } px-4 py-3 font-medium select-none`}
          >
            <div
              onClick={() => {
                handleSortClick(index);
              }}
              className="flex items-center gap-2"
            >
              {th.title}
              {th.sorting ? (
                sortedColumns[th.id] === "none" ? (
                  <LuArrowUpDown className="w-4 h-4 text-slate-400" />
                ) : sortedColumns[th.id] === "asc" ? (
                  <ArrowUpIcon className="w-4 h-4 text-blue-600" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4 text-blue-600" />
                )
              ) : (
                ""
              )}
            </div>
          </th>
        ))}
        {forPreview ? null : <th scope="col" className="px-4 py-3"></th>}
      </tr>
    </thead>
  );
};

const TableBody = ({ data, columns, children, forPreview, isFetching }) => {
  return (
    <tbody className="relative z-10">
      {isFetching ? (
        <tr className="h-full">
          <td
            colSpan={columns.length + (forPreview ? 0 : 1)}
            className="bg-white px-4 py-3 text-center text-slate-500"
          >
            Datele se încarcă...
          </td>
        </tr>
      ) : data.length === 0 ? (
        <tr className="h-max">
          <td
            colSpan={columns.length + (forPreview ? 0 : 1)}
            className="bg-white text-center px-4 py-3 text-slate-500"
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

const TableRow = ({ children, isHighlighted }) => (
  <tr
    className={`z-30 border-b border-slate-200 hover:bg-slate-50 transition duration-300 ${
      isHighlighted ? "bg-yellow-50" : "bg-white"
    }`}
  >
    {children}
  </tr>
);

const TableData = ({ className, children }) => (
  <td className={`${className} px-4 py-3`}>{children}</td>
);

const TableHead = ({ children }) => (
  <th
    scope="row"
    className="px-4 py-3 z-50 font-medium text-slate-900 whitespace-nowrap"
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
  );
};

export default Table;
