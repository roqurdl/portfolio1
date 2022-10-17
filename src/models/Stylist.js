import mongoose from "mongoose";

const stylistSchema = mongoose.Schema({
  stylistName: { type: String, required: true },
  stylistSummary: { type: String },
  stylistImg: { type: String },
  summaryImg: { type: String },
});

const Stylist = mongoose.model(`stylists`, stylistSchema);
export default Stylist;
