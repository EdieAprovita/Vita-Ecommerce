import express from "express";
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
	updateOrderToDelivered,
} from "../controllers/orderControllers";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

// Order Routes
router.post("/", protect, addOrderItems);
router.get("/", protect, admin, getOrders);
router.get("/mine", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
