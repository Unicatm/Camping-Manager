import { useQuery } from "@tanstack/react-query";
import { getAvarageDaysSpent } from "../../../../../api/reservationsApi";

export default function useAverageDays() {
  return useQuery({
    queryKey: ["averageDaysSpent"],
    queryFn: getAvarageDaysSpent,
  });
}
