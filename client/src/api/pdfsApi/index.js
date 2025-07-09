const BASE_URL = "http://localhost:3000/api/v1/exports";

export const getRevenueRaport = async (startDate, endDate) => {
  const res = await fetch(
    `${BASE_URL}/revenue-raport?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return res;
};

export const getClientRaport = async (id) => {
  const res = await fetch(`${BASE_URL}/client-raport/${id}`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return res;
};

export const getPriceList = async () => {
  const res = await fetch(`${BASE_URL}/price-list`);

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  return res;
};
