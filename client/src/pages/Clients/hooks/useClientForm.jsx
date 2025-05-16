import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaClient } from "../components/form/validationScheme";
import countryData from "../components/form/countryData";
import useCreateClient from "./useCreateClient";
import useUpdateClient from "./useUpdateClient";
import useGetClientById from "./useGetClientById";
import { formatDateForServer } from "../../../utils/dateFormat";

export default function useClientForm({ isEditing, clientId, onClose }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(countryData[0]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchemaClient),
    defaultValues: {
      cnp: "",
      nume: "",
      nationalitate: "",
      email: "",
      nrTelefon: "",
    },
  });

  const { client } = useGetClientById(clientId);
  const createClientMutation = useCreateClient(onClose);
  const updateClientMutation = useUpdateClient(clientId, onClose);

  const onSubmit = (data) => {
    data.dataNasterii = formatDateForServer(selectedDate);
    data.nationalitate = selectedCountry;

    if (!isEditing) {
      createClientMutation.mutate(data);
    } else {
      updateClientMutation.mutate(data);
      setSelectedDate(data.dataNasterii);
    }
  };

  useEffect(() => {
    if (client && isEditing) {
      setValue("cnp", client.cnp || "");
      setValue("nume", client.nume || "");
      setSelectedCountry(client.nationalitate);
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

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selectedDate,
    setSelectedDate,
    selectedCountry,
    setSelectedCountry,
  };
}
