import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import ChartMultiSelectButton from "./ChartMultiSelectButton";
import { getIncomingRevenueOnSelectedYears } from "../../api/reservationsApi";

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
              className="w-3 h-3 rounded-xs inline-block"
              style={{ backgroundColor: entry.color }}
            ></span>
            {entry.name}: {entry.value} lei
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

const colors = ["#8884d8", "#82ca9d", "#ffc658"];

export default function IncomingRevenueChart({ years = [] }) {
  const [focusBar, setFocusBar] = useState(null);
  const [mouseLeave, setMouseLeave] = useState(true);
  const [checkedYears, setCheckedYears] = useState([]);

  useEffect(() => {
    if (years.length > 0) {
      setCheckedYears([years[0]]);
    }
  }, [years]);

  const { data } = useQuery({
    queryKey: ["revenue", checkedYears],
    queryFn: () => getIncomingRevenueOnSelectedYears(checkedYears),
  });

  return (
    <div className="bg-white w-fit h-fit p-4 shadow-md shadow-blue-950/10 rounded-md border-[1px] border-blue-950/20">
      <div className="flex flex-row justify-between">
        <div className="mx-2 mb-4 divide-blue-950/20 divide-x-[1px] flex flex-row items-center text-xs text-blue-950">
          <h2 className="font-bold text-blue-950 text-lg pr-2">Venitul</h2>
          <p className="pl-2">
            {checkedYears.length === 1
              ? `Anul ${checkedYears[0]}`
              : `Anii ${checkedYears.join(", ")}`}
          </p>
        </div>

        <div className="flex gap-2 text-sm">
          <button className="h-fit flex items-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer hover:bg-blue-700">
            Lună
            <ChevronDownIcon className="w-4 h-4" />
          </button>

          <ChartMultiSelectButton
            data={years}
            btnTitle={"Anual"}
            minSelection={1}
            maxSelection={4}
            checkedData={checkedYears}
            setCheckedData={setCheckedYears}
          />
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
          <XAxis dataKey="month" />
          <YAxis />
          <Legend content={<CustomLegend />} />
          <Tooltip content={<CustomTooltip />} />
          {checkedYears.map((year, index) => (
            <Bar
              key={year}
              dataKey={year.toString()}
              fill={colors[index % colors.length]}
              radius={[5, 5, 0, 0]}
              stackId="a"
            >
              {data?.map((entry, cellIndex) => (
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
      </ResponsiveContainer>
    </div>
  );
}
