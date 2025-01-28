
import "../../../components/Admin/Product/product.css"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

import loveFrame from 'https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/yrwc0z5j0pvyh3nnunst.png';
import googleFrame from 'https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622753/AARAZ/Image/ew9rkju3tzf6kahwpjah.png';
import illustrationFrame from 'https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/rexnx5hnev2xys9v0om0.jpg';
import nameFrame from 'https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/ll6w314whyw3eg2ckrq5.jpg';
import redHeart from 'https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/oljta8hf0tmxpllyhywc.png';

const Product: React.FC = () => {
  const products = [
    { id: 1, img: loveFrame, name: 'Love Frame', price: 2200 },
    { id: 2, img: googleFrame, name: 'Google Frame', price: 2200 },
    { id: 3, img: illustrationFrame, name: 'Illustration Frame', price: 3200 },
    { id: 4, img: nameFrame, name: 'Name Frame', price: 1500 },
    { id: 5, img: redHeart, name: 'Red Heart', price: 900 },
    { id: 6, img: nameFrame, name: 'Name Frame', price: 1500 },
    { id: 7, img: illustrationFrame, name: 'Illustration Frame', price: 3200 },
  ];

  return (
    <div className="main-content">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="topbar-logo">
          <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/jxccsnz9anadyjr7qqeb.png" alt="Logo" width={100} height={100} />
        </div>
        <input type="search" placeholder="Search..." />
      </div>

      {/* Sidebar and Main Content */}
      <div className="home">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
          <li ><Link href="/admin/dashboard"style={{ color: "#4C394F" }}>Analytics</Link></li>
            <li ><Link href="/admin/product"  style={{ color: "#4C394F" }}>Products</Link></li>
            <li ><Link href="/admin/user"     style={{ color: "#4C394F" }}>Users</Link></li>
            <li ><Link href="/admin/order"    style={{ color: "#4C394F" }}>Orders</Link></li>
            <li ><Link href="/admin/payment"  style={{ color: "#4C394F" }}>Payments</Link></li>
            <li ><Link href="/admin/delivery" style={{ color: "#4C394F" }}>Delivery Details</Link></li>
          </ul>
          <div className="admin-footer">Admin</div>
        </div>

        {/* Products Section */}
        <div className="analytics">
          <div className="background-products">
            <h1>Products</h1>

            {/* Products List */}
            <div className="products">
              {products.map((product) => (
                <div key={product.id} className="product">
                  <Image src={product.img} alt={product.name} width={150} height={150} />
                  <h3>{product.name}</h3>
                  <p>Rs {product.price}</p>
                </div>
              ))}
            </div>

            {/* Add Product Button */}
            <div className="viewDetails">
              < Link href="/productfrom">
              <button>Add Products</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
