"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const User_1 = __importDefault(require("../models/User"));
const protect = (0, asyncHandler_1.default)(async (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
    if (token) {
        try {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined");
            }
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = await User_1.default.findById(decoded.userId).select("-password");
            if (!user) {
                throw new Error("User not found");
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(`Error: ${error.message}`.red);
            res.status(401);
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
exports.protect = protect;
const admin = (req, res, next) => {
    var _a;
    if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
        next();
    }
    else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
};
exports.admin = admin;
