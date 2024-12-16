import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./authenticate/signin"; // Renamed to match component name convention
import Login from "./authenticate/login";
import Dash from "./pages/dashboard/Dash"; // Renamed to match component name convention
import Profile from "./pages/profile/Profile"
import { AuthProvider }from "./authenticate/AuthProvider"
import  Privateroute  from "./authenticate/Privateroute";
// import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Signin />} />{" "}
          {/* Use components as JSX elements */}
          <Route path="/login" element={<Login />} />{" "}
          {/* Use components as JSX elements */}
          <Route
            path="/dashboard"
            element={
              <Privateroute>
                <Dash />
              </Privateroute>
            }
          />{" "}
          {/* Use components as JSX elements */}
          <Route
            path="/Profile"
            element={
              <Privateroute>
                <Profile />
              </Privateroute>
            }
          />{" "}
          {/* Use components as JSX elements */}
          <Route path="/Privateroute" element={<Privateroute />} />{" "}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
