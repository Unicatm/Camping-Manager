import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRezervare } from "../../../api/reservationsApi";

export default function useDeleteReservation() {
  const queryClient = useQueryClient();

  const deleteMutationRezervare = useMutation({
    mutationFn: deleteRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      queryClient.invalidateQueries({ queryKey: ["totalReservations"] });
      queryClient.invalidateQueries({ queryKey: ["averageDaysSpent"] });
      queryClient.invalidateQueries({ queryKey: ["totalActiveReservations"] });
      queryClient.invalidateQueries({ queryKey: ["currentYearRevenue"] });
      queryClient.invalidateQueries({ queryKey: ["checkoutCard"] });
      queryClient.invalidateQueries({ queryKey: ["locuriZi"] });
    },
  });

  const handleDeleteRezervare = (id) => {
    deleteMutationRezervare.mutate(id);
  };

  return handleDeleteRezervare;
}
