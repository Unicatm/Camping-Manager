import { createContext, useContext } from "react";

export const StatsWidgetContext = createContext(null);

export function useStatsWidgetContext() {
  const context = useContext(StatsWidgetContext);

  if (!context) {
    throw new Error("useStatsWidgetContext must be used within a StatsWidget!");
  }

  return context;
}
