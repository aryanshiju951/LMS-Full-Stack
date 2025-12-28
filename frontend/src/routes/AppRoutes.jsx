import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Courses from "../pages/Courses.jsx";
import CourseForm from "../pages/CourseForm.jsx";

const AppRoutes = () => (
  <Router>
    <div className="app-shell">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-course"
            element={
              <ProtectedRoute roles={["instructor", "admin"]}>
                <CourseForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-course/:id"
            element={
              <ProtectedRoute roles={["instructor", "admin"]}>
                <CourseForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  </Router>
);

export default AppRoutes;
