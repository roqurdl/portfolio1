import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { type: String },
  price: { type: String },
  description: { type: String },
  createdAt: Date,
  productImg: { type: String },
  descriptImg: { type: String },
});

const Product = mongoose.model(`Product`, productSchema);
export default Product;
