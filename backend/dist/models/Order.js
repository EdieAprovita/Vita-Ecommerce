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
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, "Please provide a name".bg_cyan],
            },
            qty: {
                type: Number,
                required: [true, "Please provide a quantity".bg_cyan],
                default: 0,
            },
            image: {
                type: String,
                required: [true, "Please provide an image".bg_cyan],
            },
            price: {
                type: Number,
                required: [true, "Please provide a price".bg_cyan],
            },
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: "Product",
            },
        },
    ],
    shippingAddress: {
        address: {
            type: String,
            required: [true, "Please provide an address".bg_cyan],
        },
        city: {
            type: String,
            required: [true, "Please provide a city".bg_cyan],
        },
        postalCode: {
            type: String,
            required: [true, "Please provide a postal code".bg_cyan],
        },
        country: {
            type: String,
            required: [true, "Please provide a country".bg_cyan],
        },
    },
    paymentMethod: {
        type: String,
        required: [true, "Please provide a payment method".bg_cyan],
    },
    paymentResult: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
        update_time: {
            type: String,
        },
        email_address: {
            type: String,
        },
    },
    itemsPrice: {
        type: Number,
        required: [true, "Please provide an item price".bg_cyan],
        default: 0.0,
    },
    taxPrice: {
        type: Number,
        required: [true, "Please provide a tax price".bg_cyan],
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: [true, "Please provide a shipping price".bg_cyan],
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: [true, "Please provide a total price".bg_cyan],
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        required: [true, "Please provide a payment status".bg_cyan],
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        required: [true, "Please provide a delivery status".bg_cyan],
        default: false,
    },
    deliveredAt: {
        type: Date,
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
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
