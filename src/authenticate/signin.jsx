import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Save user data to localStorage
    localStorage.setItem("userData", JSON.stringify({name, email, password }));
    console.log("User registered successfully!");

    // Redirect to login page after successful registration
    navigate("/Login");
  };

  return (
    <div className="signin">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Register</h2>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="name"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your Name"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="off"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-danger text-center">{errorMessage}</p>
                  )}
                  <button type="submit" className="btn btn-success w-100">
                    Register
                  </button>
                </form>
                <p className="mt-3 text-center text-dark">
                  Already have an account? Login now.
                </p>
                <button
                  className="btn btn-dark w-100 mt-2"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
