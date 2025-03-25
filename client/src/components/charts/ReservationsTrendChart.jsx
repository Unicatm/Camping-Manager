import React from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Ian",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Aprl",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Mai",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Iun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Iul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 3245,
    pv: 1232,
    amt: 2100,
  },
  {
    name: "Sept",
    uv: 2343,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function ReservationsTrendChart() {
  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
      <div className="flex flex-row items-start justify-between">
        <div className="mx-2 mb-6 w-full flex justify-between items-center gap-2 text-xs text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg">
            Trendul rezervărilor
          </h2>
          <button className="h-fit w-fit flex items-center gap-1 bg-gray-100 text-blue-950 text-sm px-2 py-1 rounded-md cursor-pointer hover:bg-gray-200">
            Ani
            <ChevronDownIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ResponsiveContainer className="bg-white" width={500} height={220}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
