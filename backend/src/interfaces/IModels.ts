import { Request as ExpressRequest } from "express";
import { Document } from "mongoose";

export interface Request extends ExpressRequest {
	user?: IUser;
}

export interface IUser extends Document {
	_id: number;
	name: string;
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
