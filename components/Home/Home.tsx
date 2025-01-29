'use client';

import { useEffect, useState } from 'react';
import React from "react";
import Image from "next/image";  
import './Home.css';
import Link from 'next/link';
import "../../src/app/globals.css";
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const Home: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [userType, setUserType] = useState<string>("customer");
  const router = useRouter();
  const { id } = useParams(); // For fetching single product by ID

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        console.log("User Data:", data);
        if (data?.user?.userType) {
          setUserType(data.user.userType);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Redirect Admin to Dashboard
  useEffect(() => {
    if (userType === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [userType]); // Run this effect when userType changes

  // Fetch Products (All Products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data.products); // ✅ Ensure correct API response handling
      } catch (error: any) {
        console.error('Error fetching products:', error.message);
      }
    };
    fetchProducts();
  }, []);

  // Fetch Single Product (if ID exists)
  const [singleProduct, setSingleProduct] = useState<any | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSingleProduct = async () => {
        try {
          const response = await axios.get(`/api/product/${id}`);
          setSingleProduct(response.data.product);
        } catch (error) {
          console.error('Error fetching single product:', error);
        }
      };
      fetchSingleProduct();
    }
  }, [id]); // Only fetch when `id` is present

  const handleBuyNow = () => {
    console.log(`Proceed to checkout`);
  };

  return (
    <div>
      {/* Hero Section */}
      {/* <div className="hero">
        <Image 
          src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/k4n4ljjhyl6wgmsq2bmd.png" 
          alt="Personalized Gift" 
          width={1920} 
          height={500} 
        />
      </div> */}
      
      {/* New Launch Section */}
      <section className="section">
        <h1>New Launch</h1>
        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" key={product._id}>
              {product.image && (
                <Image src={product.image} alt={product.productName} width={300} height={300} />
              )}
              <h3>{product.productName}</h3>
              <p>Rs {product.price}</p>
              <div className='home-icons'>
                  <Link href="/cart">
                    <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem' }}></div>
                  </Link>
                  <Link href="/payment">
                    <div className="buttons">
                      <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                  </Link>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section className="section">
        <h1>Offers</h1>
        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" key={product._id}>
              <div className="saleprice">20%</div>
              <h3>{product.productName}</h3>
              <p>Rs {product.price}</p>
              <div className='home-icons'>
                  <Link href="/cart">
                    <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem' }}></div>
                  </Link>
                  <Link href="/payment">
                    <div className="buttons">
                      <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                  </Link>
                </div>
            </div>
          ))}
        </div>
      </section>

      {/* Single Product Display (if `id` is available) */}
      {singleProduct && (
        <section className="section">
          <h1>Product Details</h1>
          <div className="product-detail">
            {singleProduct.image && (
              <Image src={singleProduct.image} alt={singleProduct.productName} width={300} height={300} />
            )}
            <h3>{singleProduct.productName}</h3>
            <p>{singleProduct.description}</p>
            <p>Rs {singleProduct.price}</p>
            <div className='home-icons'>
              <Link href="/cart">
                <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem' }}></div>
              </Link>
              <Link href="/payment">
                <div className="buttons">
                  <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections Section */}
      <section className="Collections-section">
        <h1>Collections</h1>
        <div className="Collections-cards">
          <div className="card">
            <Link href="/handmadegift">
              <h3>Handmade Gifts</h3>
            </Link>
          </div>
          <div className="card">
            <Link href="/resinart">
              <h3>Resin Arts</h3>
            </Link>
          </div>
          <div className="card">  
            <Link href="/frame">
              <h3> Frames</h3>
            </Link>
          </div>
          <div className="card">
            <Link href="/walletcard">
              <h3>Wallet Cards</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <h2 className="faqh1">Frequently Asked Questions</h2>
        <ul className="faq">
          <li>
            <span>Preparation Time</span>
            <div>Preparation - 4 to 9 working days</div>
          </li>
          <li>
            <span>How to place COD order?</span>
            <div>Contact privacy via WhatsApp or email.</div>
          </li>
          <li>
            <span>How to share photos and details?</span>
            <div>Send them through the order form or WhatsApp.</div>
          </li>
          <li>
            <span>How to request for customization?</span>
            <div>Provide details in the customization section during checkout.</div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
