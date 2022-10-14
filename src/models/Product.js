import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String },
  createdAt: Date,
  productImg: { type: String, required: true },
  descriptImg: { type: String, required: true },
});

const Product = mongoose.model(`Product`, productSchema);
export default Product;
