import { Request as ExpressRequest } from "express";
import { Document, ObjectId } from "mongoose";

export interface Request extends ExpressRequest {
	user?: IUser;
}

export interface IUser extends Document {
	_id: ObjectId;
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
