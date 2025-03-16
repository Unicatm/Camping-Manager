import { PlusIcon } from "@heroicons/react/16/solid";
import Input from "../forms/Input";

function SearchAddSection({ openModal, buttonText, onSearch }) {
  const handleSearchChange = (e) => {
    const value = e.target.value;
    onSearch(value);
  };

  return (
    <div className="w-full flex justify-between items-end pb-6">
      <Input
        width="w-3/14"
        label="Caută dupa nume"
        placeholder="Caută..."
        onChange={handleSearchChange}
      />

      <button
        onClick={openModal}
        className="cursor-pointer flex justify-center items-center gap-2 h-fit bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
      >
        <PlusIcon className="h-6 w-6" />
        <p>{buttonText}</p>
      </button>
    </div>
  );
}

export default SearchAddSection;
