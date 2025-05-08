import React from "react";
import ActionCard from "./ActionCard";
import { LuCalendarPlus } from "react-icons/lu";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiLoopLeftFill } from "react-icons/ri";
import useActiveReservationsData from "../../Reservations/components/widgets/hooks/useActiveReservationsData";
import SimpleLabelWidget from "../../../components/widgets/SimpleLabelWidget";
import SimpleWidget from "../../../components/widgets/SimpleWidget";

export default function ActionSection() {
  const { data: totalActiveReservations } = useActiveReservationsData();
  return (
    <>
      <ActionCard
        title={"Adaugă rezervare"}
        subtitle={"Adaugă o rezervare"}
        icon={LuCalendarPlus}
        color={"blue"}
        grid={"self-stretch col-start-1 col-end-2 row-start-1 row-end-2"}
      />
      <ActionCard
        title={"Adaugă client"}
        subtitle={"Înregistrează client nou"}
        icon={BsFillPersonPlusFill}
        color={"emerald"}
        grid={"self-stretch col-start-2 col-end-3 row-start-1 row-end-2"}
      />
      <ActionCard
        title={"Vizualizează harta"}
        subtitle={"Vezi harta campingului"}
        icon={LuCalendarPlus}
        color={"red"}
        grid={"self-stretch col-start-1 col-end-2 row-start-1 row-end-2"}
      />
      <ActionCard
        title={"Vizualizeaza statistici"}
        subtitle={"Vezi statistici"}
        icon={BsFillPersonPlusFill}
        color={"emerald"}
        grid={"self-stretch col-start-2 col-end-3 row-start-1 row-end-2"}
      />
    </>
  );
}
