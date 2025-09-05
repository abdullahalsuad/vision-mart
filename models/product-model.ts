import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define an interface for TypeScript
export interface IProduct extends Document {
  productTitle: string;
  description: string;
  price: number;
  productImg: string;
  category: "Electronics" | "Fashion" | "Supplies" | "Beauty" | "Sports" | "Groceries";
  date: Date;
}

// 2. Define the schema
const productSchema = new Schema<IProduct>({
  productTitle: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productImg: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Fashion", "Supplies", "Beauty", "Sports", "Groceries"],
  },
  date: { type: Date, default: Date.now },
});

// 3. Export the model with type
export const productModel: Model<IProduct> =
  mongoose.models.products ?? mongoose.model<IProduct>("products", productSchema);
