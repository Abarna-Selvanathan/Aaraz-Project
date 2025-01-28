
import mongoose, { Schema } from 'mongoose';


const PaymentSchema: Schema = new Schema({
  paymentId: { type: String, required: true, unique: true },
  orderId: { type: String, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true },
  transactionDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  amountPaid: { type: Number, required: true },
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
