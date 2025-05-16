import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getData, storeData, removeData } from "@/utlis/storage";

type AuthContextType = {
  user: any;
  setUser: (user: any) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<any>(null);

  const setUser = (user: any) => {
    setUserState(user);
    storeData("user", user);
  };

  const logout = () => {
    setUserState(null);
    removeData("user");
  };

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await getData("user");
      if (savedUser) setUserState(savedUser);
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
