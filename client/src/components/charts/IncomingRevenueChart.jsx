import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Saptamanal - L-D
// Lunar - Ian - Dec
// Anual range de cativa ani

const data = [
  {
    name: "Ianuarie",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    pv: 4300,
    amt: 2100,
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded shadow-md">
        <p className="font-semibold text-blue-950">{payload[0].payload.name}</p>
        <p className="text-sm text-blue-950/80">
          Valoare: {payload[0].value} lei
        </p>
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

export default function IncomingRevenueChart() {
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);

  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
      <div className="flex flex-row justify-between">
        <div className="mx-2 mb-4 divide-blue-950/20 divide-x-[1px] flex flex-row items-center text-xs text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg pr-2">Venitul</h2>
          {/* <p className="pl-2">Săpt. 3 - Ian 2023</p> */}
          {/* <p className="pl-2">Iulie 2024</p> */}
          <p className="pl-2">Anul 2023</p>
        </div>

        <div className="flex gap-2 text-sm">
          <button className="h-fit flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
            Saptămânal
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="h-fit flex items-center gap-1 bg-gray-100 text-blue-950 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200">
            Lunar
            <ChevronDownIcon className="w-4 h-4" />
          </button>
          <button className="h-fit flex items-center gap-1 bg-gray-100 text-blue-950 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200">
            Anual
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ResponsiveContainer className="bg-white" width={500} height={350}>
        <BarChart
          width={"100%"}
          height={"100%"}
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: 10,
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend content={<CustomLegend />} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="pv"
            fill="oklch(0.546 0.245 262.881)"
            radius={[5, 5, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                fill={
                  focusBar === index || mouseLeave
                    ? "oklch(0.546 0.245 262.881)"
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
