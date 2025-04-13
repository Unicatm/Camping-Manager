const BASE_URL = "http://127.0.0.1:3000/api/v1/rezervari";

export const getAllRezervari = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData?.data?.rezervari || [];
};

export const getRezervareById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  const data = resData.data.rezervare;
  console.log(data);
  return data;
};

export const getRezervariByClientId = async (idClient) => {
  const res = await fetch(`${BASE_URL}/clienti/${idClient}`);
  const resData = await res.json();
  const data = resData.data.rezervari;
  return data;
};

export const getTopPredominantNationalitiesByYear = async (year) => {
  const res = await fetch(`${BASE_URL}/predominant-nationalities/${year}`);
  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getIncomingRevenueOnSelectedYears = async (years) => {
  const res = await fetch(
    `${BASE_URL}/incoming-revenue-years?years=${years.join(",")}`
  );
  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getAgeGroups = async (year) => {
  const res = await fetch(`${BASE_URL}/age-grouping/${year}`);
  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getAllAvailableYears = async () => {
  const res = await fetch(`${BASE_URL}/years`);
  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getMonthlyReservationsOnSelectedYears = async (years) => {
  const res = await fetch(
    `${BASE_URL}/number-reservations?years=${years.join(",")}`
  );
  const resData = await res.json();
  const data = resData.data;
  return data;
};

export const getTotalNumberOfReservations = async () => {
  const res = await fetch(`${BASE_URL}/total-number-of-reservations`);

  const resData = await res.json();
  const data = resData.data[0];
  return data;
};

export const getTotalNumberOfActiveReservations = async () => {
  const res = await fetch(`${BASE_URL}/total-number-of-active-reservations`);

  const resData = await res.json();
  const data = resData.data[0];
  return data;
};

export const getAvarageDaysSpent = async () => {
  const res = await fetch(`${BASE_URL}/average-days`);

  const resData = await res.json();
  const data = resData.data[0];
  return data;
};

export const createRezervare = async (rezervare) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rezervare),
  });
  return res.json();
};

export const deleteRezervare = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`Failed to delete reservation with ID: ${id}`);
  }

  return res;
};

export const editRezervare = async (rezervareId, newData) => {
  const res = await fetch(`${BASE_URL}/${rezervareId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });
  return res.json();
};
