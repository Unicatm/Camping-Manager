import { PlusIcon } from "@heroicons/react/16/solid";
import Input from "../modals/Input";

function SearchAddSection({ openModal }) {
  return (
    <div className="w-full flex justify-between pb-6">
      <Input width="w-2/8" placeholder="Caută..." />

      <button
        onClick={openModal}
        className="cursor-pointer flex justify-center items-center gap-2 h-fit bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
      >
        <PlusIcon className="h-6 w-6" />
        <p>Adaugă o rezervare</p>
      </button>
    </div>
  );
}

export default SearchAddSection;
