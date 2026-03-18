import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );

  // ✅ NUEVO
  const [user, setUser] = useState(
    localStorage.getItem("user") || ""
  );

  const login = (username = "Usuario") => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("user", username);
    setUser(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setUser("");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);