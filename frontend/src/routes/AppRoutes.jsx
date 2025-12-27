import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Courses from "../pages/Courses.jsx";
import CourseForm from "../pages/CourseForm.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Navbar from "../components/Navbar.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Default route goes to Register for new users */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/courses" element={<Courses />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-course"
          element={
            <ProtectedRoute roles={["admin", "instructor"]}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
