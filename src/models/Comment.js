import mongoose from "mongoose";

const LiveCommentSchema = mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
  live: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `live` },
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

export const ProductComment = mongoose.model(
  `productComment`,
  ProductCommentSchema
);
export const LiveComment = mongoose.model(`liveComment`, LiveCommentSchema);
