import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true, default: () => new mongoose.Types.ObjectId() },
  productName: { type: String, required: true },
  description: { type: String },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  productType: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
   