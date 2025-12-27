import React, { useState } from "react";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

const CourseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await http.post("/courses", formData);
      navigate("/courses");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to save course");
    }
  };

  return (
    <div className="container">
      <h1>Create Course</h1>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Save Course</button>
      </form>
    </div>
  );
};

export default CourseForm;
