import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClient, editClient, getClient } from "../../api/clientApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Calendar from "../ui/Calendar";
import Input from "../forms/Input";
import {
  phoneRegex,
  numbersLettersRegex,
  lettersRegex,
} from "../../utils/regex";

const validationSchema = yup
  .object({
    cnp: yup
      .string()
      .required("CNP lipsă!")
      .matches(numbersLettersRegex, "Trebuie să conțină numere și litere!"),
    nume: yup
      .string(lettersRegex, "Trebuie sa contina numai litere")
      .required("Nume lipsă!"),
    nationalitate: yup.string().optional(),
    email: yup.string().email("Trebuie să fie un email valid!").optional(),
    nrTelefon: yup
      .string()
      .nullable()
      .notRequired()
      .matches(phoneRegex, "Invalid")
      .transform((value) => (value === "" ? null : value)),
  })
  .required();

function ClientsForm({ onClose, isEditing, clientId }) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      cnp: "",
      nume: "",
      nationalitate: "",
      email: "",
      nrTelefon: "",
    },
  });

  console.log(errors);

  const { data: client } = useQuery({
    queryKey: ["clienti", clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });

  useEffect(() => {
    if (client && isEditing) {
      setValue("cnp", client.cnp || "");
      setValue("nume", client.nume || "");
      setValue("nationalitate", client.nationalitate || "");
      setValue(
        "dataNasterii",
        client.dataNasterii ? new Date(client.dataNasterii) : ""
      );
      setValue("email", client.email || "");
      setValue("nrTelefon", client.nrTelefon || "");
    }
  }, [client, setValue, isEditing]);

  useEffect(() => {
    if (client && client.dataNasterii) {
      const dataNasteriiDb = new Date(client.dataNasterii);
      setSelectedDate(dataNasteriiDb);
    }
  }, [client]);

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

  const onSubmit = (data) => {
    data.dataNasterii = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    if (!isEditing) {
      createClientMutation.mutate(data);
    } else {
      updateClientMutation.mutate(data);
      setSelectedDate(data.dataNasterii);
    }
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          register={register}
          error={errors.cnp}
        />
        <Input
          width="w-full"
          id="nume"
          name="nume"
          label="Nume"
          placeholder="Nume..."
          register={register}
          error={errors.nume}
        />
        <div className="flex gap-8 w-full pb-4">
          <Input
            width="w-full"
            id="nationalitate"
            name="nationalitate"
            label="Nationalitate"
            placeholder="Romania..."
            register={register}
            error={errors.nationalitate}
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
            register={register}
            error={errors.email}
          />

          <Input
            width="w-full"
            id="nrTelefon"
            name="nrTelefon"
            label="Număr telefon *"
            placeholder="07xxxxx..."
            register={register}
            error={errors.nrTelefon}
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
