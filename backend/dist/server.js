"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const Colors = require("colors.ts");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
Colors.enable();
require("dotenv").config();
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/users", userRoutes_1.default);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html")));
}
else {
    app.get("/api/v1", (req, res) => {
        res.send("Vegan-Vita API");
    });
}
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.yellow));
