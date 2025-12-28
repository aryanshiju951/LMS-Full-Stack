import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header>
        <div className="brand">
          <span className="brand-logo" />
          <h1>LMS Portal</h1>
        </div>

        {/* Desktop nav */}
        <div className="nav-links">
          <Link to="/courses">Courses</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
          {(user && (user.role === "instructor" || user.role === "admin")) && (
            <Link to="/add-course">Add Course</Link>
          )}
        </div>

        {/* Desktop actions */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="secondary">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="hamburger" onClick={() => setOpen(true)} aria-label="Open menu" role="button">
          <span></span><span></span><span></span>
        </div>
      </header>

      {/* Mobile sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)}>
        <div className="sidebar-links">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/courses" onClick={() => setOpen(false)}>Courses</Link>
          {user && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
          {(user && (user.role === "instructor" || user.role === "admin")) && (
            <Link to="/add-course" onClick={() => setOpen(false)}>Add Course</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          ) : (
            <button onClick={() => { setOpen(false); handleLogout(); }}>Logout</button>
          )}
        </div>
      </Sidebar>
    </>
  );
};

export default Navbar;
