import React, { useState } from "react";
import Select from "../../../components/ui/inputs/Select";
import Input from "../../../components/ui/inputs/Input";

export default function ReservationsFilterSection({ onSearch }) {
  const tipRes = ["Toate", "În curs", "Terminată"];

  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("Toate");

  const handleStatusChange = (value) => {
    setStatus(value);
    onSearch({ searchText, status: value });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch({ searchText: value, status });
  };

  return (
    <div className="flex justify-between gap-4 h-fit pb-4">
      <Input
        width="w-52"
        placeholder="Caută..."
        onChange={handleSearchChange}
        label="Caută după client"
      />
      <Select
        data={tipRes}
        width="w-fit"
        label="Status"
        value={status}
        setValue={handleStatusChange}
      />
    </div>
  );
}
