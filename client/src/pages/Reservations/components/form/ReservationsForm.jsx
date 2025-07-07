import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaRezervare } from "./validationSchema";
import Calendar from "../../../../components/ui/calendar/Calendar";
import Input from "../../../../components/ui/inputs/Input";
import Autocomplete from "../../../../components/ui/inputs/Autocomplete";
import QuantitySelect from "../../../../components/ui/inputs/QuantitySelect";
import Select from "../../../../components/ui/inputs/Select";
import { formatDateForServer } from "../../../../utils/dateFormat";
import useReservationsData from "../../hooks/useReservationsData";
import useCreateReservation from "../../hooks/useCreateReservation";
import useUpdateReservation from "../../hooks/useUpdateReservation";

function ReservationsForm({ onClose, isEditing, rezervareId, initialSpot }) {
  const [selectedDataIn, setSelectedDataIn] = useState(new Date());
  const [selectedDataOut, setSelectedDataOut] = useState(null);
  const [tipuriAuto, setTipuriAuto] = useState({});
  const [selectedClient, setSelectedClient] = useState({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaRezervare),
    defaultValues: {
      idClient: "",
      adulti: "",
      copii: "",
      tipAuto: {},
      idLoc: initialSpot?.id || "",
      hasElectricity: initialSpot?.hasElectricity || false,
    },
  });

  const {
    rezervare,
    facilitati,
    locuriDisponibile,
    clientiAutocomplete,
    refetchLocuriDisponibile,
  } = useReservationsData(
    rezervareId,
    selectedDataIn,
    selectedDataOut,
    watch("hasElectricity")
  );

  useEffect(() => {
    if (rezervare) {
      setSelectedDataIn(rezervare.dataCheckIn);
      setSelectedDataOut(rezervare.dataCheckOut);
    }
  }, [rezervare]);

  useEffect(() => {
    setSelectedClient(
      isEditing && clientiAutocomplete?.length
        ? clientiAutocomplete.find((c) => c._id === rezervare?.idClient)
        : null
    );
  }, [isEditing, clientiAutocomplete, rezervare]);

  useEffect(() => {
    if (selectedDataIn && selectedDataOut) {
      refetchLocuriDisponibile();
    }
  }, [selectedDataIn, selectedDataOut, watch("hasElectricity")]);

  const createRezervareMutation = useCreateReservation(onClose);
  const updateRezervareMutation = useUpdateReservation(rezervareId, onClose);

  const onSubmit = (data) => {
    data.dataCheckIn = formatDateForServer(selectedDataIn);
    data.dataCheckOut = formatDateForServer(selectedDataOut);

    data.facilitati = {
      Adult: parseInt(data.adulti, 10) || 0,
      "Copii 3-12 ani": parseInt(data.copii, 10) || 0,
    };

    delete data.adulti;
    delete data.copii;

    data.tipAuto = tipuriAuto;

    if (!isEditing) {
      createRezervareMutation.mutate(data);
    } else {
      updateRezervareMutation.mutate(data);
      setSelectedDataIn(data.dataCheckIn);
      setSelectedDataOut(data.dataCheckOut);
    }
  };

  useEffect(() => {
    setValue("tipAuto", tipuriAuto);
  }, [tipuriAuto, setValue]);

  useEffect(() => {
    if (initialSpot?.id) {
      setValue("idLoc", initialSpot?.id);
    } else if (rezervare && isEditing) {
      setValue("idLoc", rezervare.idLoc || "");
    }
  }, [initialSpot, setValue, rezervare, isEditing]);

  useEffect(() => {
    if (rezervare && isEditing) {
      setTipuriAuto(rezervare.tipAuto);

      setValue(
        "dataCheckIn",
        rezervare.dataCheckIn ? new Date(rezervare.dataCheckIn) : ""
      );
      setValue(
        "dataCheckOut",
        rezervare.dataCheckOut ? new Date(rezervare.dataCheckOut) : ""
      );
      setValue("adulti", rezervare.facilitati["Adult"] || "0");
      setValue("copii", rezervare.facilitati["Copii 3-12 ani"] || "0");
      setTipuriAuto(rezervare.tipAuto || {});
      setValue("tipAuto", rezervare.tipAuto || {});
      setValue("hasElectricity", rezervare.hasElectricity || "");
      setValue("idClient", selectedClient?._id);
    }
  }, [rezervare, setValue, isEditing, tipuriAuto, selectedClient]);

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
      className="fixed inset-0 overflow-x-auto md:flex md:items-center md:justify-center bg-black/50 z-50"
    >
      <div className="inset-0 flex flex-col gap-6 p-4 py-8 h-max items-center m-auto justify-center bg-white shadow-md md:p-8 md:w-[80%] md:rounded-xl lg:py-6 lg:fixed lg:w-[40%] lg:min-w-lg lg:p-8 lg:h-max lg:rounded-lg">
        <h2 className="font-bold text-2xl">
          {isEditing ? <p>Editează rezervarea</p> : <p>Adaugă o rezervare</p>}
        </h2>
        <Autocomplete
          data={clientiAutocomplete}
          width="w-full"
          label="Client"
          placeholder="Client..."
          name="idClient"
          defaultValue={selectedClient}
          onSelect={(client) => {
            if (client && client._id) {
              setValue("idClient", client._id);
            } else {
              setValue("idClient", "");
            }
          }}
          error={errors.idClient}
        />
        <div className="flex flex-col md:flex-row gap-6 w-full md:pb-4">
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
        <div className="relative flex flex-col md:flex-row gap-6 w-full md:pt-6 md:before:absolute md:before:w-5/6 md:before:h-[0.5px] md:before:bg-blue-950/20 md:before:top-0 md:before:left-1/2 md:before:-translate-x-1/2">
          <Calendar
            id="dataCheckIn"
            name="dataCheckIn"
            label="Data Check-In"
            selected={selectedDataIn}
            onDateChange={(date) => {
              setSelectedDataIn(date);
              setValue("dataCheckIn", date);
              if (selectedDataOut && date > selectedDataOut) {
                setSelectedDataOut(null);
                setValue("dataCheckOut", "");
              }
            }}
            selectsStart
            startDate={selectedDataIn}
            endDate={selectedDataOut}
            error={errors.dataCheckIn}
            register={register}
          />
          <Calendar
            id="dataCheckOut"
            name="dataCheckOut"
            label="Data Check-Out"
            selected={selectedDataOut}
            onDateChange={(date) => {
              setSelectedDataOut(date);
              setValue("dataCheckOut", date);
            }}
            selectsEnd
            startDate={selectedDataIn}
            endDate={selectedDataOut}
            error={errors.dataCheckOut}
            register={register}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <QuantitySelect
            width="w-full"
            id="tipAuto"
            name="tipAuto"
            label="Tip Autovehicul"
            data={tipuriAuto}
            setData={(newValue) => {
              setTipuriAuto(newValue);
              setValue("tipAuto", newValue);
            }}
            labelData={facilitati}
            register={register}
            error={errors.tipAuto}
          />
          <Select
            data={locuriDisponibile}
            width="w-full"
            id="idLoc"
            name="idLoc"
            label="Loc"
            register={register}
            error={errors.idLoc}
            value={watch("idLoc")}
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
