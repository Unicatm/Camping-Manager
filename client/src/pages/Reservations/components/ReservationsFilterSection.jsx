import Select from "../../../components/ui/inputs/Select";
import Input from "../../../components/ui/inputs/Input";

export default function ReservationsFilterSection({ onSearch, filters }) {
  const tipRes = ["Toate", "În curs", "Terminată"];

  const handleStatusChange = (newStatus) => {
    onSearch({ ...filters, status: newStatus });
  };

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    onSearch({ ...filters, searchText: newSearchText });
  };

  return (
    <div className="flex justify-between gap-4 h-fit pb-4">
      <Input
        width="w-52"
        placeholder="Caută..."
        onChange={handleSearchChange}
        label="Caută după client"
        value={filters.searchText}
      />
      <Select
        data={tipRes}
        width="w-fit"
        label="Status"
        value={filters.status}
        setValue={handleStatusChange}
      />
    </div>
  );
}
