import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    validate: {
      validator: function (v: string | any[]) {
        return v.length > 0;
      },
      message: "At least one product is required"
    }
  },
  contact: {
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, minlength: 10 },
    phoneNumber: { type: Number, required: true, minlength: 10 }
  },
  customization: { 
    description: {type: String, required: true},
    image: { type: String, required: false }, 
  },
  status: { type: String, enum: ["pending", "shipped", "delivered"], default: "pending" },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
