import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>LMS Portal</h1>
      <nav>
        <Link to="/courses">Courses</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {user.role === "instructor" || user.role === "admin" ? (
              <Link to="/add-course">Add Course</Link>
            ) : null}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
