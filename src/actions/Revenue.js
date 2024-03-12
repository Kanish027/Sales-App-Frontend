import axios from "axios"; // Import axios for making HTTP requests
import {
  get24hrsRevenueFailure,
  get24hrsRevenueRequest,
  get24hrsRevenueSuccess,
} from "../features/revenue/revenueSlice"; // Import actions from revenue slice
import { server } from "../App"; // Import server URL from main application file

// Async function to fetch 24-hour revenue data
const get24HrsRevenue = () => async (dispatch) => {
  try {
    // Dispatch action to indicate revenue request initiation
    dispatch(get24hrsRevenueRequest());

    // Send GET request to server API to fetch 24-hour revenue data
    const { data } = await axios.get(`${server}/api/v1/product/revenue`, {
      withCredentials: true, // Include credentials in request
    });

    // Dispatch action with retrieved total revenue data upon success
    dispatch(get24hrsRevenueSuccess(data.totalRevenue));
  } catch (error) {
    // Dispatch action for failure in fetching 24-hour revenue data
    dispatch(get24hrsRevenueFailure());
  }
};

// Export the function to fetch 24-hour revenue data
export default get24HrsRevenue;
