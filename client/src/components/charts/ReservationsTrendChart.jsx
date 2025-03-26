import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ChartMultiSelectButton from "./ChartMultiSelectButton";
import { getMonthlyReservationsOnSelectedYears } from "../../api/reservationsApi";

const gradientIds = ["colorUv", "colorPv", "colorXy", "colorAb", "colorCd"];
const colorIds = ["#8884d8", "#82ca9d", "#FF5733", "#FFC300", "#900C3F"];

export default function ReservationsTrendChart({ years = [] }) {
  const [checkedYears, setCheckedYears] = useState([]);

  useEffect(() => {
    if (years.length > 0) {
      setCheckedYears([years[0]]);
    }
  }, [years]);

  const { data } = useQuery({
    queryKey: ["monthly-reservations", checkedYears],
    queryFn: () => getMonthlyReservationsOnSelectedYears(checkedYears),
  });

  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
      <div className="flex flex-row items-start justify-between">
        <div className="mx-2 mb-6 w-full flex justify-between items-center gap-2 text-xs text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg">
            Trendul rezervărilor
          </h2>
          <ChartMultiSelectButton
            data={years}
            btnTitle={"Ani"}
            checkedData={checkedYears}
            setCheckedData={setCheckedYears}
            minSelection={1}
            maxSelection={5}
          />
        </div>
      </div>
      <ResponsiveContainer className="bg-white" width={500} height={220}>
        <AreaChart
          width={"100%"}
          height={"100%"}
          data={data || []}
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
            <linearGradient id="colorXy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5733" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF5733" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorAb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC300" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FFC300" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCd" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#900C3F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#900C3F" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {checkedYears.map((year, index) => (
            <Area
              key={year}
              type="monotone"
              dataKey={year.toString()}
              stroke={`${colorIds[index % colorIds.length]}`}
              fillOpacity={1}
              fill={`url(#${gradientIds[index % gradientIds.length]})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
