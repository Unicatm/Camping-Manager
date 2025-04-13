import { useQuery } from "@tanstack/react-query";
import { getClientGrowthData } from "../../../../../api/clientApi";

export default function useClientGrowthData() {
  return useQuery({
    queryKey: ["clientGrowthData"],
    queryFn: getClientGrowthData,
  });
}
