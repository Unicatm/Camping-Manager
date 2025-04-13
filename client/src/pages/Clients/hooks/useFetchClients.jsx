import { useQuery } from "@tanstack/react-query";
import { getClienti } from "../../../api/clientApi";

export default function useFetchClients() {
  return useQuery({
    queryKey: ["clienti", "list"],
    queryFn: getClienti,
  });
}
