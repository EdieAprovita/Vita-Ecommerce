import asyncHandler from "../middleware/asyncHandler";
import { Response } from "express";
import { ObjectId } from "mongoose";
import { IReview, Request } from "../interfaces/IModels";

import Product from "../models/Product";

const productNotFoundError = (res: Response) => {
	res.status(404);
	throw new Error("Product not found");
};

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req: Request, res: Response) => {
	const pageSize = 10;
	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword as string,
					$options: "i",
				},
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));
	if (!products) {
		productNotFoundError(res);
	}
	res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

const getProductById = asyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);
	product ? res.status(200).json(product) : productNotFoundError(res);
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req: Request, res: Response) => {
	const { name, price, description, image, brand, category, countInStock } = req.body;
	const product = new Product({
		name,
		price,
		user: req.user?._id,
		image,
		brand,
		category,
		countInStock,
		numReviews: 0,
		description,
	});

	const createdProduct = await product.save();
	if (!createdProduct) {
		productNotFoundError(res);
	}
	res.status(201).json(createdProduct);
});

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
	const { name, price, description, image, brand, category, countInStock } = req.body;

	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			productNotFoundError(res);
		} else {
			Object.assign(product, {
				name,
				price,
				description,
				image,
				brand,
				category,
				countInStock,
			});

			const updatedProduct = await product.save();
			res.status(200).json(updatedProduct);
		}
	} catch (error) {
		res.status(500);
		throw new Error("An error occurred while updating the product");
	}
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.deleteOne();
		res.status(200).json({ message: "Product removed" });
	} else {
		productNotFoundError(res);
	}
});

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private

const createProductReview = asyncHandler(async (req: Request, res: Response) => {
	const { rating, comment } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		const alreadyReviewed = product.reviews.find(r => {
			const userId = req.user?._id?.toString() ?? "";
			return r.user && r.user.toString() === userId;
		});

		if (alreadyReviewed) {
			res.status(400);
			throw new Error("Product already reviewed");
		}

		const review: IReview = {
			username: req.user?.username ?? "",
			rating: Number(rating),
			comment,
			user: req.user?._id as ObjectId,
			timeStamp: {
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating =
			product.reviews.reduce((acc, item) => item.rating + acc, 0) /
			product.reviews.length;

		await product.save();
		res.status(201).json({ message: "Review added" });
	} else {
		productNotFoundError(res);
	}
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req: Request, res: Response) => {
	const products = await Product.find({}).sort({ rating: -1 }).limit(3);

	if (products) {
		res.status(200).json(products);
	} else {
		productNotFoundError(res);
	}
});

export {
	getProducts,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createProductReview,
	getTopProducts,
};
