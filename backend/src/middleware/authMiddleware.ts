import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import User from "../models/User";
import { Request } from "../interfaces/IModels";

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies?.jwt;

	if (token) {
		try {
			const secret = process.env.JWT_SECRET;
			if (!secret) {
				throw new Error("JWT_SECRET is not defined");
			}
			const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
			console.log(decoded);
			const user = await User.findById(decoded.userId).select("-password");
			if (!user) {
				throw new Error("User not found");
			}
			req.user = user;

			next();
		} catch (error) {
			console.error(`Error: ${(error as Error).message}`.red);
			res.status(401);
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

const admin = (req: Request, res: Response, next: NextFunction) => {
	if (req.user?.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

export { protect, admin };
