import { useQuery } from "@tanstack/react-query";
import { getExpensesByClientId } from "../../../api/reservationsApi";

export default function useTotalExpenses({ idClient }) {
  return useQuery({
    queryKey: ["expenses", idClient],
    queryFn: () => getExpensesByClientId(idClient),
  });
}
