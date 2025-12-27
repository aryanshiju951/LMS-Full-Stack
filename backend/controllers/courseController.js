import Course from "../models/Course.js";

// Create Course (admin or instructor)
export const createCourse = async (req, res) => {
  try {
    const { title, description, isPublished } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({ message: "Title is required (min 3 chars)" });
    }

    const course = await Course.create({
      title: title.trim(),
      description: description?.trim(),
      isPublished: !!isPublished,
      createdBy: req.user.id
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Courses
// - Admin: all courses
// - Instructor: only their courses
// - Student: only published courses
export const getCourses = async (req, res) => {
  try {
    const role = req.user.role;

    let query = {};
    if (role === "admin") query = {};
    else if (role === "instructor") query = { createdBy: req.user.id };
    else if (role === "student") query = { isPublished: true };

    const courses = await Course.find(query).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update Course (owner or admin)
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (role !== "admin" && String(course.createdBy) !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: you do not own this course" });
    }

    const fields = ["title", "description", "isPublished"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        course[f] = f === "title" || f === "description" ? req.body[f].trim() : req.body[f];
      }
    });

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete Course (owner or admin)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const role = req.user.role;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (role !== "admin" && String(course.createdBy) !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: you do not own this course" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
