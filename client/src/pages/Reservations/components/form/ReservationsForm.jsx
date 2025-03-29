import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRezervare } from "./validationSchema";

import {
  createRezervare,
  editRezervare,
  getRezervareById,
} from "../../../../api/reservationsApi";
import Calendar from "../../../../components/ui/calendar/Calendar";
import Input from "../../../../components/ui/inputs/Input";

function ReservationsForm({ onClose, isEditing, rezervareId }) {
  const navigate = useNavigate();
  const [selectedDataIn, setSelectedDataIn] = useState(null);
  const [selectedDataOut, setSelectedDataOut] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaRezervare),
    defaultValues: {
      idClient: "",
      adulti: "",
      copii: "",
      tipAuto: "",
      idLoc: "",
      hasElectricity: false,
    },
  });

  const { data: rezervare } = useQuery({
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

  const queryClient = useQueryClient();

  const createRezervareMutation = useMutation({
    mutationFn: createRezervare,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      onClose();
    },
  });

  const updateRezervareMutation = useMutation({
    mutationFn: (data) => editRezervare(rezervareId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rezervari", "list"] });
      onClose();
      navigate("/rezervari");
    },
  });

  const onSubmit = (data) => {
    data.dataCheckIn = selectedDataIn
      ? selectedDataIn.toISOString().split("T")[0]
      : "";
    data.dataCheckOut = selectedDataOut
      ? selectedDataOut.toISOString().split("T")[0]
      : "";

    data.facilitati = {
      Adult: parseInt(data.adulti, 10) || 0,
      "Copii 3-12 ani": parseInt(data.copii, 10) || 0,
    };

    delete data.adulti;
    delete data.copii;

    data.tipAuto = data.tipAuto ? [data.tipAuto] : [];

    console.log(data);
    if (!isEditing) {
      createRezervareMutation.mutate(data);
    } else {
      updateRezervareMutation.mutate(data);
      setSelectedDataIn(data.dataCheckIn);
      setSelectedDataOut(data.dataCheckOut);
    }
  };

  useEffect(() => {
    if (rezervare && isEditing) {
      setValue("idClient", rezervare.idClient || "");
      setValue(
        "dataCheckIn",
        rezervare.dataCheckIn ? new Date(rezervare.dataCheckIn) : ""
      );
      setValue(
        "dataCheckOut",
        rezervare.dataCheckOut ? new Date(rezervare.dataCheckOut) : ""
      );
      setValue("adulti", rezervare.facilitati["Adult"] || "0");
      setValue("copii", rezervare.facilitati["Copii"] || "0");
      setValue("idLoc", rezervare.idLoc || "");
      setValue("tipAuto", rezervare.tipAuto[0] || "");
      setValue("hasElectricity", rezervare.hasElectricity || "");
    }
  }, [rezervare, setValue, isEditing]);

  useEffect(() => {
    if (rezervare && rezervare.dataCheckIn && rezervare.dataCheckOut) {
      const dbSelectedDataIn = new Date(rezervare.dataCheckIn);
      const dbSelectedDataOut = new Date(rezervare.dataCheckOut);
      setSelectedDataIn(dbSelectedDataIn);
      setSelectedDataOut(dbSelectedDataOut);
    }
  }, [rezervare]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="fixed inset-0 flex flex-col gap-6 items-center m-auto w-[40%] min-w-xl p-8 h-max bg-white shadow-md sm:rounded-lg">
        <h2 className="font-bold text-2xl">
          {" "}
          {isEditing ? <p>Editează rezervarea</p> : <p>Adaugă o rezervare</p>}
        </h2>
        <Input
          width="w-full"
          label="Client"
          id="idClient"
          placeholder="Client..."
          name="idClient"
          register={register}
          error={errors.idClient}
        />
        <div className="flex gap-6 w-full pb-4">
          <Input
            width="w-full"
            id="adulti"
            name="adulti"
            label="Adulți"
            register={register}
            error={errors.adulti}
            defaultValue={
              isEditing && rezervare && rezervare.facilitati
                ? rezervare.facilitati["Adult"]
                : "0"
            }
          />
          <Input
            width="w-full"
            id="copii"
            name="copii"
            label="Copii 3-14 ani"
            register={register}
            error={errors.copii}
            defaultValue={
              isEditing && rezervare && rezervare.facilitati
                ? rezervare.facilitati["Copii"]
                : "0"
            }
          />
        </div>
        <div className="relative pt-6 flex gap-6 w-full before:absolute before:w-5/6 before:h-[0.5px] before:bg-blue-950/20 before:top-0 before:left-1/2 before:-translate-x-1/2">
          <Calendar
            id="dataCheckIn"
            name="dataCheckIn"
            label="Data Check-In"
            selected={selectedDataIn}
            onDateChange={setSelectedDataIn}
            register={register}
            error={errors.dataCheckIn}
          />
          <Calendar
            id="dataCheckOut"
            name="dataCheckOut"
            label="Data Check-Out"
            selected={selectedDataOut}
            onDateChange={setSelectedDataOut}
            register={register}
            error={errors.dataCheckOut}
          />
        </div>
        <div className="flex gap-6 w-full">
          <Input
            width="w-full"
            id="tipAuto"
            name="tipAuto"
            label="Tip Autovehicul"
            register={register}
            error={errors.tipAuto}
          />
          <Input
            width="w-full"
            id="idLoc"
            name="idLoc"
            label="Loc"
            register={register}
            error={errors.idLoc}
          />
        </div>

        <div className="flex items-start self-start mb-5">
          <div className="items-center h-5">
            <input
              id="hasElectricity"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
              {...register("hasElectricity")}
              defaultChecked={false}
            />
          </div>
          <label
            htmlFor="hasElectricity"
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
