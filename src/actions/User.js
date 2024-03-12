import { server } from "../App"; // Import server URL from main application file
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  logoutUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
  userProfileFailure,
  userProfileRequest,
  userProfileSuccess,
} from "../features/auth/authSlice"; // Import actions from authentication slice
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-hot-toast"; // Import toast component for displaying notifications

// Function to handle user login
const loginUser = (email, password) => async (dispatch) => {
  try {
    // Dispatch action to indicate login request initiation
    dispatch(loginUserRequest());

    // Send POST request to server API to perform user login
    const { data } = await axios.post(
      `${server}/api/v1/user/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials in request
      }
    );

    // Dispatch action with success message upon successful login
    dispatch(loginUserSuccess(data.message));
    // Display success message using toast notification
    toast.success(data.message);
  } catch (error) {
    // Dispatch action for login failure and display error message
    dispatch(loginUserFailure(error.response.data.message));
    // Display error message using toast notification
    toast.error(error.response.data.message);
  }
};

// Function to handle user registration
const registerUser =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch(registerUserRequest()); // Dispatch action to indicate registration request initiation

      // Send POST request to server API to register new user
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include credentials in request
        }
      );
      // Dispatch action with success message upon successful registration
      dispatch(registerUserSuccess(data.message));
      // Display success message using toast notification
      toast.success(data.message);
    } catch (error) {
      // Dispatch action for registration failure and display error message
      dispatch(registerUserFailure(error.response.data.message));
      // Display error message using toast notification
      toast.error(error.response.data.message);
    }
  };

// Function to handle user logout
const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logoutUserRequest()); // Dispatch action to indicate logout request initiation

    // Send GET request to server API to perform user logout
    const { data } = await axios.get(`${server}/api/v1/user/logout`, {
      withCredentials: true, // Include credentials in request
    });

    // Dispatch action with success message upon successful logout
    dispatch(logoutUserSuccess(data.message));
    // Display success message using toast notification
    toast.success(data.message);
  } catch (error) {
    // Dispatch action for logout failure and display error message
    dispatch(logoutUserFailure(error.response.data.message));
    // Display error message using toast notification
    toast.error(error.response.data.message);
  }
};

// Function to fetch user profile
const userProfile = () => async (dispatch) => {
  try {
    dispatch(userProfileRequest()); // Dispatch action to indicate user profile request initiation

    // Send GET request to server API to fetch user profile data
    const { data } = await axios.get(`${server}/api/v1/user/profile`, {
      withCredentials: true,
    });

    // Dispatch action with user profile data upon successful retrieval
    dispatch(userProfileSuccess(data.user));
  } catch (error) {
    // Dispatch action for user profile retrieval failure
    dispatch(userProfileFailure(error.response.data.message));
  }
};

// Export functions to handle user login, registration, logout, and profile retrieval
export { loginUser, userProfile, registerUser, logoutUser };
