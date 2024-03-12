import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../actions/User";

// Header component for navigation
const Header = () => {
  // State to manage the visibility of the offcanvas menu
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  // Accessing authentication state from Redux store
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Function to handle offcanvas menu item click and close the offcanvas
  const handleNavClick = () => {
    setShowOffcanvas(false);
  };

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    // Container for the entire header
    <div className="container-fluid ps-3 px-0 shadow-sm">
      {/* Render Navbar with offcanvas for small screens */}
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary py-1 mb-3"
        >
          {/* Container to hold the content of the Navbar */}
          <Container fluid>
            {/* Brand link to the home page */}
            <Link to={"/"} className="fw-bold fs-4 navbar-brand">
              Sales App
            </Link>
            {/* Navbar Toggle for offcanvas menu */}
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            />
            {/* Offcanvas menu */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={showOffcanvas}
              onHide={() => setShowOffcanvas(false)}
            >
              {/* Offcanvas header with a close button */}
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Sales App
                </Offcanvas.Title>
              </Offcanvas.Header>
              {/* Offcanvas body with navigation links */}
              <Offcanvas.Body className="fw-semibold">
                {/* Navigation links */}
                <Nav className="justify-content-end flex-grow-1 gap-1 pe-3">
                  <Link to={"/"} className="nav-link" onClick={handleNavClick}>
                    Add Sales
                  </Link>
                  <Link
                    to={"/topfivesales"}
                    className="nav-link"
                    onClick={handleNavClick}
                  >
                    Top 5 Sales
                  </Link>
                  <Link
                    to={"/revenue"}
                    className="nav-link"
                    onClick={handleNavClick}
                  >
                    Today's Total Revenue
                  </Link>
                  <Link
                    to={"/profile"}
                    className="nav-link"
                    onClick={handleNavClick}
                  >
                    Profile
                  </Link>
                  {/* Conditional rendering of logout or login link based on authentication status */}
                  {isAuthenticated ? (
                    <button className="nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <Link
                      to={"/login"}
                      className="nav-link"
                      onClick={handleNavClick}
                    >
                      Login
                    </Link>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

// Export the header component
export default Header;
