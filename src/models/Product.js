import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: { String, required },
  price: { String, required },
  description: { String, required },
  createdAt: Date,
  image: { file, required },
});

const Product = mongoose.model(`Product`, productSchema);
export default Product;
