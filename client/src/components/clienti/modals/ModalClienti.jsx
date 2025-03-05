import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../modals/Input";

function ModalClienti({ onClose, onClientAdded, isEditing, clientId }) {
  const navigate = useNavigate();
  // const [enteredValues, setEnteredValues] = useState({});
  const [client, setClient] = useState({});

  // const isClientEmpty = JSON.stringify(client) === "{}";

  console.log(isEditing);
  useEffect(() => {
    if (isEditing && clientId) {
      async function getClient() {
        const res = await fetch(
          `http://127.0.0.1:3000/api/v1/clients/${clientId}`
        );
        const resData = await res.json();
        setClient(resData.data.client);
      }
      getClient();
    }
  }, [isEditing, clientId]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    // setEnteredValues(data);
    console.log(data);

    if (Object.keys(client).length === 0) {
      fetch("http://127.0.0.1:3000/api/v1/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          onClientAdded();
          onClose();
        });
    } else {
      fetch(`http://127.0.0.1:3000/api/v1/clients/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(() => {
          onClientAdded();
          onClose();
          navigate("/clienti");
        });
    }
    event.target.reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div className="fixed inset-0 flex flex-col gap-6 items-center m-auto w-[40%] min-w-xl p-8 h-max bg-white shadow-md sm:rounded-lg">
        <h2 className="font-bold text-2xl">
          {" "}
          {isEditing ? <p>Adaugă o rezervare</p> : <p>Editează rezervarea</p>}
        </h2>
        <Input
          width="w-full"
          id="cnp"
          placeholder="CNP..."
          name="_id"
          label="CNP"
          defaultValue={isEditing ? client._id : ""}
        />
        <Input
          width="w-full"
          id="nume"
          name="nume"
          label="Nume"
          placeholder="Nume..."
          defaultValue={isEditing ? client.nume : ""}
        />
        <div className="flex gap-8 w-full pb-4">
          <Input
            width="w-full"
            id="nationalitate"
            name="nationalitate"
            label="Nationalitate"
            placeholder="Romania..."
            defaultValue={isEditing ? client.nationalitate : ""}
          />

          <div className="w-full min-w-[200px]">
            <label className="block mb-2 text-sm text-blue-950 font-medium">
              Data Nașterii
            </label>
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Type here..."
              name="dataNasterii"
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
            defaultValue={isEditing ? client.email : ""}
          />

          <Input
            width="w-full"
            id="nrTelefon"
            name="nrTelefon"
            label="Număr telefon *"
            placeholder="07xxxxx..."
            defaultValue={isEditing ? client.nrTelefon : ""}
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

export default ModalClienti;
