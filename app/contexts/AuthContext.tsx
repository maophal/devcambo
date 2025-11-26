"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  isPaid: boolean;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updatePaidStatus: (isPaid: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const isPaid = localStorage.getItem("isPaid") === "true";

    if (token && userId && userName) {
      setIsLoggedIn(true);
      setUser({ id: userId, name: userName, isPaid });
    }
    setLoading(false);
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user.id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("isPaid", String(user.isPaid));
    setIsLoggedIn(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isPaid");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updatePaidStatus = (isPaid: boolean) => {
    if (user) {
      const updatedUser = { ...user, isPaid };
      setUser(updatedUser);
      localStorage.setItem("isPaid", String(isPaid));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, loading, login, logout, updatePaidStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
