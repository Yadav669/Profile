import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

       if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Store user data in localStorage
    const userData = {
      name,
      email,
      password,
    };
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User data stored in localStorage:", userData);

    // Clear input fields
    setName("");
    setEmail("");
    setPassword("");
    setErrorMessage("");


    // Redirect to the login page
    navigate("/login");
  };

  return (
    <>
      <div className="sign">
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Register</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name} // Bind value to state
                        placeholder="Enter Name"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
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
                        value={email} // Bind value to state
                        placeholder="Enter Email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password} // Bind value to state
                        placeholder="Enter Password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-success w-100 bg-dark"
                    >
                      Register
                    </button>
                  </form>
                  <p className="mt-3 mb-1 text-center text-dark">
                    Already have an account?
                  </p>
                  <Link to="/login" className="btn btn-success mt-1 w-100 bg-dark">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
