import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldMessage, setFieldMessage] = useState("");

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email ||!password){
      setFieldMessage('All Field Required')
    }
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    if (
      parsedUserData && email === parsedUserData.email && password === parsedUserData.password
    ) {
      console.log('login succesful');
      setErrorMessage('');
      navigate('/dashboard')
    } else{
      setErrorMessage("invalid Email or Password")
      alert('Invaild Email or Password');
    }
  };
  return (
   <>
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
                        name="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email or password with anyone else.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {errorMessage && (
                      <p className="text-danger text-center">{errorMessage}</p>
                    )}
                    {fieldMessage && (
                      <p className="text-danger text-center">{fieldMessage}</p>
                    )}
                    <button type="submit" className="btn btn-success w-100 bg-dark">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
