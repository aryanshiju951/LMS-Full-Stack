import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container">
        <h1>Dashboard</h1>
        <p>Please log in to view your dashboard.</p>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Welcome, {user.name}</h1>
      <p>Role: {user.role}</p>

      <div className="courses-grid">
        {user.role === "admin" && (
          <div className="course-card">
            <h2>Admin Panel</h2>
            <p>Manage users and courses.</p>
            <Link to="/courses"><button>Go to Courses</button></Link>
          </div>
        )}

        {(user.role === "instructor" || user.role === "admin") && (
          <div className="course-card">
            <h2>Create a New Course</h2>
            <p>Design and publish your courses.</p>
            <Link to="/add-course"><button>Add Course</button></Link>
          </div>
        )}

        {user.role === "student" && (
          <div className="course-card">
            <h2>My Courses</h2>
            <p>View and continue your enrolled courses.</p>
            <Link to="/courses"><button>View Courses</button></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
