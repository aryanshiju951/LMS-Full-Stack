import React, { useEffect, useState } from "react";
import http from "../api/http";
import { useNavigate, useParams } from "react-router-dom";

const CourseForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOne = async () => {
      if (!id) return;
      try {
        const { data } = await http.get(`/courses/${id}`);
        setForm({ title: data.title, description: data.description });
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load course");
      }
    };
    fetchOne();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description) return setError("Title and description are required");
    try {
      if (id) {
        await http.put(`/courses/${id}`, form);
      } else {
        await http.post("/courses", form);
      }
      navigate("/courses");
    } catch (err) {
      setError(err?.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">{id ? "Edit course" : "Create course"}</h1>
      <p className="subtle">{id ? "Update your course details." : "Publish a new course."}</p>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Course title" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Course description" rows={6} value={form.description} onChange={handleChange} />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">{id ? "Update" : "Save"}</button>
          <button type="button" className="ghost" onClick={() => navigate("/courses")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
