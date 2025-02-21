import mongoose, { Schema } from 'mongoose';

const PaymentSchema: Schema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  transactionDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  amountPaid: { type: Number, required: true },
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);