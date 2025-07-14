import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import ChartSelectButton from "../inputs/ChartSelectButton";
import { getAgeGroups } from "../../../../api/reservationsApi/index";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-blue-950">
          {payload[0].payload.month}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm flex items-center gap-2"
            style={{ color: entry.color }}
          >
            <span
              className="w-3 h-3 inline-block"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-2 justify-center">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className="w-4 h-4 inline-block"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-blue-950 text-xs">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C456"];

export default function AgeChart({ years }) {
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2025);

  const { data } = useQuery({
    queryKey: ["age-groups", selectedYear],
    queryFn: () => getAgeGroups(selectedYear),
  });

  const ageGroups =
    data && data.length > 0
      ? Object.keys(data[0]).filter((key) => key !== "month")
      : [];

  return (
    <div className="col-start-3 col-end-5 bg-white w-full p-4 shadow-md shadow-blue-950/10 rounded-xl border-[1px] border-blue-950/20">
      <div className="flex flex-row justify-between">
        <div className="mx-2 mb-2 divide-blue-950/20 divide-x-[1px] flex flex-row items-center text-xs text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg pr-2">
            Distribuția vârstelor
          </h2>
          <p className="pl-2">Anul {selectedYear}</p>
        </div>
        <ChartSelectButton
          data={years}
          btnTitle={"Anul"}
          selectedData={selectedYear}
          setSelectedData={setSelectedYear}
        />
      </div>
      <div className="h-[250px] w-full">
        <ResponsiveContainer className="bg-white" width="100%" height="100%">
          {data && data.length > 0 ? (
            <BarChart
              data={data}
              width={"100%"}
              height={"100%"}
              margin={{
                top: 30,
                right: 10,
                left: 0,
                bottom: 5,
              }}
              onMouseMove={(state) => {
                if (state.isTooltipActive) {
                  setFocusBar(state.activeTooltipIndex);
                  setMouseLeave(false);
                } else {
                  setFocusBar(null);
                  setMouseLeave(true);
                }
              }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
              {ageGroups.map((ageGroup, index) => (
                <Bar
                  key={ageGroup}
                  dataKey={ageGroup}
                  fill={colors[index % colors.length]}
                  radius={[5, 5, 0, 0]}
                  stackId="a"
                >
                  {data.map((entry, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      fill={
                        focusBar === cellIndex || mouseLeave
                          ? colors[index % colors.length]
                          : `${colors[index % colors.length]}80`
                      }
                    />
                  ))}
                </Bar>
              ))}
            </BarChart>
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
