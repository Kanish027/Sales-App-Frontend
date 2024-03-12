import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userProfile } from "../actions/User";
import get24HrsRevenue from "../actions/Revenue";

// Login component for user authentication
const Login = () => {
  // State variables to manage email and password input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Accessing authentication state from Redux store
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Function to handle user login
  const handleLogin = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Dispatching loginUser action to authenticate user
    await dispatch(loginUser(email, password));
    // Dispatching userProfile action to fetch user profile data
    await dispatch(userProfile());
    // Dispatching get24HrsRevenue action to fetch revenue data
    dispatch(get24HrsRevenue());
  };

  // Redirect to home if user is already authenticated
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    // Container for the login form
    <div className="container">
      {/* Row for centering content */}
      <div className="row d-flex justify-content-center my-5">
        {/* Card for the login form */}
        <div className="col-lg-6 shadow-sm card rounded-1 py-4">
          {/* Title for the login form */}
          <h2 className="text-center fw-bold text-uppercase">Login</h2>
          {/* Card body containing the login form */}
          <div className="card-body">
            {/* Form for user login */}
            <form onSubmit={handleLogin}>
              {/* Email input field */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {/* Password input field */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {/* Checkbox for remembering login */}
              <div className="mb-2 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="rememberme"
                    className="form-check-input"
                    value={""}
                  />
                  <label htmlFor="rememberme" className="form-label">
                    Remember me
                  </label>
                </div>
                {/* Forgot password link */}
                <div>
                  <a
                    href="/"
                    className="link fw-semibold fs-6 text-decoration-none text-dark"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              {/* Login button */}
              <div className="d-grid gap-2 mb-3">
                <button className="btn btn-dark" disabled={isLoading}>
                  {isLoading ? "Logging" : "Login"}
                </button>
              </div>
              {/* Sign up link */}
              <div>
                <span className="text-secondary fw-light">
                  Don't have an account yet?
                </span>{" "}
                <Link
                  to={"/register"}
                  className="text-decoration-none text-dark"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Login component as the default export
export default Login;
