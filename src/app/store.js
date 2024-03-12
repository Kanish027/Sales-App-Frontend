import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/products/productSlice";
import revenueReducer from "../features/revenue/revenueSlice";

// Configure Redux store with reducers
const store = configureStore({
  reducer: {
    auth: authReducer, // Include auth reducer for managing authentication state
    products: productReducer, // Include product reducer for managing product-related state
    revenue: revenueReducer, // Include revenue reducer for managing revenue-related state
  },
});

// Export the configured Redux store
export default store;
