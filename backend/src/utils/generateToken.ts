import jwt, { Secret } from "jsonwebtoken";
import { Response } from "express";
import { ObjectId } from "mongoose";

const generateToken = (res: Response, userId: ObjectId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET as Secret, {
		expiresIn: "1d",
	});
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 1000 * 60 * 60 * 24,
	});
};

export default generateToken;
