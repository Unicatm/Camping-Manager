const BASE_URL = "http://127.0.0.1:3000/api/v1/rezervari";

export const getAllRezervari = async () => {
  const res = await fetch(BASE_URL);
  const resData = await res.json();
  return resData.data.rezervari;
};

export const getRezervariByClientId = async (id) => {
  const res = await fetch(`${BASE_URL}/clienti/${id}`);
  const resData = await res.json();
  return resData.data.rezervari;
};
