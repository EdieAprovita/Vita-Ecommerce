import { Request as ExpressRequest } from "express";
import { Document, ObjectId, Types } from "mongoose";

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
		type: ObjectId;
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
