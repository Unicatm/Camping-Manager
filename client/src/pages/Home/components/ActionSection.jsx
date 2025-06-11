import React from "react";
import ActionCard from "./ActionCard";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { ChartBarIcon, MapIcon } from "@heroicons/react/20/solid";
import { BsCalendarPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function ActionSection({ onAddRezervare, onAddClient }) {
  const navigateStats = useNavigate();

  const handleStatsClick = () => {
    navigateStats(`/stats`);
  };

  const handleMapClick = () => {
    navigateStats(`/map`);
  };

  return (
    <>
      <ActionCard
        title={"Adaugă rezervare"}
        subtitle={"Adaugă o rezervare"}
        icon={BsCalendarPlus}
        color={"blue"}
        grid={
          "self-stretch lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2"
        }
        handleClick={onAddRezervare}
      />
      <ActionCard
        title={"Adaugă client"}
        subtitle={"Înregistrează client nou"}
        icon={BsFillPersonPlusFill}
        color={"yellow"}
        grid={"self-stretch col-start-2 col-end-3 row-start-1 row-end-2"}
        handleClick={onAddClient}
      />
      <ActionCard
        title={"Vizualizează harta"}
        subtitle={"Vezi harta campingului"}
        icon={MapIcon}
        color={"violet"}
        grid={"self-stretch col-start-1 col-end-2 row-start-1 row-end-2"}
        handleClick={handleMapClick}
        display={"hidden lg:flex"}
      />
      <ActionCard
        title={"Vizualizeaza statistici"}
        subtitle={"Vezi statistici"}
        icon={ChartBarIcon}
        color={"emerald"}
        grid={"self-stretch col-start-2 col-end-3 row-start-1 row-end-2"}
        handleClick={handleStatsClick}
        display={"hidden lg:flex"}
      />
    </>
  );
}
