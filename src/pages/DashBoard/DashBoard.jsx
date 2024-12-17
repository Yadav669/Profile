import React from "react";
import Navbar from "../../components/header/Navbar";

const DashBoard = () => {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Welcome to the Dashboard!</h1>
        <p>This is the main area where dashboard content will go.</p>
      </div>
    </>
  );
};

export default DashBoard;
