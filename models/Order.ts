import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",required: true},
  customization: { 
    customizationDescription: {type: String, required: true},
    customizationImage: [{ type: String, required: true }], 
  },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
