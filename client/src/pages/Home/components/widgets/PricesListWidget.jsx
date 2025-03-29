import { useQuery } from "@tanstack/react-query";
import { getFacilitati } from "../../../../api/facilitatiApi";

export default function PricesListWidget() {
  const { data: facilitati } = useQuery({
    queryKey: ["facilitati", "list"],
    queryFn: getFacilitati,
  });

  return (
    <div className="flex flex-col gap-4 w-64 h-74 px-4 py-6 rounded-md shadow-sm bg-white text-blue-950">
      <h2 className="font-bold text-xl text-center">Listă de prețuri</h2>
      <div className="flex flex-col gap-2 select-none overflow-y-scroll">
        {facilitati?.toReversed().map((facilitate, idx) => (
          <div
            key={idx}
            className="flex justify-between p-2 rounded-md hover:bg-blue-50"
          >
            <p className="font-medium">{facilitate.denumire}</p>
            <p>{facilitate.pret}lei</p>
          </div>
        ))}
      </div>
    </div>
  );
}
