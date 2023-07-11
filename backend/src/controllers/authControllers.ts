import asyncHandler from "../middleware/asyncHandler";
import { Response } from "express";
import generateToken from "../utils/generateToken";
import { Request } from "../interfaces/IModels";

import User from "../models/User";

const userNotFoundError = (res: Response) => {
	res.status(404);
	throw new Error("User not found");
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user || !(await user.matchPassword(password))) {
		res.status(401);
		throw new Error("Invalid email or password");
	}

	generateToken(res, user._id);

	res.status(200).json({
		_id: user._id,
		username: user.username,
		email: user.email,
		isAdmin: user.isAdmin,
	});
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		username,
		email,
		password,
	});

	if (user) {
		generateToken(res, user._id);

		res.status(201).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
	res.cookie("jwt", "", {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({ message: "Logged out" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.user?._id);
	user ? res.status(200).json(user) : userNotFoundError(res);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.user?._id },
		{
			$set: {
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
			},
		},
		{ new: true }
	);
	user ? res.status(200).json(user) : userNotFoundError(res);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.find({});
	if (!users) {
		userNotFoundError(res);
	}
	res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);

	if (user) {
		if (user.isAdmin) {
			res.status(400);
			throw new Error("Can not delete admin user");
		}
		await User.deleteOne({ _id: user._id });
		res.json({ message: "User removed" });
	} else {
		userNotFoundError(res);
	}
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id).select("-password");
	user ? res.status(200).json(user) : userNotFoundError(res);
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				username: req.body.username,
				email: req.body.email,
				isAdmin: Boolean(req.body.isAdmin),
			},
		},
		{ new: true }
	);
	user ? res.status(200).json(user) : userNotFoundError(res);
});

export {
	authUser,
	registerUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
