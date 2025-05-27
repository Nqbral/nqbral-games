'use client';

import axios from '@lib/axiosInstance';
import plainAxios from '@lib/plainAxios';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  username: string | undefined;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  resetError: () => void;
  resetMessage: () => void;
  loading: boolean;
  message: string | null;
  error: string | null;
  isLogged: boolean | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  const handleStorageChange = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    console.log('TEST local');
    setAccessToken(token);
  }, []);

  useEffect(() => {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event('localStorageUpdate');
      originalSetItem.apply(this, [key, value]);
      if (key === 'accessToken') window.dispatchEvent(event);
    };

    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  useEffect(() => {
    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, [handleStorageChange]);

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
          setAccessToken(null);
          setIsLogged(false);
          setUsername(undefined);
        }
      } catch (error) {
        console.error('Erreur lors de l’authentification', error);
        setAccessToken(null);
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

  // Forgot password
  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/auth/forgot-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
          credentials: 'include',
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(
          "Si l'adresse est enregistrée, un mail de réinitialisation a été envoyé.",
        );
      } else {
        setError(data.message || 'Erreur');
      }
    } catch (err) {
      console.log(err);
      setError('Erreur serveur');
    } finally {
      setLoading(false);
    }
  };

  // Forgot password
  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_WS_API_URL + '/auth/reset-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, password }),
          credentials: 'include',
        },
      );

      console.log(response.status);

      const data = await response.json();

      if (response.ok) {
        setMessage(
          'Votre mot de passe a bien été réinitialisé. Vous pouvez maintenant vous connecter.',
        );
      } else {
        setError(data.message || 'Erreur');
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
    setAccessToken(null);
    setIsLogged(false);
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
  };

  const resetMessage = () => {
    setMessage(null);
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
        resetMessage,
        forgotPassword,
        resetPassword,
        loading,
        message,
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
