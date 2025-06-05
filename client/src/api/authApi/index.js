const BASE_URL = "http://127.0.0.1:3000/api/v1/auth";

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  console.log(data);
  return data.accessToken;
};

export const refreshToken = async () => {
  const res = await fetch(`${BASE_URL}/refresh`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Refresh token expired");
  const data = await res.json();
  return data.accessToken;
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");
  return true;
};
