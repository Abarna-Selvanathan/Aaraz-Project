import mongoose, { Document, Schema } from "mongoose";

interface IReview extends Document {
  productId: string;
  rating: number;
  recommended: boolean | null;
  comment: string;
}

const reviewSchema: Schema = new Schema({
  productId: { type: String, required: true },
  rating: { type: Number, required: true },
  recommended: { type: Boolean, required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const Review = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
