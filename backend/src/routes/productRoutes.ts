import express from "express";
import {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
} from "../controllers/productControllers";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Product Routes
router.get("/", getProducts);
router.get("/top", getTopProducts);
router.get("/:id", getProductById);
router.post("/create", protect, admin, createProduct);
router.put("/update/:id", protect, admin, updateProduct);
router.post("/:id/reviews", protect, createProductReview);
router.delete("/delete/:id", protect, admin, deleteProduct);

export default router;
