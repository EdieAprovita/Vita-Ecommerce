import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.DB!);
		console.log(`MongoDB Connected: ${conn.connections[0].name}`.green);
	} catch (error) {
		console.error(`Error: ${(error as Error).message}`.red);
		process.exit(1);
	}
};

export default connectDB;
