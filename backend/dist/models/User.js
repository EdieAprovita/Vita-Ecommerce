"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const mongoose_1 = __importStar(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, "Please provide a name".bg_cyan],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email".bg_cyan],
        unique: true,
        match: [
            /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email".bg_cyan,
        ],
    },
    password: {
        type: String,
        required: [true, "Please provide a password".bg_cyan],
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.createdAt = (0, date_fns_1.format)(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
            ret.updatedAt = (0, date_fns_1.format)(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
            return ret;
        },
    },
});
//Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
//Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
