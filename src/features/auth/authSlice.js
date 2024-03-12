import { createSlice } from "@reduxjs/toolkit";

// Initial state for the authentication slice
const initialState = {
  isAuthenticated: false,
};

// Slice for handling authentication-related state
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer for handling login request
    loginUserRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    // Reducer for handling successful login
    loginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Reducer for handling login failure
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Reducer for handling registration request
    registerUserRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    // Reducer for handling successful registration
    registerUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Reducer for handling registration failure
    registerUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    // Reducer for handling logout request
    logoutUserRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = true;
    },
    // Reducer for handling successful logout
    logoutUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.message = action.payload;
    },
    // Reducer for handling logout failure
    logoutUserFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    },

    // Reducer for handling user profile request
    userProfileRequest: (state) => {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    // Reducer for handling successful user profile retrieval
    userProfileSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // Reducer for handling user profile retrieval failure
    userProfileFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

// Exporting actions for authentication
export const {
  loginUserRequest,
  loginUserSuccess,
  loginUserFailure,
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserFailure,
  userProfileRequest,
  userProfileSuccess,
  userProfileFailure,
} = authSlice.actions;

// Exporting the reducer function
export default authSlice.reducer;
