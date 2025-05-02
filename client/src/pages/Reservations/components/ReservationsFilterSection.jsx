import React from "react";
import Select from "../../../components/ui/inputs/Select";
import Input from "../../../components/ui/inputs/Input";

export default function ReservationsFilterSection({ onSearch }) {
  const tipRes = ["Toate", "În curs", "Terminate"];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };
  return (
    <div className="flex justify-between gap-4 h-fit pb-4">
      <Input
        width="w-52"
        placeholder="Caută..."
        onChange={handleSearchChange}
        label="Caută după client"
      />
      <Select data={tipRes} width="w-fit" label="Status" />
    </div>
  );
}
