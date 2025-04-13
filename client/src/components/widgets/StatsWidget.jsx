import React, { useEffect, useState } from "react";
import {
  StatsWidgetContext,
  useStatsWidgetContext,
} from "./useStatsWidgetContext";

function StatsWidget({ data, children }) {
  return (
    <StatsWidgetContext.Provider value={{ data }}>
      <div className="w-full min-w-50 h-max p-4 rounded-md shadow-sm bg-white text-blue-950">
        {children}
      </div>
    </StatsWidgetContext.Provider>
  );
}

StatsWidget.Title = function StatsWidgetTitle({ title, icon: Icon }) {
  return (
    <div className="flex items-center gap-2">
      {!Icon ? null : <Icon className="w-5 h-5 self-center" />}

      <h2 className="w-fit text-md font-medium text-blue-950">{title}</h2>
    </div>
  );
};

StatsWidget.DisplayData = function DisplayData() {
  const { data } = useStatsWidgetContext();
  return (
    <div className="flex items-center gap-4 w-fit h-max pt-2">
      <p className="text-4xl font-medium">{data?.total}</p>
    </div>
  );
};

StatsWidget.DisplayDataLabel = function DisplayDataLabel({ label }) {
  const { data } = useStatsWidgetContext();
  return (
    <div>
      <div className="flex items-center gap-4 w-fit h-max pt-2">
        <p className="text-4xl font-medium">{data?.total}</p>
        <p className="text-xs px-2 py-1 rounded-sm bg-green-100 text-green-600 ">
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
        <p className="text-4xl font-medium">{data?.total}</p>
        <p
          className={`text-xs py-0.5 px-1 rounded-sm ${
            isLower ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
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
