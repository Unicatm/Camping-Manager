import Input from "..//../../../components/ui/inputs/Input";

const TableHeader = ({ onSearch }) => {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };
  return (
    <div className="flex items-center justify-between mb-4 bg-white">
      <h2 className="text-lg font-semibold text-slate-800">Rezervari</h2>
      <div className="flex items-center gap-2">
        <div className="flex flex-row gap-6 items-center w-full">
          <Input
            width="w-40"
            label="Caută dupa nume"
            placeholder="Caută..."
            // onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
