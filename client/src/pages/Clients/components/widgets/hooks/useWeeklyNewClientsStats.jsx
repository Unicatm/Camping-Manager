import { useQuery } from "@tanstack/react-query";
import { getWeeklyNewClientsStats } from "../../../../../api/clientApi";

export default function useWeeklyNewClientsStats() {
  return useQuery({
    queryKey: ["weeklyNewClientsStats"],
    queryFn: getWeeklyNewClientsStats,
  });
}
