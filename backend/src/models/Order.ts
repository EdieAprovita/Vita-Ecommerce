import { format } from "date-fns";
import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interfaces/IModels";

const orderSchema = new Schema<IOrder>(
	{
		user: {
			type: Schema.Types.ObjectId,
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
					type: Schema.Types.ObjectId,
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

const Order = mongoose.model("Order", orderSchema);
export default Order;
