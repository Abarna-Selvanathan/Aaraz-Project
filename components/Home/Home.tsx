'use client';

import { useEffect, useState } from 'react';
import React from "react";
import Image from "next/image";  
import './Home.css';
import Link from 'next/link';
import "../../src/app/globals.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  
  const [products, setProducts] = useState<any[]>([]); 
  const [userType, setType] = useState("customer");
  useEffect(() => {
    let isMounted = true;
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        console.log(data) 
        setType(data?.user?.userType)
        
      } catch (error) {
       
      }
    };
    fetchUser();
    return () => {
      isMounted = false;
    };
  }, []);

  const router = useRouter();

  if (userType === 'admin') {
    router.push('/admin/dashboard')
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product'); // Corrected the API endpoint to /api/products
        const data = await response.json();
        setProducts(data); 
      } catch (error: any) {
        console.error('Error feabarnarohanabarnarohantching products:', error.message);
      }
    };
  
    fetchProducts();
  }, []);
  const handleBuyNow = () => {
    // console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
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
              <Image src={product.image} alt={product.name} width={300} height={300} />
              <h3>{product.productName}</h3>
              <p>Rs {product.price}</p>
              <div className='home-icons'>
                  <Link href="/cart">
                  <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem'  }}></div>
                  </Link>
                  <Link href="/payment">
                  <div className="buttons">
                    <button className="buy-now" onClick={handleBuyNow}>
                      Buy Now
                    </button>
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
              {/* <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/rexnx5hnev2xys9v0om0.jpg" alt={product.name} width={300} height={300} /> */}
              <div className="saleprice">20%</div>
              <h3>{product.productName}</h3>
              <p>Rs {product.price}</p>
              <div className='home-icons'>
                  <Link href="/cart">
                  <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem'  }}></div>
                  </Link>
                  <Link href="/payment">
                  <div className="buttons">
                    <button className="buy-now" onClick={handleBuyNow}>
                      Buy Now
                    </button>
                  </div>
                  </Link>
                </div>
            </div>
          ))}
        </div>
        
      </section>

      {/* Collections Section */}
      <section className="Collections-section">
        <h1>Collections</h1>
        <div className="Collections-cards">
          <div className="card">
            <Link href="/handmadegift">
              {/* <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/krmdhti2gqths6tjiypa.jpg" alt="Handmade Gifts" width={300} height={300} /> */}
              <h3>Handmade Gifts</h3>
            </Link>
          </div>

          <div className="card">
            <Link href="/resinart">
              {/* <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622745/AARAZ/Image/qtuuvauj6cczi01x7pn5.jpg" alt="Resin Arts" width={300} height={300} /> */}
              <h3>Resin Arts</h3>
            </Link>
          </div>

          <div className="card">  
            <Link href="/frame">
              {/* <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/rexnx5hnev2xys9v0om0.jpg" alt="Frames" width={300} height={300} /> */}
              <h3> Frames</h3>
            </Link>
          </div>

          <div className="card">
            <Link href="/walletcard">
              {/* <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622748/AARAZ/Image/xhh06ijphbytc8hhcfc6.png" alt="Wallet Cards" width={300} height={300} /> */}
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
