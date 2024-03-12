import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import React from "react"; // Import React library for building UI components
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering React components to the DOM
import { Provider } from "react-redux"; // Provider component for Redux store
import { BrowserRouter as Router } from "react-router-dom"; // Router component for client-side routing
import App from "./App"; // Main application component
import store from "./app/store"; // Redux store configuration

// Create a root using ReactDOM.createRoot to enable concurrent mode
const root = ReactDOM.createRoot(document.getElementById("root"));
// Render the App component wrapped in a Router for client-side routing
root.render(
  <Provider store={store}>
    {/* Wrap the App component with Router for client-side routing */}
    <Router>
      {/* Render the main App component */}
      <App />
    </Router>
  </Provider>
);
