import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createRezervare } from "../../../api/reservationsApi";

export default function useCreateReservation(onCloseCallback) {
  const queryClient = useQueryClient();

  const createRezervareMutation = useMutation({
    mutationFn: createRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      queryClient.invalidateQueries({ queryKey: ["totalReservations"] });
      queryClient.invalidateQueries({ queryKey: ["averageDaysSpent"] });
      queryClient.invalidateQueries({ queryKey: ["totalActiveReservations"] });
      queryClient.invalidateQueries({ queryKey: ["currentYearRevenue"] });
      queryClient.invalidateQueries({ queryKey: ["checkoutCard"] });
      queryClient.invalidateQueries({ queryKey: ["locuriZi"] });
      onCloseCallback();
    },
  });

  return createRezervareMutation;
}
