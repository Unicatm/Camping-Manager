import { useQuery } from "@tanstack/react-query";
import { getTotalNumberLocuriCampare } from "../../../api/locuriApi";

export default function useTotalSpaces() {
  return useQuery({
    queryKey: ["total_spaces"],
    queryFn: getTotalNumberLocuriCampare,
  });
}
