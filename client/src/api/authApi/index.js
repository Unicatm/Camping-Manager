const BASE_URL = "http://localhost:3000/api/v1/auth";

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
  try {
    const res = await fetch(`${BASE_URL}/refresh`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      if (res.status === 403) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || "Session expired - please login again"
        );
      }
      throw new Error(`Refresh failed with status ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  console.log(res);

  if (!res.ok) throw new Error("Logout failed");
  return true;
};
