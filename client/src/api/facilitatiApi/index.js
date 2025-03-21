const BASE_URL = "http://127.0.0.1:3000/api/v1/facilitati";

export const getFacilitati = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  const resData = await res.json();
  return resData.data.facilitati;
};
