import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../../api/clientApi";

export default function useGetClientById(clientId) {
  const { data: client } = useQuery({
    queryKey: ["clienti", clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  return { client };
}
