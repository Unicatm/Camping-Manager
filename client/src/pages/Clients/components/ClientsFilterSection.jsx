import React from "react";
import Input from "../../../components/ui/inputs/Input";

export default function ClientsFilterSection({ onSearch }) {
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
        label="Caută după nume"
      />
    </div>
  );
}
