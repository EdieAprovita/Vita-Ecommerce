"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderControllers_1 = require("../controllers/orderControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Order Routes
router.post("/", authMiddleware_1.protect, orderControllers_1.addOrderItems);
router.get("/", authMiddleware_1.protect, authMiddleware_1.admin, orderControllers_1.getOrders);
router.get("/mine", authMiddleware_1.protect, orderControllers_1.getMyOrders);
router.get("/:id", authMiddleware_1.protect, orderControllers_1.getOrderById);
router.put("/:id/pay", authMiddleware_1.protect, orderControllers_1.updateOrderToPaid);
router.put("/:id/deliver", authMiddleware_1.protect, authMiddleware_1.admin, orderControllers_1.updateOrderToDelivered);
exports.default = router;
