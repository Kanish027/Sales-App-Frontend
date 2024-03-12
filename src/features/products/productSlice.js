import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the product slice
const initialState = {};

// Create product slice using createSlice method
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reducer for adding a product request
    addProductRequest: (state) => {
      state.isLoading = true;
    },
    // Reducer for successful product addition
    addProductSuccess: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    // Reducer for failed product addition
    addProductFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Reducer for requesting all products
    getAllProductsRequest: (state) => {
      state.isLoading = true;
    },
    // Reducer for successful retrieval of all products
    getAllProductsSuccess: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    },
    // Reducer for failed retrieval of all products
    getAllProductsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Export actions generated by product slice
export const {
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
} = productSlice.actions;

// Export the product reducer
export default productSlice.reducer;