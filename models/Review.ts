import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true },
  recommended: { type: Boolean, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review; 