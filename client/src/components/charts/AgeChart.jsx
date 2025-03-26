import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
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
import Select from "../forms/Select";
import ChartSelectButton from "./ChartSelectButton";

const data = [
  { perioada: "Ian", "18-25": 30, "26-35": 45, "36-45": 20, "46+": 10 },
  { perioada: "Feb", "18-25": 25, "26-35": 50, "36-45": 30, "46+": 15 },
  { perioada: "Mar", "18-25": 40, "26-35": 35, "36-45": 25, "46+": 20 },
  { perioada: "Apr", "18-25": 35, "26-35": 40, "36-45": 30, "46+": 15 },
  { perioada: "Mai", "18-25": 20, "26-35": 30, "36-45": 40, "46+": 25 },
  { perioada: "Iun", "18-25": 50, "26-35": 45, "36-45": 35, "46+": 20 },
];

const years = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-blue-950">
          {payload[0].payload.perioada}
        </p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm flex items-center gap-2"
            style={{ color: entry.color }}
          >
            <span
              className="w-3 h-3 rounded-xs inline-block"
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

const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap gap-4 mt-2 justify-center">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span
            className="w-4 h-4 rounded-xs inline-block"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-blue-950 text-xs">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function AgeChart({ data }) {
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
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
      <ResponsiveContainer className="bg-white" width={500} height={350}>
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
          <XAxis dataKey="perioada" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="18-25" stackId="a" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave
                    ? "#8884d8"
                    : "rgba(43, 92, 231, 0.2)"
                }
              />
            ))}
          </Bar>
          <Bar dataKey="26-35" stackId="a" fill="#82ca9d">
            {data.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave
                    ? "#82ca9d"
                    : "rgba(43, 92, 231, 0.2)"
                }
              />
            ))}
          </Bar>
          <Bar dataKey="36-45" stackId="a" fill="#ffc658" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave
                    ? "#ffc658"
                    : "rgba(43, 92, 231, 0.2)"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
