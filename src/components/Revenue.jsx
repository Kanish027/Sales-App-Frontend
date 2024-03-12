import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Revenue component to display today's revenue
const Revenue = () => {
  // Accessing authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Accessing revenue data from Redux store
  const { revenue } = useSelector((state) => state.revenue);

  // Redirect to login if user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    // Container for the revenue information
    <div className="d-flex justify-content-center py-5">
      {/* Heading to display today's revenue */}
      <h2 className="fw-bold text-uppercase">
        Today's Revenue is {revenue && revenue ? revenue : 0}
      </h2>
    </div>
  );
};
// Export the Revenue component as the default export
export default Revenue;
