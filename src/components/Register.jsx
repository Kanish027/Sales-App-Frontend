import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { registerUser, userProfile } from "../actions/User";
import get24HrsRevenue from "../actions/Revenue";

// Register component for user registration
const Register = () => {
  // State variables to manage user registration data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux dispatch function
  const dispatch = useDispatch();

  // Accessing authentication state from Redux store
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);

  // Function to handle user registration
  const handleRegister = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Dispatching registerUser action to register user
    await dispatch(registerUser(firstName, lastName, email, password));
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
    // Container for the registration form
    <div className="container">
      {/* Row for centering content */}
      <div className="row d-flex justify-content-center my-5">
        {/* Column for the registration card */}
        <div className="col-lg-6 shadow-sm card rounded-1 py-4">
          {/* Heading for the registration form */}
          <h2 className="text-center fw-bold text-uppercase">Sign Up</h2>
          {/* Card body containing the registration form */}
          <div className="card-body">
            {/* Form for user registration */}
            <form onSubmit={handleRegister}>
              {/* Input field for first name */}
              <div className="mb-3">
                <label htmlFor="fname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              {/* Input field for last name */}
              <div className="mb-3">
                <label htmlFor="lname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              {/* Input field for email */}
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
              {/* Input field for password */}
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
              {/* Button for registration */}
              <div className="d-grid my-3">
                <button className="btn btn-dark" disabled={isLoading}>
                  Register
                </button>
              </div>
              {/* Link to login page */}
              <div>
                <span className="text-secondary fw-light">
                  Already have an account?
                </span>{" "}
                <Link to={"/login"} className="text-decoration-none text-dark">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Register component as the default export
export default Register;
