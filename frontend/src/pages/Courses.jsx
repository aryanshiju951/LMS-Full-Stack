import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await http.get("/courses");
      setCourses(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load courses");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h1 className="page-title">Courses</h1>
      <p className="subtle">All available courses.</p>
      {error && <p className="error">{error}</p>}

      <div className="courses-grid" style={{ marginTop: "1rem" }}>
        {courses.map((c) => (
          <div key={c._id} className="card">
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            {(user && (user.role === "admin" || user.role === "instructor")) ? (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => navigate(`/edit-course/${c._id}`)}>Edit</button>
                <button className="danger" onClick={async () => {
                  try {
                    await http.delete(`/courses/${c._id}`);
                    load();
                  } catch (err) {
                    setError(err?.response?.data?.message || "Delete failed");
                  }
                }}>Delete</button>
              </div>
            ) : (
              <button onClick={() => navigate(`/course/${c._id}`)}>View</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
