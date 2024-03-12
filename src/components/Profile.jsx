import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Profile component displaying user information
const Profile = () => {
  // Accessing authentication state and user data from Redux store
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    // Container for the profile information
    <div className="container py-5">
      {/* Row for centering content */}
      <div className="row d-flex justify-content-center">
        {/* Column for user details */}
        <div className="col-lg-7">
          {/* Heading displaying the user's name */}
          <h1 className="fw-bold text-center my-2">
            Name:- {user && user.firstName} {user && user.lastName}
          </h1>
          {/* Subheading displaying the user's username/email */}
          <h5 className="fw-bold text-center my-2">
            Username:- {user && user.email}
          </h5>
        </div>
      </div>
    </div>
  );
};

// Export the Profile component as the default export
export default Profile;
