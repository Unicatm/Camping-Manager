import { useQuery } from "@tanstack/react-query";
import { getRezervareById } from "../../../api/reservationsApi";
import { getTipuriAuto } from "../../../api/facilitatiApi";
import { getLocuriDisponibile } from "../../../api/locuriApi";
import { getClientsNameAndCnp } from "../../../api/clientApi";

export default function useReservationsData(
  rezervareId,
  selectedDataIn,
  selectedDataOut,
  hasElectricity
) {
  const rezervareQuery = useQuery({
    queryKey: ["rezervare", rezervareId],
    queryFn: () => getRezervareById(rezervareId),
    enabled: !!rezervareId,
  });

  const facilitatiQuery = useQuery({
    queryKey: ["facilitati"],
    queryFn: getTipuriAuto,
  });

  const locuriQuery = useQuery({
    queryKey: [
      "locuriDisponibile",
      selectedDataIn,
      selectedDataOut,
      hasElectricity,
    ],
    queryFn: () =>
      getLocuriDisponibile({
        start: selectedDataIn,
        end: selectedDataOut,
        energie: hasElectricity,
      }),
    enabled: !!selectedDataIn && !!selectedDataOut,
  });

  const clientiQuery = useQuery({
    queryKey: ["clientiAutocomplete"],
    queryFn: getClientsNameAndCnp,
  });

  return {
    rezervare: rezervareQuery.data,
    facilitati: facilitatiQuery.data,
    locuriDisponibile: locuriQuery.data,
    clientiAutocomplete: clientiQuery.data,
    refetchLocuriDisponibile: locuriQuery.refetch,
  };
}
