import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editClient } from "../../../api/clientApi";

export default function useUpdateClient(clientId, onCloseCallback) {
  const queryClient = useQueryClient();

  const updateClientMutation = useMutation({
    mutationFn: (data) => editClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
      onCloseCallback();
    },
  });

  return updateClientMutation;
}
