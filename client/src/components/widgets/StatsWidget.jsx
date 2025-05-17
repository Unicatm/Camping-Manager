import React, { useEffect, useState } from "react";
import {
  StatsWidgetContext,
  useStatsWidgetContext,
} from "./useStatsWidgetContext";

function StatsWidget({ data, icon: Icon, children, ...props }) {
  return (
    <StatsWidgetContext.Provider value={{ data }}>
      <div
        className={`${props.width || "w-full"} ${
          props.display
        } flex flex-row items-center ${
          props.grid
        } justify-between min-w-50 h-full xl:h-fit p-4 rounded-xl border-[1px] border-slate-300 bg-white text-black`}
      >
        <div>{children}</div>
        {!Icon ? null : (
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
        )}
      </div>
    </StatsWidgetContext.Provider>
  );
}

StatsWidget.Title = function StatsWidgetTitle({ title }) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-500">{title}</h2>
    </div>
  );
};

StatsWidget.DisplayData = function DisplayData({ unit }) {
  const { data } = useStatsWidgetContext();
  return (
    <div className="flex items-center justify-between pt-2">
      <p className="text-2xl font-bold text-slate-900">
        {data?.total != null ? Number(Number(data.total).toFixed(2)) : 0} {unit}
      </p>
    </div>
  );
};

StatsWidget.DisplayDataLabel = function DisplayDataLabel({ label }) {
  const { data } = useStatsWidgetContext();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 w-fit h-max pt-2">
        <p className="text-2xl font-bold text-slate-900">
          {" "}
          {data?.total != null ? Number(Number(data.total).toFixed(2)) : 0}
        </p>
        <p className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 ">
          {label}
        </p>
      </div>
    </div>
  );
};

StatsWidget.ChangeIndicator = function ChangeIndicator({ referenceText }) {
  const [isLower, setIsLower] = useState(false);
  const { data } = useStatsWidgetContext();

  useEffect(() => {
    if (data?.changePercentage < 0) {
      setIsLower(true);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center gap-4 w-fit h-max py-2">
        <p className="text-3xl font-medium">
          {data?.total != null ? Number(Number(data.total).toFixed(2)) : 0}
        </p>
        <p
          className={`text-xs py-0.5 px-1.5 rounded-full border-[1px] ${
            isLower
              ? "bg-red-100 text-red-600 border-red-300"
              : "bg-green-100 text-green-600 border-green-300"
          }`}
        >
          {data?.changePercentage + "%"}
        </p>
      </div>
      <p className="text-xs text-blue-950/80">
        <span className={` ${isLower ? "text-red-600" : "text-green-600"}`}>
          {data?.changeValue}{" "}
        </span>
        {referenceText}
      </p>
    </div>
  );
};

export { StatsWidget };
