import TableHead from "./TableHead";
import rezervariTableHeads from "./rezervariTabelHeads";
import dateFormatter from "../../utils/dateFormat";

function Table({ rezervari, isLoading }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHead heads={rezervariTableHeads} />
        <tbody>
          {isLoading && rezervari.length === 0 ? (
            <tr>
              <td
                colSpan={rezervariTableHeads.length}
                className="px-6 py-4 text-center"
              >
                {"Datele se încarcă..."}
              </td>
            </tr>
          ) : (
            rezervari.map((rezervare, index) => (
              <tr
                key={rezervare.id || index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {rezervare.idClient}
                </th>
                <td className="px-6 py-4">{rezervare.idLoc}</td>
                <td className="px-6 py-4">
                  {dateFormatter(rezervare.dataCheckIn)}
                </td>
                <td className="px-6 py-4">
                  {dateFormatter(rezervare.dataCheckOut)}
                </td>
                <td className="px-6 py-4">
                  {rezervare.facilitati["Adulti"] || "0"}
                </td>
                <td className="px-6 py-4">
                  {rezervare.facilitati["Copii"] || "0"}
                </td>
                <td className="px-6 py-4">
                  {rezervare.hasElectricity ? "Da" : "Nu"}
                </td>
                <td className="px-6 py-4">
                  {rezervare.tipAuto.map((tip, idx) => (
                    <div key={idx}>{tip}</div>
                  ))}
                </td>

                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
