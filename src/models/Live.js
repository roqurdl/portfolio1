import mongoose from "mongoose";

const liveSchema = mongoose.Schema({
  liveTitle: { type: String },
  liveUrl: { type: String },
  liveDescription: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  liveComments: [{ type: mongoose.Schema.Types.ObjectId, ref: `liveComment` }],
});

const Live = mongoose.model(`Live`, liveSchema);

export default Live;
