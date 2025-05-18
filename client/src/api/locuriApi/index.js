const BASE_URL = "http://127.0.0.1:3000/api/v1/locuriCampare";

export const getAllLocuriCampare = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data.locuri;
};

export const getTotalNumberLocuriCampare = async () => {
  const res = await fetch(`${BASE_URL}/get-total-number-of-spaces`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data[0];
};

export const getLocuriZi = async () => {
  const res = await fetch(`${BASE_URL}/locuri/zi`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data.rezultat;
};

export const getLocuriDisponibile = async ({ start, end, energie }) => {
  const res = await fetch(
    `${BASE_URL}/disponibile?start=${start}&end=${end}&energie=${energie}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data.locuri;
};
