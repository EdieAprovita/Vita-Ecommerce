import jwt, { Secret } from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: string) => {
	const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as Secret, {
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
