// Import necessary components from your application
import { useEffect } from "react"; // Hook for handling side effects in functional components
import { Toaster } from "react-hot-toast"; // Component for displaying toast notifications
import { useDispatch } from "react-redux"; // Hook for dispatching Redux actions
import { Route, Routes } from "react-router-dom"; // Components for routing
import get24HrsRevenue from "./actions/Revenue"; // Action for fetching 24-hour revenue data
import { userProfile } from "./actions/User"; // Action for fetching user profile data
import AddSales from "./components/AddSales"; // Component for adding sales
import Header from "./components/Header"; // Header component for navigation
import Login from "./components/Login"; // Component for user login
import Profile from "./components/Profile"; // Component for user profile
import Register from "./components/Register"; // Component for user registration
import Revenue from "./components/Revenue"; // Component for displaying revenue
import TopFiveSales from "./components/TopFiveSales"; // Component for displaying top five sales

// Server URL for backend API
// export const server = "https://sales-app-backend-1.onrender.com";
export const server = "http://localhost:5000";

// Main App component
function App() {
  // Redux dispatch function
  const dispatch = useDispatch();

  // useEffect hook to dispatch actions when component mounts
  useEffect(() => {
    dispatch(userProfile()); // Fetch user profile data
    dispatch(get24HrsRevenue()); // Fetch 24-hour revenue data
  }, [dispatch]); // Dependency array ensures useEffect runs only once on mount

  return (
    <div>
      {/* Include the Header component for consistent navigation */}
      <Header />
      {/* Define the routing structure using React Router */}
      <Routes>
        {/* Route for the default home page, rendering the AddSales component */}
        <Route path="/" element={<AddSales />} />
        {/* Route for displaying the top five sales */}
        <Route path="/topfivesales" element={<TopFiveSales />} />
        {/* Route for showing today's revenue */}
        <Route path="/revenue" element={<Revenue />} />
        {/* Route for user login */}
        <Route path="/login" element={<Login />} />
        {/* Route for user registration */}
        <Route path="/register" element={<Register />} />
        {/* Route for user profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Page not found 404</h1>} />
      </Routes>
      <Toaster />
    </div>
  );
}

// Export the App component as the default export
export default App;
