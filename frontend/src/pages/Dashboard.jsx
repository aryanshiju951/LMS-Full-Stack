import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container">
        <h1 className="page-title">Dashboard</h1>
        <p className="subtle">Please log in to view your dashboard.</p>
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
          <Link to="/login"><button>Login</button></Link>
          <Link to="/register"><button className="ghost">Register</button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">Welcome, {user.name}</h1>
      <p className="subtle">Role: {user.role}</p>

      <div className="courses-grid" style={{ marginTop: "1rem" }}>
        {user.role === "admin" && (
          <div className="card">
            <h2>Admin panel</h2>
            <p>Manage all courses and oversee instructors.</p>
            <Link to="/courses"><button>Manage Courses</button></Link>
          </div>
        )}

        {(user.role === "instructor" || user.role === "admin") && (
          <div className="card">
            <h2>Create a new course</h2>
            <p>Design and publish your content.</p>
            <Link to="/add-course"><button>Add Course</button></Link>
          </div>
        )}

        <div className="card">
          <h2>Browse courses</h2>
          <p>Explore available content.</p>
          <Link to="/courses"><button className="ghost">View Courses</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
