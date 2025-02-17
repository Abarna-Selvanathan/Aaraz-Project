import { useState } from 'react';
import Image from 'next/image';
import "../../Admin/Product-from/productfrom.css";

interface Product {
  productName: string;
  description: string;
  price: number;
  stock: string;  
  productType: string;
  image: string;
} 

interface ApiResponse {
  product?: Product;
  error?: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    productName: '',
    description: '',
    price: 0,
    stock: '',  
    productType: '',
    image: '',
  });
  const [preview, setPreview] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const result = event.target?.result;
        if (typeof result === 'string') {
          setPreview(result); // Base64 string
          setProduct((prevProduct) => ({
            ...prevProduct,
            image: result,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: product }),
      });

      if (!response.ok) {
        const result: ApiResponse = await response.json();
        setMessage(result.error || 'Error adding product');
        console.error(result.error);
      } else {
        const result: ApiResponse = await response.json();
        setMessage('Product added successfully');
        console.log('Product added:', result.product);
        // Optionally, reset the form
        setProduct({
          productName: '',
          description: '',
          price: 0,
          stock: '',  // Reset stock as string
          productType: '',
          image: '',
        });
        setPreview('');
      }
    } catch (err) {
      setMessage('Error adding product');
      console.error('Error:', err);
    }
  };

  return (
    <div className="update-product-form">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} >
       
        <input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
          required
          
        />

        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
          
        />

        <input
          type="number"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          required
         
        />

        <input
          type="text"
          placeholder="Stock Status"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          required
        />
        
        
        <input
          type="text"
          placeholder="Product Type"
          value={product.productType}
          onChange={(e) => setProduct({ ...product, productType: e.target.value })}
          required
         
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          
        />
        {preview && <Image src={preview} alt="Preview" width={100} height={100} />}

        

        <button type="submit" >Add Product</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
