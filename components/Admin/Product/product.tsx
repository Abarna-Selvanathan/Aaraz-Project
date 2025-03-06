'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../components/Admin/Product/product.css"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Pencil, Trash2 } from "lucide-react";
import Loader from '../../Loader/loader';
import { useRouter } from 'next/router';

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

const AllProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();  // Use router for accessing dynamic params
  const { id } = router.query;
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [filterLetter, setFilterLetter] = useState<string>('');

  // Fetch all products for the table
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        if (response.status === 200) {
          // Sort products by _id in descending order (newest first)
          const sortedProducts = response.data.products.sort((a: Product, b: Product) => {
            return b._id?.localeCompare(a._id!); // Using optional chaining for safety
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
  }, [id]);

  // PUT - Update product
  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const response = await axios.put(`/api/product/${updatedProduct._id}`, updatedProduct);
      if (response.status === 200) {
        alert('Product updated successfully');
        setProducts(products.map(product =>
          product._id === updatedProduct._id ? updatedProduct : product
        ));
        setEditProduct(null);
        setShowEditForm(false);
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

  // Filter products based on the selected letter
  const filteredProducts = filterLetter
    ? products.filter((product) =>
      product.productName.toLowerCase().startsWith(filterLetter.toLowerCase())
    )
    : products;
  console.log('Filtered Products:', filteredProducts);

  // Handle filter letter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterLetter(e.target.value);
  };
  console.log('Filter Letter:', filterLetter);
  if (loading) return <Loader />;

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

          {/* Filter Input */}
          <div className="filter-container">
            <label htmlFor="filter-letter">Filter by Letter:</label>
            <select
              id="filter-letter"
              value={filterLetter}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
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

export default AllProduct;