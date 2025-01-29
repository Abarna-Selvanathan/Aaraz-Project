'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import "../../../components/Admin/Product/product.css"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

interface Product {
  _id?: string;  
  productName: string;
  description: string;
  price: number;
  stock: string;
  productType: string; 
  image: string;
}


const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product');
        if (response.status === 200) { 
          setProducts(response.data.products);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    

    fetchProducts();
  }, []); 

  return (
    <div className="main-content">
     
        <div className="analytics">
          <div className="background-products">
            <h1>Products</h1>
            <div className="viewDetails">
              < Link href="/admin/productfrom">
              <button>Add Products</button>
              </Link>
            </div>
            <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th> Product Type</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Image</th>


                </tr>
              </thead>
              <tbody>
            {products.map((product) => (
              <tr key={product._id}> {/* Unique key */}
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{product.productType}</td> {/* Fixed property name */}
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Image src={product.image} alt={product.productName} width={50} height={50} />
                </td> {/* Display image properly */}
              </tr>
              ))}
            </tbody>

            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
