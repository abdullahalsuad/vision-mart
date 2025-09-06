import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  userID: string;
  productID: string;
  number: string;
  address: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  date: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userID: {
      type: String,
      required: true,
      trim: true,
    },
    productID: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const orderModel: Model<IOrder> =
  mongoose.models.orderLists ??
  mongoose.model<IOrder>("orderLists", orderSchema);
