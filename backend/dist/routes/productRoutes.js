"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Product Routes
router.get("/", productControllers_1.getProducts);
router.get("/top", productControllers_1.getTopProducts);
router.get("/:id", productControllers_1.getProductById);
router.post("/create", authMiddleware_1.protect, authMiddleware_1.admin, productControllers_1.createProduct);
router.put("/update/:id", authMiddleware_1.protect, authMiddleware_1.admin, productControllers_1.updateProduct);
router.post("/:id/reviews", authMiddleware_1.protect, productControllers_1.createProductReview);
router.delete("/delete/:id", authMiddleware_1.protect, authMiddleware_1.admin, productControllers_1.deleteProduct);
exports.default = router;
