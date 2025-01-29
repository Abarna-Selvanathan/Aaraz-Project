import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,  // Ensures uniqueness
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(), // Generates a unique ID
  },
  productName: { type: String, required: true },
  description: { type: String,required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  productType: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
  