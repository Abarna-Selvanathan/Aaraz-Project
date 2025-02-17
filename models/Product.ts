import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true, 
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(), 
  },
  productName: { type: String, required: true },
  description: { type: String,required: true },
  price: { type: Number, required: true },
  stock: { type: String, required: true },
  productType: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
   