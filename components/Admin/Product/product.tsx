'use client';

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import axios from 'axios';
import "../../../components/Admin/Product/product.css"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Pencil, Trash2 } from "lucide-react";
import Loader from '../../Loader/loader';

interface Product {
  _id?: string;
  productName: string;
  description: string;
  price: number;
  stock: string;
  productType: string;
  image: string;
  createdAt?: string; // Add this field if your backend provides it
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams(); // For GET by ID
  const [productDetails, setProductDetails] = useState<Product | null>(null); // To hold the single product details
  const [editProduct, setEditProduct] = useState<Product | null>(null); // State for editing product
  const [showEditForm, setShowEditForm] = useState<boolean>(false); // New state to toggle the form and table

  // Fetch all products for the table
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        if (response.status === 200) {
          // Sort products by _id in descending order (newest first)
          const sortedProducts = response.data.products.sort((a, b) => {
            return b._id.localeCompare(a._id);
          });
          setProducts(sortedProducts);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch product details if there's an ID in the URL (for editing)
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`/api/product/${id}`);
          if (response.status === 200) {
            setProductDetails(response.data.product);
            setEditProduct(response.data.product); // Set the product to be editable
            setShowEditForm(true); // Show the edit form
          } else {
            console.error('Product not found:', response.status);
          }
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductDetails();
    }

    fetchProducts();
    setLoading(false);
  }, [id]); // Only re-run when `id` changes

  // PUT - Update product
  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await axios.put(`/api/product/${updatedProduct._id}`, updatedProduct);
      if (response.status === 200) {
        alert('Product updated successfully');
        setProductDetails(response.data.product); // Update the product details in the state
        setProducts(products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        )); // Update the product in the list as well
        setEditProduct(null); // Close the edit form after update
        setShowEditForm(false); // Hide the edit form after updating
      } else {
        console.error('Failed to update product:', response.status);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct!,
      [name]: value,
    }));
  };

  // DELETE - Delete product
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`/api/product/${productId}`);
        if (response.status === 200) {
          alert('Product deleted successfully');
          setProducts(products.filter(product => product._id !== productId)); // Remove from list
        } else {
          console.error('Failed to delete product:', response.status);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) return <Loader/>;

  return (
    <div className="main-content-Product">
      <div className="ProductTable">
        <div className="products">
          <h1>Products</h1>
          <div className="AddProduct">
            <Link href="/admin/productfrom">
              <button>Add Products</button>
            </Link>
          </div>

          {/* Show the table only when showEditForm is false */}
          {!showEditForm && (
            <div className="table-container">
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.productName}</td>
                      <td>{product.productType}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>
                        <Image src={product.image} alt={product.productName} width={50} height={50} />
                      </td>
                      <td className="btns">
                        {/* Update and Delete actions */}
                        <button
                          onClick={() => {
                            setEditProduct(product);
                            setShowEditForm(true);
                          }}
                          className="edit-btn"
                        >
                          <Pencil size={18} />
                        </button>

                        <button onClick={() => handleDeleteProduct(product._id!)} className="delete-btn">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Update Product Form */}
          {showEditForm && editProduct && (
            <div className='update-product'>
              <div className="update-product-form">
                <h2>Edit Product</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editProduct) handleUpdateProduct(editProduct);
                  }}
                >
                  <label>Product Name:</label>
                  <input
                    type="text"
                    name="productName"
                    value={editProduct.productName}
                    onChange={handleInputChange}
                  />

                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={editProduct.description}
                    onChange={handleInputChange}
                  />

                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={editProduct.price}
                    onChange={handleInputChange}
                  />

                  <label>Stock:</label>
                  <input
                    type="text"
                    name="stock"
                    value={editProduct.stock}
                    onChange={handleInputChange}
                  />

                  <label>Product Type:</label>
                  <input
                    type="text"
                    name="productType"
                    value={editProduct.productType}
                    onChange={handleInputChange}
                  />

                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={editProduct.image}
                    onChange={handleInputChange}
                  />

                  <button type="submit">Update Product</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;