import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createClient } from "../../../api/clientApi";

export default function useCreateClient(onCloseCallback) {
  const queryClient = useQueryClient();

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
      queryClient.invalidateQueries({ queryKey: ["clientGrowthData"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyNewClientsStats"] });
      onCloseCallback();
    },
  });

  return createClientMutation;
}
