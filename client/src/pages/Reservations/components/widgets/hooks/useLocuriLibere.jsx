import { useQuery } from "@tanstack/react-query";
import { getNumarLocuriDisponibile } from "../../../../../api/locuriApi";

export default function useLocuriLibere() {
  return useQuery({
    queryKey: ["locuri-libere-zi"],
    queryFn: getNumarLocuriDisponibile,
  });
}
