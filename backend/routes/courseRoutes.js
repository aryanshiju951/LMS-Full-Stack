import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";
import { createCourse, getCourses, updateCourse, deleteCourse } from "../controllers/courseController.js";

const router = Router();

router.use(protect);

router.get("/", getCourses);
router.post("/", allowRoles("admin", "instructor"), createCourse);
router.put("/:id", allowRoles("admin", "instructor"), updateCourse);
router.delete("/:id", allowRoles("admin", "instructor"), deleteCourse);

export default router;
