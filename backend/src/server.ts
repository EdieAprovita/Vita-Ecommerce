import path from "path";
import express, { Request, Response } from "express";
import morgan from "morgan";
import Colors = require("colors.ts");
import cookieParser from "cookie-parser";
Colors.enable();
require("dotenv").config();
import { notFound, errorHandler } from "./middleware/errorMiddleware";

import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";

const PORT = process.env.PORT ?? 5000;

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req: Request, res: Response) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/api/v1", (req: Request, res: Response) => {
		res.send("Vegan-Vita API");
	});
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
