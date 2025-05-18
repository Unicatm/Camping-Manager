import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editRezervare } from "../../../api/reservationsApi";

export default function useUpdateReservation(rezervareId, onCloseCallback) {
  const queryClient = useQueryClient();

  const updateRezervareMutation = useMutation({
    mutationFn: (data) => editRezervare(rezervareId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      queryClient.invalidateQueries({ queryKey: ["totalReservations"] });
      queryClient.invalidateQueries({ queryKey: ["averageDaysSpent"] });
      queryClient.invalidateQueries({ queryKey: ["totalActiveReservations"] });
      queryClient.invalidateQueries({ queryKey: ["currentYearRevenue"] });
      queryClient.invalidateQueries({ queryKey: ["checkoutCard"] });
      onCloseCallback();
    },
  });

  return updateRezervareMutation;
}
