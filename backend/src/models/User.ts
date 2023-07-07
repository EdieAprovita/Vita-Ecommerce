import { format } from "date-fns";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/IModels";

const userSchema = new Schema<IUser>(
	{
		_id: Schema.Types.ObjectId,
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
	},
	{
		timestamps: true,
		toJSON: {
			transform(doc, ret) {
				ret.createdAt = format(ret.createdAt, "yyyy-MM-dd HH:mm:ss");
				ret.updatedAt = format(ret.updatedAt, "yyyy-MM-dd HH:mm:ss");
				return ret;
			},
		},
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
