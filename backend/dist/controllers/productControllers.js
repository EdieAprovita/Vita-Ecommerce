"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const Product_1 = __importDefault(require("../models/Product"));
const productNotFoundError = (res) => {
    res.status(404);
    throw new Error("Product not found");
};
// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (0, asyncHandler_1.default)(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: "i",
            },
        }
        : {};
    const count = await Product_1.default.countDocuments({ ...keyword });
    const products = await Product_1.default.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    if (!products) {
        productNotFoundError(res);
    }
    res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});
exports.getProducts = getProducts;
// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = (0, asyncHandler_1.default)(async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    product ? res.status(200).json(product) : productNotFoundError(res);
});
exports.getProductById = getProductById;
// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = new Product_1.default({
        name,
        price,
        user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
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
exports.createProduct = createProduct;
// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = (0, asyncHandler_1.default)(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    try {
        const product = await Product_1.default.findById(req.params.id);
        if (!product) {
            productNotFoundError(res);
        }
        else {
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
    }
    catch (error) {
        res.status(500);
        throw new Error("An error occurred while updating the product");
    }
});
exports.updateProduct = updateProduct;
// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = (0, asyncHandler_1.default)(async (req, res) => {
    const product = await Product_1.default.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.status(200).json({ message: "Product removed" });
    }
    else {
        productNotFoundError(res);
    }
});
exports.deleteProduct = deleteProduct;
// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = (0, asyncHandler_1.default)(async (req, res) => {
    var _a, _b, _c;
    const { rating, comment } = req.body;
    const product = await Product_1.default.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(r => {
            var _a, _b, _c;
            const userId = (_c = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : "";
            return r.user && r.user.toString() === userId;
        });
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }
        const review = {
            username: (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : "",
            rating: Number(rating),
            comment,
            user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
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
    }
    else {
        productNotFoundError(res);
    }
});
exports.createProductReview = createProductReview;
// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = (0, asyncHandler_1.default)(async (req, res) => {
    const products = await Product_1.default.find({}).sort({ rating: -1 }).limit(3);
    if (products) {
        res.status(200).json(products);
    }
    else {
        productNotFoundError(res);
    }
});
exports.getTopProducts = getTopProducts;
