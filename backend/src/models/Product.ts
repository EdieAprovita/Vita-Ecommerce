import { format } from "date-fns";
import mongoose, { Schema } from "mongoose";
import { IProduct, IReview } from "../interfaces/IModels";

const reviewSchema = new Schema<IReview>(
	{
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
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.createdAt = format(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
				ret.updatedAt = format(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
				return ret;
			},
		},
	}
);

const productSchema = new Schema<IProduct>(
	{
		user: {
			type: Schema.Types.ObjectId,
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
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.createdAt = format(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
				ret.updatedAt = format(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
				return ret;
			},
		},
	}
);

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
