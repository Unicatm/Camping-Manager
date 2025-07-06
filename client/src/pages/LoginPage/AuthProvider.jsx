import { createContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, refreshToken, logoutUser } from "../../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (accessToken) => {
      setAccessToken(accessToken);
    },
    onError: () => {
      setAccessToken(null);
    },
  });

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await refreshToken();
        if (data && data.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          throw new Error("Invalid refresh response");
        }
      } catch (err) {
        console.log("Auth initialization error:", err.message);
        setAccessToken(null);

        // Optional: Redirect to login if session expired
        if (
          err.message.includes("expired") ||
          err.message.includes("invalid")
        ) {
          // window.location.href = '/login'; // Hard redirect to clear state
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      initAuth();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = ({ email, password }) => {
    loginMutation.mutate({ email, password });
  };

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setAccessToken(null);
    },
    onError: () => {
      setAccessToken(null);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: true, // !!accessToken
        login,
        logout: logout.mutate,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
