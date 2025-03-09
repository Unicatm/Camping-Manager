import Input from "./Input";

function ReservationsForm({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="fixed inset-0 flex flex-col gap-6 items-center m-auto w-[45%] min-w-xl p-8 h-max bg-white shadow-md sm:rounded-lg">
        <h2 className="font-bold text-2xl">Adaugă o rezervare</h2>
        <Input width="w-full" label="Client" />
        <div className="flex gap-8 w-full">
          <div class="w-full min-w-[200px]">
            <label class="block mb-2 text-sm text-blue-950 font-medium">
              Dată Check-In
            </label>
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
          <div class="w-full min-w-[200px]">
            <label class="block mb-2 text-sm text-blue-950 font-medium">
              Dată Check-Out
            </label>
            <input
              class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
            />
          </div>
        </div>

        <div class="w-full min-w-[200px]">
          <label class="block mb-2 text-sm text-blue-950 font-medium">
            Tip Autovehicul
          </label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..."
          />
        </div>
        <div class="w-full min-w-[200px]">
          <label class="block mb-2 text-sm text-blue-950 font-medium">
            Loc
          </label>
          <input
            class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Type here..."
          />
        </div>
        <div class="flex items-start self-start mb-5">
          <div class="items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label for="energie" class="ms-2 text-sm text-blue-950 font-medium">
            Utilizează energie
          </label>
        </div>
        <div className="w-full">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center w-full cursor-pointer"
          >
            Salvează
          </button>
          <button
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full cursor-pointer"
          >
            Anulează
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationsForm;
