import express, { Request, Response } from "express";
import morgan from "morgan";
import Colors = require("colors.ts");
Colors.enable();
require("dotenv").config();

import connectDB from "./config/db";

connectDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Vegan-Vita API");
});

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
