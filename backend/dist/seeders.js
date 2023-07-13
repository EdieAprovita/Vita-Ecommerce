"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const Colors = require("colors.ts");
Colors.enable();
const users_1 = __importDefault(require("./data/users"));
const products_1 = __importDefault(require("./data/products"));
const User_1 = __importDefault(require("./models/User"));
const Product_1 = __importDefault(require("./models/Product"));
const Order_1 = __importDefault(require("./models/Order"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
(0, db_1.default)();
const importData = async () => {
    try {
        await Order_1.default.deleteMany({});
        await Product_1.default.deleteMany({});
        await User_1.default.deleteMany({});
        const createdUsers = await User_1.default.insertMany(users_1.default);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products_1.default.map(product => {
            return { ...product, user: adminUser };
        });
        await Product_1.default.insertMany(sampleProducts);
        console.log("Data Imported!".green.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await Order_1.default.deleteMany({});
        await Product_1.default.deleteMany({});
        await User_1.default.deleteMany({});
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    }
    catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
