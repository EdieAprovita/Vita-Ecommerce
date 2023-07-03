import express from "express";
import {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
} from "../controllers/authControllers";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Authentication Routes
router.post("/login", authUser);
router.get("/logout", logoutUser);

// Registration Route
router.post("/register", registerUser);

// User Profile Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin Routes
router.get("/admin/users", protect, admin, getUsers);
router.delete("/admin/users/:id", protect, admin, deleteUser);
router.get("/admin/users/:id", protect, admin, getUserById);
router.put("/admin/users/:id", protect, admin, updateUser);

export default router;
