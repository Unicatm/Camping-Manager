const BASE_URL = "http://127.0.0.1:3000/api/v1/clients";

export const getClienti = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data.clients;
};

export const getClient = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  const data = resData.data.client;
  return data;
};

export const getClientReservations = async (idClient) => {
  const res = await fetch(`${BASE_URL}/rezervari/${idClient}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  const data = resData.data[0];
  return data;
};

export const getClientName = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

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

export const getClientGrowthData = async () => {
  const res = await fetch(`${BASE_URL}/stats/client-growth-data`);

  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getWeeklyNewClientsStats  = async () => {
  const res = await fetch(`${BASE_URL}/stats/weekly-new-data`);

  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getClientsNameAndCnp = async () => {
  const res = await fetch(`${BASE_URL}/clients-name-cnp`);

  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const deleteClient = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export const editClient = async (clientId, newData) => {
  const res = await fetch(`${BASE_URL}/${clientId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  return res.json();
};
