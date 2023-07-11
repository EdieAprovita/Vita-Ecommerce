import asyncHandler from "../middleware/asyncHandler";
import { Response } from "express";
import { Request, IOrder } from "../interfaces/IModels";
import { Types } from "mongoose";

import Order from "../models/Order";

const orderNotFoundError = (res: Response) => {
	res.status(404);
	throw new Error("Order not found");
};

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	} = req.body;

	if (!req.user?._id) {
		res.status(401);
		throw new Error("Not authorized, no user found");
	}

	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
	}

	if (
		!shippingAddress ||
		!paymentMethod ||
		!itemsPrice ||
		!shippingPrice ||
		!taxPrice ||
		!totalPrice
	) {
		res.status(400);
		throw new Error("Missing order data");
	}

	const mappedOrderItems: IOrder["orderItems"] = orderItems.map(
		(item: Types.ObjectId) => ({
			product: item,
		})
	);

	const order = new Order({
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

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({ user: req.user?._id });
	if (!orders) {
		orderNotFoundError(res);
	}
	res.json(orders);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
	const order = await Order.findById(req.params.id).populate("user", "name email");
	order ? res.status(200).json(order) : orderNotFoundError(res);
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
	const order = await Order.findOneAndUpdate(
		{ _id: req.params.id },
		{
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
		},
		{ new: true }
	);
	order ? res.status(200).json(order) : orderNotFoundError(res);
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin

const updateOrderToDelivered = asyncHandler(async (req: Request, res: Response) => {
	const order = await Order.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				isDelivered: true,
				deliveredAt: new Date(),
			},
		},
		{ new: true }
	);
	order ? res.status(200).json(order) : orderNotFoundError(res);
});

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin

const getOrders = asyncHandler(async (req: Request, res: Response) => {
	const orders = await Order.find({}).populate("user", "id name");
	if (!orders) {
		orderNotFoundError(res);
	}
	res.status(200).json(orders);
});

export {
	addOrderItems,
	getMyOrders,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getOrders,
};
