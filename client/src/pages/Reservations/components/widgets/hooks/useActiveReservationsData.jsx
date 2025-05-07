import { useQuery } from "@tanstack/react-query";
import { getTotalNumberOfActiveReservations } from "../../../../../api/reservationsApi";

export default function useActiveReservationsData() {
  return useQuery({
    queryKey: ["totalActiveReservations"],
    queryFn: getTotalNumberOfActiveReservations,
  });
}
