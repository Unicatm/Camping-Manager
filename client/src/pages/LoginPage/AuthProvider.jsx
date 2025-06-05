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
        const accessToken = await refreshToken();
        setAccessToken(accessToken);
      } catch (err) {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
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
        isAuthenticated: !!accessToken,
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
