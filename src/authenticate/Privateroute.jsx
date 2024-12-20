import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const Privateroute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/Login" />;
};

export default Privateroute;
