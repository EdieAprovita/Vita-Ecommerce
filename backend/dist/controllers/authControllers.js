"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const User_1 = __importDefault(require("../models/User"));
const userNotFoundError = (res) => {
    res.status(404);
    throw new Error("User not found");
};
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const user = await User_1.default.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid email or password");
    }
    (0, generateToken_1.default)(res, user._id);
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});
exports.authUser = authUser;
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { username, email, password } = req.body;
    const userExists = await User_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User_1.default.create({
        username,
        email,
        password,
    });
    if (user) {
        (0, generateToken_1.default)(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});
exports.registerUser = registerUser;
// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = (0, asyncHandler_1.default)(async (req, res) => {
    res.cookie("jwt", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({ message: "Logged out" });
});
exports.logoutUser = logoutUser;
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const user = await User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    user ? res.status(200).json(user) : userNotFoundError(res);
});
exports.getUserProfile = getUserProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = (0, asyncHandler_1.default)(async (req, res) => {
    var _a;
    const user = await User_1.default.findOneAndUpdate({ _id: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        },
    }, { new: true });
    user ? res.status(200).json(user) : userNotFoundError(res);
});
exports.updateUserProfile = updateUserProfile;
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const users = await User_1.default.find({});
    if (!users) {
        userNotFoundError(res);
    }
    res.status(200).json(users);
});
exports.getUsers = getUsers;
// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findById(req.params.id);
    if (user) {
        if (user.isAdmin) {
            res.status(400);
            throw new Error("Can not delete admin user");
        }
        await User_1.default.deleteOne({ _id: user._id });
        res.json({ message: "User removed" });
    }
    else {
        userNotFoundError(res);
    }
});
exports.deleteUser = deleteUser;
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findById(req.params.id).select("-password");
    user ? res.status(200).json(user) : userNotFoundError(res);
});
exports.getUserById = getUserById;
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            isAdmin: Boolean(req.body.isAdmin),
        },
    }, { new: true });
    user ? res.status(200).json(user) : userNotFoundError(res);
});
exports.updateUser = updateUser;
