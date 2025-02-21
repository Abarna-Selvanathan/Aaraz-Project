import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    
    deliveryDetails: {  
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      address: { type: String, required: true },
      district: { type: String, required: true },
      postalCode: { type: String, required: false },
      additionalNotes: { type: String },
    },
    
    customization: { 
      customizationDescription: { type: String, required: true },
      customizationImage: [{ type: String, required: true }],
    },

    quantity: { type: Number, required: true }, 
    deliveryCharge: { type: Number, required: true }, 

    status: { 
      type: String, 
      enum: ["Order pending", "Order accepted", "Order rejected", "Order Placed","Order Shipped","Order Delivered", "Paid"], 
      default: "Order pending" 
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
