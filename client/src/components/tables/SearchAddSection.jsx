import { PlusIcon } from "@heroicons/react/16/solid";
import Input from "../ui/inputs/Input";

function SearchAddSection({ openModal, buttonText, onSearch }) {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className="w-full flex justify-between items-end pb-6">
      <div className="flex flex-row gap-6 items-center w-full">
        <Input
          width="w-3/14"
          label="Caută dupa nume"
          placeholder="Caută..."
          onChange={handleSearchChange}
        />
      </div>

      <button
        onClick={openModal}
        className="cursor-pointer flex justify-center items-center gap-2 w-max bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
      >
        <PlusIcon className="h-6 w-6" />
        <p className="whitespace-nowrap">{buttonText}</p>
      </button>
    </div>
  );
}

export default SearchAddSection;
