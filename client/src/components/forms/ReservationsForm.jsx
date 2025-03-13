import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editRezervare, getRezervareById } from "../../api/reservationsApi";
import Calendar from "../ui/Calendar";
import Input from "./Input";

function ReservationsForm({ onClose, isEditing, rezervareId }) {
  const [selectedDataIn, setSelectedDataIn] = useState(null);
  const [selectedDataOut, setSelectedDataOut] = useState(null);

  const {
    data: rezervare,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["rezervare", rezervareId],
    queryFn: () => getRezervareById(rezervareId),
    enabled: !!rezervareId,
  });

  useEffect(() => {
    if (rezervare) {
      setSelectedDataIn(rezervare.dataCheckIn);
      setSelectedDataOut(rezervare.dataCheckOut);
    }
  }, [rezervare]);

  // console.log("ReservationsForm - rezervareId:", rezervareId); // Debug log
  // console.log("ReservationsForm - rezervare:", rezervare);
  // console.log("ReservationsForm - dataci:", selectedDataIn);

  // const queryClient = useQueryClient();

  const updateRezervareMutation = useMutation({
    mutationFn: editRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervare", rezervareId] });
    },
  });

  const handleSubmit = (e, updateRezervare) => {
    // e.preventDefault();
    // const fd = new FormData(e.target);
    // const data = Object.fromEntries(fd.entries());
    // if (isEditing) {
    //   updateRezervareMutation.mutate({ rezervareId, ...data });
    // }
  };

  return (
    <form
      // onSubmit={handleSubmit}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="fixed inset-0 flex flex-col gap-6 items-center m-auto w-[40%] min-w-xl p-8 h-max bg-white shadow-md sm:rounded-lg">
        <h2 className="font-bold text-2xl">Adaugă o rezervare</h2>
        <Input
          width="w-full"
          label="Client"
          id="numeClient"
          placeholder="Client..."
          name="idClient"
          defaultValue={isEditing && rezervare ? rezervare.idClient : ""}
        />
        <div className="flex gap-6 w-full pb-4">
          <Input
            width="w-full"
            id="Adulti"
            name="Adulti"
            label="Adulți"
            defaultValue={
              isEditing && rezervare && rezervare.facilitati
                ? rezervare.facilitati.Adulti
                : ""
            }
          />
          <Input width="w-full" id="Copii" name="copii" label="Copii 0-7 ani" />
          <Input
            width="w-full"
            id="Copii"
            name="copii"
            label="Copii 7-14 ani"
            defaultValue={
              isEditing && rezervare && rezervare.facilitati
                ? rezervare.facilitati.Copii
                : ""
            }
          />
        </div>
        <div className="relative pt-6 flex gap-6 w-full before:absolute before:w-5/6 before:h-[0.5px] before:bg-blue-950/20 before:top-0 before:left-1/2 before:-translate-x-1/2">
          <Input
            width="w-full"
            id="dataCheckIn"
            name="dataCheckIn"
            label="Data Check-In"
            type="date"
            onDateChange={setSelectedDataIn}
            selected={selectedDataIn}
          />
          <Input
            width="w-full"
            id="dataCheckOut"
            name="dataCheckOut"
            label="Data Check-Out"
            type="date"
            onDateChange={setSelectedDataOut}
            selected={selectedDataOut}
          />
        </div>
        <div className="flex gap-6 w-full">
          <Input
            width="w-full"
            id="tipAuto"
            name="tipAuto"
            label="Tip Autovehicul"
          />
          <Input width="w-full" id="idLoc" name="idLoc" label="Loc" />
        </div>

        <div className="flex items-start self-start mb-5">
          <div className="items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
              // defaultChecked={rezervare.hasElectricity ? true : false}
            />
          </div>
          <label
            for="energie"
            className="ms-2 text-sm text-blue-950 font-medium"
          >
            Utilizează energie
          </label>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center w-full cursor-pointer"
          >
            {isEditing ? "Editează" : "Salvează"}
          </button>
          <button
            onClick={onClose}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full cursor-pointer"
          >
            Anulează
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReservationsForm;
