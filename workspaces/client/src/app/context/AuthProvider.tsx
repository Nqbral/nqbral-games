'use client';

import axios from '@lib/axiosInstance';
import plainAxios from '@lib/plainAxios';
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
    const authenticate = async () => {
      try {
        const refreshRes = await plainAxios.post(
          `${process.env.NEXT_PUBLIC_WS_API_URL}/auth/refresh`,
          {},
          { withCredentials: true },
        );

        if (refreshRes.status === 201) {
          const newAccessToken = refreshRes.data.accessToken;
          setAccessToken(newAccessToken);
          setIsLogged(true);
          localStorage.setItem('accessToken', newAccessToken);

          const profileRes = await axios.get(
            `${process.env.NEXT_PUBLIC_WS_API_URL}/user/profile`,
            {
              headers: { Authorization: `Bearer ${newAccessToken}` },
              withCredentials: true,
            },
          );

          if (profileRes.status === 200) {
            setUsername(profileRes.data.username);
          } else {
            setUsername(undefined);
          }
        } else {
          setAccessToken(undefined);
          setIsLogged(false);
          setUsername(undefined);
        }
      } catch (error) {
        console.error('Erreur lors de l’authentification', error);
        setAccessToken(undefined);
        setIsLogged(false);
        setUsername(undefined);
      } finally {
        setLoading(false);
      }
    };

    authenticate();
  }, []);

  // Login
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: 'include',
        },
      );

      const data = await response.json();

      if (response.ok) {
        setIsLogged(true);
        setAccessToken(data.accessToken);
        setUsername(data.username);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('username', data.username);
      } else {
        setError(data.message || 'Erreur de connexion');
      }
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  // Register
  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password }),
          credentials: 'include',
        },
      );

      const data = await response.json();

      if (response.ok) {
        setIsLogged(true);
        setAccessToken(data.accessToken);
        setUsername(data.username);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('username', data.username);
      } else {
        setError(data.message || "Erreur d'inscription");
      }
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    } finally {
      setLoading(false);
    }
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
