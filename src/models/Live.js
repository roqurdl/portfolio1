import mongoose from "mongoose";

const liveSchema = mongoose.Schema({
  videoTitle: { type: String },
  videoUrl: { type: String },
  videoDescription: { type: String },
});

const Live = mongoose.model(`Live`, liveSchema);

export default Live;
