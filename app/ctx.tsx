import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: undefined as boolean | undefined,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string, profileUrl: string) => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  console.log("test");
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticating] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    // Simulasikan autentikasi selesai setelah beberapa waktu
    setTimeout(() => {
      setIsAuthenticating(false); // Atur isAuthenticated
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
    } catch (error) {}
  };
  const register = async (
    email: string,
    password: string,
    profileUrl: string
  ) => {
    try {
    } catch (error) {}
  };
  const logout = async () => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  console.log("auth");
  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return value;
};

export default AuthProvider;
