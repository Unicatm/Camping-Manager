import Calendar from "../../../../components/ui/calendar/Calendar";
import Input from "../../../../components/ui/inputs/Input";
import Select from "../../../../components/ui/inputs/Select";
import countryData from "./countryData";
import useClientForm from "../../hooks/useClientForm";

function ClientsForm({ onClose, isEditing, clientId }) {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selectedDate,
    setSelectedDate,
    selectedCountry,
    setSelectedCountry,
  } = useClientForm({ isEditing, clientId, onClose });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed inset-0 overflow-x-auto md:flex md:items-center md:justify-center bg-black/50 z-50"
    >
      <div className="inset-0 flex flex-col gap-6 p-4 py-8 h-screen items-center m-auto justify-center bg-white shadow-md md:p-8 md:w-[80%] md:rounded-xl lg:py-6 lg:fixed lg:w-[40%] lg:min-w-lg lg:p-8 lg:h-max lg:rounded-lg">
        <h2 className="font-bold text-2xl">
          {isEditing ? <p>Editează clientul</p> : <p>Adaugă un client</p>}
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
        <div className="w-full flex flex-col gap-6 md:flex-row lg:gap-8 lg:pb-4">
          <Select
            data={countryData}
            width="w-full"
            id="nationalitate"
            name="nationalitate"
            label="Nationalitate"
            setValue={setSelectedCountry}
            value={selectedCountry}
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
              birthDate={true}
            />
          </div>
        </div>
        <div className="relative flex flex-col gap-6 md:flex-row lg:gap-8 w-full lg:pt-4 lg:before:absolute lg:before:w-5/6 lg:before:h-[0.5px] lg:before:bg-blue-950/20 lg:before:top-0 lg:before:left-1/2 lg:before:-translate-x-1/2">
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
