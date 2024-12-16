import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../authenticate/AuthProvider";

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isProfile, setIsProfile] = useState(false); // Toggles between Profile and Dashboard

  const handleLogout = () => {
    setIsAuthenticated(false); // Mark user as logged out
    navigate("/"); // Redirect to Signin
  };

  const toggleView = () => {
    setIsProfile((prev) => !prev);
    navigate(isProfile ? "/dashboard" : "/profile"); // Switch between Dashboard/Profile
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={isProfile ? "/profile" : "/dashboard"}
        >
          {isProfile ? "Profile" : "Dashboard"}
        </Link>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-light" onClick={toggleView}>
            {isProfile ? "Dashboard" : "Profile"}
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
