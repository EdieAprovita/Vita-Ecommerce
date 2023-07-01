import asyncHandler from "../middleware/asyncHandler";
import { Response } from "express";
import generateToken from "../utils/generateToken";
import { Request } from "../interfaces/IModels";

import User from "../models/User";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user?.matchPassword(password)) {
			generateToken(res, user._id.toString());

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	} catch (error) {
		res.status(500);
		throw new Error((error as Error).message);
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		generateToken(res, user._id.toString());

		res.status(201).json({
			_id: user._id,
			name: user.name,
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
	if (req.user) {
		User.findById(req.user._id)
			.then(user => {
				if (user) {
					res.json({
						_id: user._id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
					});
				} else {
					res.status(404);
					throw new Error("User not found");
				}
			})
			.catch(err => {
				res.status(500).send(err);
			});
	} else {
		res.status(401);
		throw new Error("Not authorized, no user found");
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
	if (req.user) {
		User.findById(req.user._id)
			.then(user => {
				if (user) {
					user.name = req.body.name || user.name;
					user.email = req.body.email || user.email;

					if (req.body.password) {
						user.password = req.body.password;
					}

					user
						.save()
						.then(updatedUser => {
							res.json({
								_id: updatedUser._id,
								name: updatedUser.name,
								email: updatedUser.email,
								isAdmin: updatedUser.isAdmin,
							});
						})
						.catch(error => {
							res.status(500).send(error);
						});
				} else {
					res.status(404);
					throw new Error("User not found");
				}
			})
			.catch(error => {
				res.status(500).send(error);
			});
	}
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req: Request, res: Response) => {
	const users = await User.find({});
	res.json(users);
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
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id).select("-password");

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req: Request, res: Response) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = Boolean(req.body.isAdmin);

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
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
