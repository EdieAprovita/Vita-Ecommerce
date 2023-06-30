import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

import User from "../models/User";
import { Request } from "../interfaces/IModels";

const protect = expressAsyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies?.jwt;

		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
				const user = await User.findById(decoded.id).select("-password");

				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404);
					throw new Error("User not found");
				}
			} catch (error) {
				console.error(`Error: ${(error as Error).message}`.red);
				res.status(401);
			}
		} else {
			res.status(401);
			throw new Error("Not authorized, no token");
		}
	}
);
