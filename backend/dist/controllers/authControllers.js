"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.deleteUser = exports.getUsers = exports.updateUserProfile = exports.getUserProfile = exports.logoutUser = exports.registerUser = exports.authUser = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const User_1 = __importDefault(require("../models/User"));
// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = (0, asyncHandler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            res.status(401);
            throw new Error("User not found");
        }
        if (!user.password) {
            res.status(500);
            throw new Error("User password not set in the database");
        }
        if (user && (await user.matchPassword(password))) {
            (0, generateToken_1.default)(res, user._id);
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        }
        else {
            res.status(401);
            throw new Error("Invalid email or password");
        }
    }
    catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
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
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.getUserProfile = getUserProfile;
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = (0, asyncHandler_1.default)(async (req, res) => {
    if (req.user) {
        User_1.default.findById(req.user._id)
            .then(user => {
            if (user) {
                user.username = req.body.username || user.username;
                user.email = req.body.email || user.email;
                if (req.body.password) {
                    user.password = req.body.password;
                }
                user
                    .save()
                    .then(updatedUser => {
                    res.status(200).json({
                        _id: updatedUser._id,
                        username: updatedUser.username,
                        email: updatedUser.email,
                        isAdmin: updatedUser.isAdmin,
                    });
                })
                    .catch(error => {
                    res.status(500).send(error);
                });
            }
            else {
                res.status(404);
                throw new Error("User not found");
            }
        })
            .catch(error => {
            res.status(500).send(error);
        });
    }
});
exports.updateUserProfile = updateUserProfile;
// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = (0, asyncHandler_1.default)(async (req, res) => {
    const users = await User_1.default.find({});
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
        res.status(404);
        throw new Error("User not found");
    }
});
exports.deleteUser = deleteUser;
// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findById(req.params.id).select("-password");
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.getUserById = getUserById;
// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = (0, asyncHandler_1.default)(async (req, res) => {
    const user = await User_1.default.findById(req.params.id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});
exports.updateUser = updateUser;
