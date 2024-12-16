import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Adjust the path as necessary

const Privateroute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Privateroute;
