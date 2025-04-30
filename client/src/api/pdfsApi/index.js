const BASE_URL = "http://127.0.0.1:3000/api/v1/exports";

export const getRevenueRaport = async () => {
  const res = await fetch(`${BASE_URL}/revenue-raport`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return res;
};
