import mongoose from "mongoose";

const LiveCommentSchema = mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
  live: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `Live` },
  createdAt: { type: Date, required: true, default: Date.now },
});
const ProductCommentSchema = mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: `Product`,
  },
  createdAt: { type: Date, required: true, default: Date.now },
});
