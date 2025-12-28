# 📚 Capstone Project – LMS 

This project is a **Learning Management System (LMS)** style application built as a final capstone.  
It demonstrates **authentication, role-based access control, and full CRUD functionality** with a responsive frontend and secure backend.

---

## 🚀 Features

### 🔐 Authentication
- User registration & login with JWT.
- Secure password hashing using **bcrypt**.
- Token stored in localStorage (frontend) with auto-logout on expiry.

### 🎭 Role Handling
- **Student**: can view published courses.
- **Instructor**: can create, edit, delete their own courses (auto-published).
- **Admin**: can create, edit, delete **any** course; full visibility.

### 📦 CRUD Module (Courses)
- Create, Read, Update, Delete courses.
- Courses have `title`, `description`, `isPublished`, `createdBy`.
- Students see only published courses.
- Instructors/Admins auto-publish courses when created.

### 🖥️ Frontend (React + Vite)
- Responsive UI (mobile, tablet, desktop).
- Mobile hamburger menu → sidebar with vertical links.
- Role-based dashboards:
  - Student: browse courses.
  - Instructor: manage own courses + add new.
  - Admin: manage all courses + oversee instructors.
- Error handling & validation in forms.

### ⚙️ Backend (Node + Express + MongoDB)
- REST APIs for auth and courses.
- Role-based middleware for access control.
- Validation with **Joi**.
- Security: Helmet, CORS, rate limiting, error handling.

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- React Router DOM
- Axios
- Vite

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- Helmet, CORS, Morgan

---

## 📂 Project Structure

```
├── backend
│   ├── models
│   │   ├── User.js
│   │   └── Course.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── courseController.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── courseRoutes.js
│   ├── config/db.js
│   ├── app.js
│   └── server.js
│
├── frontend
│   ├── src
│   │   ├── api/http.js
│   │   ├── context/AuthContext.jsx
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseForm.jsx
│   │   │   └── CourseDetail.jsx
│   │   ├── routes/AppRoutes.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── App.css
```

---

## ⚡ Setup Instructions

### Backend
```bash
cd backend
npm install
node server.js
```
### Environment setup:
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

---
