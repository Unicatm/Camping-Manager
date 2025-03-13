import React from "react";

const TableElement = ({ children }) => (
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      {children}
    </table>
  </div>
);

const TableColumns = ({ columns, forPreview }) => (
  <thead className="text-xs text-white uppercase bg-blue-700/80">
    <tr>
      {columns.map((th, index) => (
        <th key={index} scope="col" className="px-6 py-3">
          {th.title}
        </th>
      ))}
      {forPreview ? null : <th scope="col" className="px-6 py-3"></th>}
    </tr>
  </thead>
);

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
        <td colSpan={columns.length} className="bg-white px-6 py-4 text-center">
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

const TableData = ({ children }) => <td className="px-6 py-4">{children}</td>;

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

export const Table = ({ data, columns, forPreview, isLoading, children }) => {
  return (
    <>
      <TableElement>
        <TableColumns columns={columns} forPreview={forPreview} />
        <TableBody
          data={data}
          columns={columns}
          isLoading={isLoading}
          forPreview={forPreview}
        >
          {children}
        </TableBody>
      </TableElement>
    </>
  );
};

export default Table;
