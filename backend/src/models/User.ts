import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IModels";

const userSchema = new Schema<IUser>(
	{
		name: {
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
			select: false,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

//Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

//Encrypt password using bcrypt
userSchema.pre("save", async function (this: IUser, next: (err?: Error) => void) {
	if (!this.isModified("password")) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
