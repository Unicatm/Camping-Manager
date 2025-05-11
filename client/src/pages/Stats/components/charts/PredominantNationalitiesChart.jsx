import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  Label,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import ChartSelectButton from "../inputs/ChartSelectButton";
import { getTopPredominantNationalitiesByYear } from "../../../../api/reservationsApi/index";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload, data }) => {
  if (active && payload && payload.length) {
    const total = data?.reduce((sum, item) => sum + item.count, 0);
    const procent = (payload[0].payload.count / total) * 100;

    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-blue-950">
          {payload[0].payload.nationalitate}
        </p>
        <p className="text-sm text-blue-950/80">
          Număr: {payload[0].payload.count}
        </p>
        <p className="text-sm text-blue-950/80">Procente: {procent}%</p>
      </div>
    );
  }
  return null;
};

export default function PredominantNationalitiesChart({ years }) {
  const [selectedYear, setSelectedYear] = useState();

  useEffect(() => {
    if (years.length > 0) {
      setSelectedYear(years[0]);
    }
  }, [years]);

  const { data } = useQuery({
    queryKey: ["nationalitati", selectedYear],
    queryFn: () => getTopPredominantNationalitiesByYear(selectedYear),
  });

  return (
    <div className="col-start-3 col-end-5 bg-white w-full p-4 shadow-md shadow-blue-950/10 rounded-xl border-[1px] border-blue-950/20">
      <div className="flex flex-row items-start justify-between">
        <div className="mx-2 mb-4 w-full flex flex-col gap-2 text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg">
            Naționalități predominante
          </h2>
          <div className="flex gap-2 justify-between">
            <p className="text-xs">Anul {selectedYear}</p>
            <ChartSelectButton
              data={years}
              btnTitle={"Anul"}
              selectedData={selectedYear}
              setSelectedData={setSelectedYear}
            />
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer className="bg-white" width="100%" height="100%">
          {data?.nationalitati && data.nationalitati.length > 0 ? (
            <PieChart>
              <Pie
                data={data.nationalitati}
                cx={"50%"}
                cy={"55%"}
                innerRadius={50}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={3}
                label={(entry) => entry._id}
                animationEasing="ease-in"
                dataKey="count"
              >
                <LabelList
                  dataKey="count"
                  position="inside"
                  fontSize={12}
                  fontWeight={50}
                />
                <Label
                  width={30}
                  position="center"
                  value={selectedYear}
                  stroke="none"
                />
                {data.nationalitati.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip data={data.nationalitati} />} />
            </PieChart>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-blue-950/70 text-sm">
                Nu există date disponibile
              </p>
            </div>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
