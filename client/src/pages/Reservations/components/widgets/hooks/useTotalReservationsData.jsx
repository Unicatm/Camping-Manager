import { useQuery } from "@tanstack/react-query";
import { getTotalNumberOfReservations } from "../../../../../api/reservationsApi";

export default function useTotalReservationsData() {
  return useQuery({
    queryKey: ["totalReservations"],
    queryFn: getTotalNumberOfReservations,
  });
}
