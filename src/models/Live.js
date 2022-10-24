import mongoose from "mongoose";

const liveSchema = mongoose.Schema({
  liveTitle: { type: String },
  liveUrl: { type: String },
  liveDescription: { type: String },
});

const Live = mongoose.model(`Live`, liveSchema);

export default Live;
