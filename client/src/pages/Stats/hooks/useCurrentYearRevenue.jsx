import { useQuery } from "@tanstack/react-query";
import { getCurrentYearRevenue } from "../../../api/reservationsApi";

export default function useCurrentYearRevenue() {
  return useQuery({
    queryKey: ["currentYearRevenue"],
    queryFn: getCurrentYearRevenue,
  });
}
