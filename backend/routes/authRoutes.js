import { Router } from "express";
import { login, registerUser, registerAdmin, registerInstructor } from "../controllers/authController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/register-instructor", registerInstructor); // instructor 
router.post("/register-admin", registerAdmin); // admin
router.post("/login", login);

export default router;
