import React, { useState } from "react";
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
import ChartSelectButton from "./ChartSelectButton";

const data01 = [
  { value: 5, nationalitate: "România", procent: "30%" },
  { value: 4, nationalitate: "Germania", procent: "70%" },
  { value: 1, nationalitate: "Olanda", procent: "10%" },
  { value: 1, nationalitate: "Austria", procent: "5%" },
];

const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-blue-950">
          {payload[0].payload.nationalitate}
        </p>
        <p className="text-sm text-blue-950/80">
          Număr: {payload[0].payload.value}
        </p>
        <p className="text-sm text-blue-950/80">
          Procente: {payload[0].payload.procent}
        </p>
      </div>
    );
  }
  return null;
};

export default function PredominantNationalitiesChart() {
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
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
      <ResponsiveContainer className="bg-white" width={300} height={220}>
        <PieChart>
          <Pie
            data={data01}
            cx={"50%"}
            cy={"55%"}
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={3}
            label={(entry) => entry.nationalitate}
            animationEasing="ease-in"
          >
            <LabelList
              dataKey="procent"
              position="inside"
              fontSize={12}
              fontWeight={50}
            />
            <Label
              width={30}
              position="center"
              value={selectedYear}
              stroke="none"
            ></Label>
            {data01.map((entry, index) => (
              <Cell fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
