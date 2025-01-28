import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder {
  _id?: string;
  customerName: string;
  items: { productId: string; quantity: number }[];
  totalAmount: number;
  // Add more fields as needed
}


const Order: Schema = new Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  orderStatus: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], required: true },
  productDetail: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: String, required: true },
});

export default mongoose.models.OrderManagement || mongoose.model('OrderManagement', Order);
