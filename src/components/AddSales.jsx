import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { addProducts } from "../actions/Products";
import get24HrsRevenue from "../actions/Revenue";

// Functional component for adding sales entries
const AddSales = () => {
  // Fetching isAuthenticated status and revenue from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { revenue } = useSelector((state) => state.revenue);

  // Accessing isLoading from Redux store
  const { isLoading } = useSelector((state) => state.products);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // State variables for input fields
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");

  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // Function to handle adding a product with sales information
  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Dispatching action to add product with sales info
    await dispatch(addProducts(productName, quantity, amount));
    // Dispatching action to fetch updated revenue for the last 24 hours
    dispatch(get24HrsRevenue());
    setProductName("");
    setQuantity("");
    setAmount("");
  };

  return (
    <div className="container">
      {/* Displaying revenue */}
      <div className="text-end fw-semibold">
        Revenue: {revenue && revenue ? revenue : 0}
      </div>
      <div className="row d-flex justify-content-center my-5">
        {/* Card for a clean and organized layout */}
        <div className="col-lg-6 shadow-sm card rounded-1 py-4">
          <h2 className="text-center fw-bold text-uppercase">Add Sale Entry</h2>
          <div className="card-body">
            <form onSubmit={handleAddProduct}>
              {/* Form for entering product details */}
              <div className="mb-3">
                <label htmlFor="product" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                />
              </div>
              {/* Form field for quantity */}
              <div className="mb-3">
                <label htmlFor="product" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                />
              </div>
              {/* Form field for sale amount */}
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                />
              </div>
              {/* Button to submit the sales entry */}
              <div className="d-grid mt-3">
                <button className="btn btn-dark" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the AddSales component as the default export
export default AddSales;
