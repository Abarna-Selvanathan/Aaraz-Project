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
  description:string;
  price:number;
  stock:number; 
  productType:string, 
  image:string;
}

// Named POST export for the App Directory structure
export async function POST(req: NextRequest) {
  try {
    // Parse JSON body data from the request
    const body = await req.json();
    const { productName,description, price, stock, image }: ProductData = body.data;

    // Validate required fields 
    if (!productName || !price || !image) {
      return new Response(
        JSON.stringify({ error: 'Missing product details: productName, price, or image' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to MongoDB
    await DBconnect();

    // Upload the base64 image to Cloudinary
    const Image: string = image;
    const uploadResponse = await cloudinary.v2.uploader.upload(Image, {
      folder: 'Aaraz',
    });

    // Save product details to MongoDB
    const newProduct = await Product.create({
      productName,
      description,
      price,
      stock,
      image: uploadResponse.secure_url, // URL of the uploaded image
    });

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Product added successfully', product: newProduct }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error uploading product:', error.message);
    // Return error response
    return new Response(
      JSON.stringify({ error: 'Failed to upload product', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
