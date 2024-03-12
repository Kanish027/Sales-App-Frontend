import axios from "axios"; // Import axios for making HTTP requests
import {
  addProductFailure,
  addProductRequest,
  addProductSuccess,
  getAllProductsFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
} from "../features/products/productSlice"; // Import Redux actions from productSlice
import { server } from "../App"; // Import server URL from main App component
import toast from "react-hot-toast"; // Import toast notification library for displaying messages

// Action creator for adding a new product
const addProducts = (productName, quantity, amount) => async (dispatch) => {
  try {
    // Dispatch action to indicate request start
    dispatch(addProductRequest());

    // Make POST request to add new product
    const { data } = await axios.post(
      `${server}/api/v1/product/new`, // API endpoint for adding new product
      {
        productName: productName, // Product name
        quantity: quantity, // Quantity
        saleAmount: amount, // Sale amount
      },
      {
        headers: {
          "Content-Type": "application/json", // Set request content type
        },
        withCredentials: true, // Include credentials in request
      }
    );
    // Dispatch action for successful product addition
    dispatch(addProductSuccess(data.message));
    // Display success message as toast notification
    toast.success(data.message);
  } catch (error) {
    // Dispatch action for product addition failure
    dispatch(addProductFailure(error.response.data.message));
    // Display error message as toast notification
    toast.error(error.response.data.message);
  }
};

// Action creator for fetching all products
const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest()); // Dispatch action to indicate request start

    // Make GET request to fetch all products
    const { data } = await axios.get(`${server}/api/v1/product/all`, {
      withCredentials: true, // Include credentials in request
    });

    // Dispatch action for successful retrieval of all products
    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    // Dispatch action for failure in fetching all products
    dispatch(getAllProductsFailure(error.response.data.message));
  }
};

// Export action creators for adding a new product and fetching all products
export { addProducts, getAllProducts };
