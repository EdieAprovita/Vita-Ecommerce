"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.updateOrderToDelivered = exports.updateOrderToPaid = exports.getOrderById = exports.getMyOrders = exports.addOrderItems = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const Order_1 = __importDefault(require("../models/Order"));
const orderNotFoundError = (res) => {
    res.status(404);
    throw new Error("Order not found");
};
// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice, } = req.body;
    if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
        res.status(401);
        throw new Error("Not authorized, no user found");
    }
    if (!orderItems || orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
    }
    if (!shippingAddress ||
        !paymentMethod ||
        !itemsPrice ||
        !shippingPrice ||
        !taxPrice ||
        !totalPrice) {
        res.status(400);
        throw new Error("Missing order data");
    }
    const mappedOrderItems = orderItems.map((item) => ({
        product: item,
    }));
    const order = new Order_1.default({
        orderItems: mappedOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    });
    const createdOrder = await order.save();
    if (!createdOrder) {
        res.status(500);
        throw new Error("Failed to create order");
    }
    res.status(201).json(createdOrder);
});
exports.addOrderItems = addOrderItems;
// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const orders = await Order_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!orders) {
        orderNotFoundError(res);
    }
    res.json(orders);
});
exports.getMyOrders = getMyOrders;
// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = (0, asyncHandler_1.default)(async (req, res) => {
    const order = await Order_1.default.findById(req.params.id).populate("user", "name email");
    order ? res.status(200).json(order) : orderNotFoundError(res);
});
exports.getOrderById = getOrderById;
// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = (0, asyncHandler_1.default)(async (req, res) => {
    const order = await Order_1.default.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            isPaid: true,
            paidAt: new Date(),
            paymentResult: {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            },
        },
    }, { new: true });
    order ? res.status(200).json(order) : orderNotFoundError(res);
});
exports.updateOrderToPaid = updateOrderToPaid;
// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = (0, asyncHandler_1.default)(async (req, res) => {
    const order = await Order_1.default.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            isDelivered: true,
            deliveredAt: new Date(),
        },
    }, { new: true });
    order ? res.status(200).json(order) : orderNotFoundError(res);
});
exports.updateOrderToDelivered = updateOrderToDelivered;
// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = (0, asyncHandler_1.default)(async (req, res) => {
    const orders = await Order_1.default.find({}).populate("user", "id name");
    if (!orders) {
        orderNotFoundError(res);
    }
    res.status(200).json(orders);
});
exports.getOrders = getOrders;
