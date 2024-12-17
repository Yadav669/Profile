import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"; // Import the custom Auth hook

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // Access the auth context

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Retrieve user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    // Validate credentials
    if (
      parsedUserData &&
      email === parsedUserData.email &&
      password === parsedUserData.password
    ) {
      console.log("Login successful");
      setErrorMessage("");
      setIsAuthenticated(true); // Mark the user as authenticated
      navigate("/"); // Redirect to the dashboard
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-dark w-100">
                    Login
                  </button>
                </form>
                <p className="mt-3 mb-1 text-center text-dark">
                  Don't have an account? Register now.
                </p>
                <button
                  className="btn btn-success w-100 mt-2"
                  onClick={() => navigate("/Signin")}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
