import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../forms/Input";
import { createClient, editClient, getClient } from "../../api/clientApi";
import Calendar from "../ui/Calendar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function ClientsForm({ onClose, isEditing, clientId }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: client } = useQuery({
    queryKey: ["clienti", clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  const queryClient = useQueryClient();

  const createClientMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
      onClose();
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: (data) => editClient(clientId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clienti", "list"] });
      onClose();
      navigate("/clienti");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    data.dataNasterii = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    if (!isEditing) {
      createClientMutation.mutate(data);
    } else {
      updateClientMutation.mutate(data);
    }
    event.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="fixed inset-0 flex flex-col gap-6 items-center m-auto w-[40%] min-w-xl p-8 h-max bg-white shadow-md sm:rounded-lg">
        <h2 className="font-bold text-2xl">
          {isEditing ? <p>Editează rezervarea</p> : <p>Adaugă o rezervare</p>}
        </h2>
        <Input
          width="w-full"
          id="cnp"
          placeholder="CNP..."
          name="cnp"
          label="CNP"
          defaultValue={isEditing && client ? client.cnp : ""}
        />
        <Input
          width="w-full"
          id="nume"
          name="nume"
          label="Nume"
          placeholder="Nume..."
          defaultValue={isEditing && client ? client.nume : ""}
        />
        <div className="flex gap-8 w-full pb-4">
          <Input
            width="w-full"
            id="nationalitate"
            name="nationalitate"
            label="Nationalitate"
            placeholder="Romania..."
            defaultValue={isEditing && client ? client.nationalitate : ""}
          />

          <div className="w-full">
            <label
              htmlFor="dataNasterii"
              className="block mb-2 text-sm text-blue-950 font-medium"
            >
              Data Nașterii
            </label>
            <Calendar
              onDateChange={setSelectedDate}
              id="dataNasterii"
              name="dataNasterii"
              selected={selectedDate}
            />
          </div>
        </div>
        <div className="relative flex gap-8 w-full pt-4 before:absolute before:w-5/6 before:h-[0.5px] before:bg-blue-950/20 before:top-0 before:left-1/2 before:-translate-x-1/2">
          <Input
            width="w-full"
            id="email"
            name="email"
            label="Email *"
            placeholder="ceva@gmail.com..."
            type="email"
            defaultValue={isEditing && client ? client.email : ""}
          />

          <Input
            width="w-full"
            id="nrTelefon"
            name="nrTelefon"
            label="Număr telefon *"
            placeholder="07xxxxx..."
            defaultValue={isEditing && client ? client.nrTelefon : ""}
          />
        </div>

        <div className="w-full">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 text-center w-full cursor-pointer"
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
    </form>
  );
}

export default ClientsForm;
