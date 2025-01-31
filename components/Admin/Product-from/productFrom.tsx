import { useState } from 'react';
import Image from 'next/image';
import "../../Admin/Product-from/productfrom.css";

interface Product {
  productName: string;
  description: string;
  price: number;
  stock: string;  // Keep stock as a string
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
    stock: '',  // Keep stock as string
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

    // // Validate stock (check if it's a valid number)
    // if (!/^\d+$/.test(product.stock)) {
    //   setMessage('Stock must be a valid number');
    //   return;
    // }

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
    <div>
      <h1 className="title">Add Product</h1>
      <form onSubmit={handleSubmit} className="addProductForm">
        <input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) => setProduct({ ...product, productName: e.target.value })}
          required
          className="inputField"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
          required
          className="inputField"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          className="inputField"
        />
        {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
        <textarea
          placeholder="Description"
          value={product.description}
          onChange={(e) => setProduct({ ...product, description: e.target.value })}
          required
          className="inputField"
        />
        <input
          type="text"
          placeholder="Product Type"
          value={product.productType}
          onChange={(e) => setProduct({ ...product, productType: e.target.value })}
          required
          className="inputField"
        />
        <input
          type="text"
          placeholder="Stock Status"
          value={product.stock}
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          required
          className="inputField"
          // list="stock-options"
        />
        {/* <datalist id="stock-options">
          <option value="In Stock" />
          <option value="Out of Stock" />
        </datalist> */}

        <button type="submit" className="submitButton">
          Add Product
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
