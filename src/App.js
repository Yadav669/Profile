import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./authenticate/Signin";
import Login from "./authenticate/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import Profile from "./pages/Profile/Profile";
import { AuthProvider } from "./authenticate/AuthProvider";
import Privateroute from "./authenticate/Privateroute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <Privateroute>
                <DashBoard />
              </Privateroute>
            }
          />
          <Route
            path="/Profile"
            element={
              <Privateroute>
                <Profile />
              </Privateroute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
