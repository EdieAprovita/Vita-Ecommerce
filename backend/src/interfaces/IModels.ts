import { Request as ExpressRequest } from "express";
import { Document, ObjectId, Schema } from "mongoose";

export interface Request extends ExpressRequest {
	user?: IUser;
}

export interface IUser extends Document {
	_id?: ObjectId;
	username: string;
	email: string;
	password: string;
	isAdmin: boolean;
	isModified: (prop: string) => boolean;
	matchPassword: (prop: string) => boolean;
	timestamp: {
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface IReview {
	username: string;
	rating: number;
	comment: string;
	user: ObjectId;
	timeStamp: {
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface IProduct {
	user: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
	name: string;
	image: string;
	brand: string;
	category: string;
	description: string;
	reviews: IReview[];
	rating: number;
	numReviews: number;
	price: number;
	countInStock: number;
	timeStamp: {
		createdAt: Date;
		updatedAt: Date;
	};
}

export interface IOrder {
	user: {
		type: Schema.Types.ObjectId;
		ref: string;
	};
	orderItems: [
		{
			name: string;
			qty: number;
			image: string;
			price: number;
			product: {
				type: Schema.Types.ObjectId;
				ref: string;
			};
		}
	];
	shippingAddress: {
		address: string;
		city: string;
		postalCode: string;
		country: string;
	};
	paymentMethod: string;
	paymentResult: {
		id: string;
		status: string;
		update_time: string;
		email_address: string;
	};
	itemsPrice: number;
	taxPrice: number;
	shippingPrice: number;
	totalPrice: number;
	isPaid: boolean;
	paidAt: Date;
	isDelivered: boolean;
	deliveredAt: Date;
	timeStamp: {
		createdAt: Date;
		updatedAt: Date;
	};
}
