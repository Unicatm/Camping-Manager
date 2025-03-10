const BASE_URL = "http://127.0.0.1:3000/api/v1/clients";

export const getClienti = async () => {
  const res = await fetch(BASE_URL);
  const resData = await res.json();
  return resData.data.clients;
};

export const getClient = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const resData = await res.json();
  return resData.data.client;
};

export const getClientName = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const resData = await res.json();
  return resData.data.client.nume;
};

export const createClient = async (client) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  return res.json();
};

export const deleteClient = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export const editClient = async (client, newData) => {
  const res = await fetch(`${BASE_URL}/${client._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res.json();
};
