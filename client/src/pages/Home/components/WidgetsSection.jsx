import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import useActiveReservationsData from "../../Reservations/components/widgets/hooks/useActiveReservationsData";
import SimpleLabelWidget from "../../../components/widgets/SimpleLabelWidget";
import SimpleWidget from "../../../components/widgets/SimpleWidget";
import DoubleDataWidget from "../../../components/widgets/DoubleDataWidget";
import useCurrentYearRevenue from "../../Stats/hooks/useCurrentYearRevenue";
import useLocuriLibere from "../../Reservations/components/widgets/hooks/useLocuriLibere";

export default function WidgetsSection() {
  const { data: totalActiveReservations } = useActiveReservationsData();
  const { data: currentYearRevenue } = useCurrentYearRevenue();
  const { data: locuriLibere } = useLocuriLibere();

  return (
    <>
      <SimpleLabelWidget
        title={"Rezervari in curs"}
        data={totalActiveReservations}
        label={"În curs"}
        icon={RiLoopLeftFill}
        grid={"lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3"}
      />
      <SimpleWidget
        title={"Încasări an curent"}
        data={currentYearRevenue}
        icon={BanknotesIcon}
        unit={"lei"}
        display={"hidden lg:flex"}
      />
      <DoubleDataWidget
        title={"Locuri libere astăzi"}
        data={locuriLibere}
        firstDataKey={"cuEnergie"}
        secondDataKey={"faraEnergie"}
        firstUnit={"cu energie"}
        secontUnit={"făra energie"}
        icon={RiLoopLeftFill}
        grid={"lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3"}
      />
    </>
  );
}
