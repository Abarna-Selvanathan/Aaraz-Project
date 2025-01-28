import React, { useState } from "react";
import axios from "axios";
import "../../Admin/Product-from/productfrom.css"
import "../../../src/app/globals.css";

 

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!image) {
        alert("Please upload an image");
        return;
      }

      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = uploadResponse.data.url;

      const productData = {
        productName,
        description,
        price,
        stock,
        image: imageUrl,
      };

      const productResponse = await axios.post("/api/product", productData);

      if (productResponse.status === 201) {
        alert("Product added successfully!");
        setProductName("");
        setDescription("");
        setPrice("");
        setStock("");
        setImage(null);
      }
    } catch (error:any) {
      console.error("Error adding product:", error.response || error);
      alert("Failed to add the product. Please try again.");
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />
      <input type="file" onChange={handleFileChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
