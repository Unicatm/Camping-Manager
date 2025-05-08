import React from "react";

export default function CheckOutCard() {
  return (
    <div className="col-start-3 col-end-5 row-start-3 row-end-7 bg-white rounded-xl border border-gray-200 p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-1">Check-out-uri pentru astăzi</h2>
      <p className="text-gray-500 text-sm mb-6">
        Clienți care urmează să plece
      </p>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <Field />
        <Field />
        <Field />
        <Field />
      </div>
    </div>
  );
}

const Field = ({ client }) => (
  <div className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
    <div className="flex items-center space-x-4">
      <div className="bg-blue-200 text-blue-800 font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg">
        RV
      </div>
      <div>
        <div className="font-semibold text-lg">Radu Vlad</div>
        <div className="text-gray-500 text-sm">
          S2 • 2 Adulți, 0 Copii • 1 Mașină
        </div>
      </div>
    </div>
    <button className="text-sm text-gray-600 font-medium border border-gray-300 rounded-lg px-4 py-2 bg-white hover:bg-gray-50 transition cursor-pointer">
      Vizualizează
    </button>
  </div>
);
