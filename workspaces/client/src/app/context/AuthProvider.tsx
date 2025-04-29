'use client';

import axios from '@lib/axiosInstance';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  username: string | undefined;
  accessToken: string | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  resetError: () => void;
  loading: boolean;
  error: string | null;
  isLogged: boolean | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifie si un utilisateur est déjà connecté (par exemple via le localStorage)
    const storedUser = localStorage.getItem('username');
    const storedAccessToken = localStorage.getItem('accessToken');
    if (storedUser && storedAccessToken) {
      setUsername(storedUser);
      setAccessToken(storedAccessToken);
      setIsLogged(true);
      setLoading(false);
      return;
    }

    setIsLogged(false);
    setLoading(false);
  }, []);

  // Login
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    await axios
      .post(process.env.NEXT_PUBLIC_WS_API_URL + '/auth/login', {
        username,
        password,
      })
      .then((res) => {
        if (res.status == 201) {
          setIsLogged(true);
          setAccessToken(res.data.accessToken);
          setUsername(res.data.username);
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('username', res.data.username);
          return;
        }

        setError(res.data.message || 'Erreur de connexion');
      });

    setLoading(false);
  };

  // Register
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);

    await axios
      .post(process.env.NEXT_PUBLIC_WS_API_URL + '/auth/register', {
        username,
        email,
        password,
      })
      .then((res) => {
        if (res.status == 201) {
          setIsLogged(true);
          setAccessToken(res.data.accessToken);
          setUsername(res.data.username);
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('username', res.data.username);
          return;
        }

        setError(res.data.message || 'Erreur de connexion');
      });

    setLoading(false);
  };

  // Logout
  const logout = async () => {
    await axios.post(
      process.env.NEXT_PUBLIC_WS_API_URL + '/auth/logout',
      {},
      { withCredentials: true },
    );
    setUsername(undefined);
    setAccessToken(undefined);
    setIsLogged(false);
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        accessToken,
        login,
        logout,
        register,
        resetError,
        loading,
        error,
        isLogged,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};
