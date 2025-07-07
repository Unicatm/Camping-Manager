import React from "react";
import SimpleWidget from "../../../components/widgets/SimpleWidget";
import { MdNumbers } from "react-icons/md";
import { CurrencyDollarIcon, ClockIcon } from "@heroicons/react/24/outline";
import useTotalExpenses from "../hooks/useTotalExpenses";

export default function ClientWidgetsSection({ idClient }) {
  const { data: expenses } = useTotalExpenses({ idClient });
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:flex-col lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-6 xl:flex-row xl:col-start-2 xl:col-end-5">
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
