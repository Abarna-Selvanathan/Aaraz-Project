'use client';
import { useEffect, useState } from 'react';
import React from "react";
import Image from "next/image";
import "../../src/app/globals.css"
import "../Frame-collection/Frame.css";
import Link from "next/link";


const CollectionFrame: React.FC = () => {

   const [products, setProducts] = useState<any[]>([]); // Any[] type to allow flexible structure for products
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/product'); // Corrected the API endpoint to /api/products
          const data = await response.json();
          setProducts(data); // Products state update செய்ய
        } catch (error: any) {
          console.error('Error feabarnarohanabarnarohantching products:', error.message);
        }
      };
    
    
      fetchProducts();
    }, []);

  const handleBuyNow = () => {
    console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
  };


  return (
    <>
      <section className="Collections">
        <h1>Collections Of Frames</h1>
        <div className="products">
        {products.slice(0, 4).map((product) => (
            <div className="product" key={product._id}>
              <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/yrwc0z5j0pvyh3nnunst.png" alt="Love Frame" width={300} height={300} />
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
              
            </div>))}

            <div className="product" >
              <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622753/AARAZ/Image/ew9rkju3tzf6kahwpjah.png" alt="Google Frame" width={300} height={300} />
              <h3>Google Frame</h3>
              <p>Rs 2200</p>
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

            <div className="product" >
              <Link href ="/product">
              <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/rexnx5hnev2xys9v0om0.jpg" alt="Illustration Frame" width={300} height={300} />
              <h3>Illustration Frame</h3>
              <p>Rs 3200</p>
              </Link>
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

            <div className="product" >
              <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/ll6w314whyw3eg2ckrq5.jpg" alt="Name Frame" width={300} height={300} />
              <h3>Name Frame</h3>
              <p>Rs 1500</p>
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

            <div className="product" >
              <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/oljta8hf0tmxpllyhywc.png" alt="Red Heart" width={300} height={300} />
              <h3>Red Heart</h3>
              <p>Rs 900</p>
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
            <div className="product" >
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622753/AARAZ/Image/bxtdy7zhhn5hgwuagsrk.png"
                alt="Explosion box"
                width={200}
                height={250}
              />
              <h3>Foldable Mini</h3>
              <p>Rs 1800</p>
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

        </div>
      </section>
    </>
  );
};

export default CollectionFrame;
