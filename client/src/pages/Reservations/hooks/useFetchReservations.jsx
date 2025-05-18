import { useQuery } from "@tanstack/react-query";
import { getAllRezervari } from "../../../api/reservationsApi";

export default function useFetchReservations() {
  return useQuery({
    queryKey: ["rezervari", "list"],
    queryFn: getAllRezervari,
  });
}
