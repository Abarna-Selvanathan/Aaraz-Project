import { NextRequest } from 'next/server';
import cloudinary from 'cloudinary';
import DBconnect from '../../../../lib/dbConnect';
import Product from '../../../../models/Product';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ProductData {
  productName: string;
  description: string;
  price: number;
  stock: string;
  productType: string;
  image: string;
}

// Named POST export for the App Directory structure
export async function POST(req: NextRequest) {
  try {
    // Parse JSON body data from the request
    const body = await req.json();
    const { productName, description, price, stock, productType, image }: ProductData = body.data;

    // Validate required fields
    if (!productName || !price || !image) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: productName, price, or image' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to MongoDB
    await DBconnect();

    // Upload the base64 image to Cloudinary
    let uploadedImageUrl = '';
    try {
      const uploadResponse = await cloudinary.v2.uploader.upload(image, {
        folder: 'Aaraz',
      });
      uploadedImageUrl = uploadResponse.secure_url;
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError);
      return new Response(
        JSON.stringify({ error: 'Image upload failed. Please try again.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Save product details to MongoDB
    const newProduct = await Product.create({
      productName,
      description,
      price, // Already a number from frontend
      stock,
      productType,
      image: uploadedImageUrl, // URL of the uploaded image
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Product added successfully', product: newProduct }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error uploading product:', error.message);
    return new Response(
      JSON.stringify({
        error: 'Failed to upload product',
        details: error.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
