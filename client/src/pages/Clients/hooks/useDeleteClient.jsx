import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient } from "../../../api/clientApi";

export default function useDeleteClient() {
  const queryClient = useQueryClient();

  const deleteMutationClient = useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
      queryClient.invalidateQueries({ queryKey: ["clientGrowthData"] });
      queryClient.invalidateQueries({ queryKey: ["weeklyNewClientsStats"] });
    },
  });

  const handleDeleteClient = (id) => {
    deleteMutationClient.mutate(id);
  };

  return handleDeleteClient;
}
