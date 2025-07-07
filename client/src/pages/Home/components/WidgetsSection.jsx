import React from "react";
import { RiLoopLeftFill } from "react-icons/ri";
import { BanknotesIcon } from "@heroicons/react/20/solid";
import useActiveReservationsData from "../../Reservations/components/widgets/hooks/useActiveReservationsData";
import SimpleLabelWidget from "../../../components/widgets/SimpleLabelWidget";
import SimpleWidget from "../../../components/widgets/SimpleWidget";
import useCurrentYearRevenue from "../../Stats/hooks/useCurrentYearRevenue";

export default function WidgetsSection() {
  const { data: totalActiveReservations } = useActiveReservationsData();
  const { data: currentYearRevenue } = useCurrentYearRevenue();

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
      <SimpleWidget
        title={"Locuri libere"}
        data={totalActiveReservations}
        icon={RiLoopLeftFill}
        grid={
          "lg:col-start-3 lg:col-end-5 lg:row-start-2 lg:row-end-3"
        }
      />
    </>
  );
}
