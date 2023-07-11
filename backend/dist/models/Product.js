"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const mongoose_1 = __importStar(require("mongoose"));
const reviewSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name".bg_cyan],
        unique: true,
    },
    rating: {
        type: Number,
        required: [true, "Please provide a rating".bg_cyan],
        default: 0,
    },
    comment: {
        type: String,
        required: [true, "Please provide a comment".bg_cyan],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.createdAt = (0, date_fns_1.format)(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
            ret.updatedAt = (0, date_fns_1.format)(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
            return ret;
        },
    },
});
const productSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Please provide a name".bg_cyan],
    },
    image: {
        type: String,
        required: [true, "Please provide an image".bg_cyan],
    },
    brand: {
        type: String,
        required: [true, "Please provide a brand".bg_cyan],
    },
    category: {
        type: String,
        required: [true, "Please provide a category".bg_cyan],
    },
    description: {
        type: String,
        required: [true, "Please provide a description".bg_cyan],
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: [true, "Please provide a rating".bg_cyan],
        default: 0,
    },
    numReviews: {
        type: Number,
        required: [true, "Please provide a number of reviews".bg_cyan],
        default: 0,
    },
    price: {
        type: Number,
        required: [true, "Please provide a price".bg_cyan],
        default: 0,
    },
    countInStock: {
        type: Number,
        required: [true, "Please provide a count in stock".bg_cyan],
        default: 0,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.createdAt = (0, date_fns_1.format)(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
            ret.updatedAt = (0, date_fns_1.format)(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
            return ret;
        },
    },
});
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
