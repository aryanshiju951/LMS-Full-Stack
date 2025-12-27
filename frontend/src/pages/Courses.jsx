import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useAuth } from "../context/AuthContext";

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const { data } = await http.get("/courses");
      setCourses(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1>Courses</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {user && (user.role === "admin" || user.role === "instructor") ? (
              <button>Edit</button>
            ) : (
              <button>View</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
