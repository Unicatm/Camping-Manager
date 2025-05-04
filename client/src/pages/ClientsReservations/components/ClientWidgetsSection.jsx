import React from "react";
import SimpleWidget from "../../../components/widgets/SimpleWidget";
import { MdNumbers } from "react-icons/md";
import { CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline";
import useTotalExpenses from "../hooks/useTotalExpenses";

export default function ClientWidgetsSection({ idClient }) {
  const { data: expenses } = useTotalExpenses({ idClient });
  return (
    <div className="flex gap-4">
      <SimpleWidget
        title={"Medie zile campate"}
        data={{ total: expenses?.medieZileCampate }}
        unit={"zile"}
        icon={ClockIcon}
      />
      <SimpleWidget
        title={"Cheltuieli totale"}
        data={{ total: expenses?.cheltuieli }}
        unit={"lei"}
        icon={CurrencyDollarIcon}
      />
      <SimpleWidget
        title={"Număr rezervări"}
        data={{ total: expenses?.numarRezervari }}
        icon={MdNumbers}
      />
    </div>
  );
}
