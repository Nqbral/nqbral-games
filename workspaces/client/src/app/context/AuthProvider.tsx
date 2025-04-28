'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type User = {
  username: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  isLogged: boolean | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    // Vérifie si un utilisateur est déjà connecté (par exemple via le localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogged(true);
      return;
    }

    setIsLogged(false);
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
        },
      );

      const data = await response.json();

      if (response.ok) {
        const { token, ...userData } = data;
        const user = { ...userData, token };

        setUser(user);
        setIsLogged(true);
        localStorage.setItem('user', JSON.stringify(user));
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
        },
      );

      const data = await response.json();

      if (response.ok) {
        const { token, ...userData } = data;
        const user = { ...userData, token };

        setUser(user);
        setIsLogged(true);
        localStorage.setItem('user', JSON.stringify(user)); // Sauvegarde l'utilisateur dans le localStorage
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
  const logout = () => {
    setUser(null);
    setIsLogged(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, loading, error, isLogged }}
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
