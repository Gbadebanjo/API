import mongoose, { Schema, Document } from "mongoose";

/* Product Interface */
interface IProduct extends Document {
  name: string;
  picture: string[];
  price: number;
  description: string;
}

/* Product Schema */
const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
export { IProduct };







