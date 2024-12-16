import React, { createContext, useContext, useState } from "react";

// Create AuthContext
const AuthContext = createContext();

// Auth Provider to wrap the app
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for easy access to AuthContext
export const useAuth = () => useContext(AuthContext);
