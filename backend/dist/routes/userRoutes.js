"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Authentication Routes
router.post("/login", authControllers_1.authUser);
router.get("/logout", authControllers_1.logoutUser);
// Registration Route
router.post("/register", authControllers_1.registerUser);
// User Profile Routes
router.get("/profile", authMiddleware_1.protect, authControllers_1.getUserProfile);
router.put("/profile/update", authMiddleware_1.protect, authControllers_1.updateUserProfile);
// Admin Routes
router.get("/admin/users", authMiddleware_1.protect, authMiddleware_1.admin, authControllers_1.getUsers);
router.delete("/admin/users/delete/:id", authMiddleware_1.protect, authMiddleware_1.admin, authControllers_1.deleteUser);
router.get("/admin/users/:id", authMiddleware_1.protect, authMiddleware_1.admin, authControllers_1.getUserById);
router.put("/admin/users/update/:id", authMiddleware_1.protect, authMiddleware_1.admin, authControllers_1.updateUser);
exports.default = router;
