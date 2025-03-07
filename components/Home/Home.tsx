'use client';

import { useEffect, useState } from 'react';
import React from "react";
import Image from "next/image";
import './Home.css';
import "../../src/app/globals.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import hero from "../../public/Image/hero-img.png"
import Handmadegift from '../../public/Image/roundPhoto Collage .jpeg';
import resinArt from "../../public/Image/Resin letter keychains.jpeg"
import frame from "../../public/Image/frame.jpeg"
import walletcard from "../../public/Image/Map wallet card.png";
import { Link } from 'lucide-react';

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [userType, setUserType] = useState<string>("customer");
  const router = useRouter();

  // Fetch User Data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/cookie');
        // console.log("User Data:", data);
        if (data?.user?.userType) {
          setUserType(data.user.userType);
        }
      } catch (error) {
        console.error( error);

      }
    };
    fetchUser();
  }, []);


  useEffect(() => {
    if (userType === 'admin') {
      router.push('/admin/dashboard');
    }
  }, [userType, router]);

  // Fetch Products (All Products)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/product');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', (error as Error));

      }
    };
    fetchProducts();
  }, []);


  const handleBuyNow = () => {
    console.log(`Proceed to checkout`);
  };

  const handleProduct = (id: string) => {
    router.push(`/product/${id}`)
  }
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <Image
          src={hero}
          alt="heroImg"
          width={1920}
          height={200}
        />
      </div>
      <div className='about'>
        <h1>Let your gifts express your emotions</h1><br></br>
        <p>Aaraz is an affordable gift shop, which offers customization to you as per your need !!</p>
      </div>

      {/* New Launch Section */}
      <section className="section">
        <h1>New Launches</h1>
        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" onClick={() => handleProduct(product._id)} key={product._id}>
              {product.image && (
                <Image src={product.image} alt={product.productName} width={400} height={500} />
              )}
              <div className='card-contents'>
                <h3>{product.productName}</h3>
                <p>LKR. {product.price}</p>
                <div className='home-icons'>

                  <div className="buttons">
                    <button className="buy-now" onClick={handleBuyNow}>Choose</button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OffeLRK Section */}
      <section className="section">
        <h1>Offers</h1>
        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" key={product._id}>
              {product.image && (
                <>
                  <Image src={product.image} alt={product.productName} width={300} height={300} />
                  {/* <Image className="default-img" src={product.image} alt={product.productName} width={400} height={300} />
                  <Image className="hover-img" src={polaroidHov} alt={product.productName} width={400} height={300} /> */}
                </>
              )}
              <div className='card-contents'>
                <div className="saleprice">20%</div>
                <h3>{product.productName}</h3>
                <p>LKR. {product.price}</p>
                <div className='home-icons'>

                  <div className="buttons">
                    <button className="buy-now">Choose</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Collections Section */}

      <section className="split-section">
        <div className='collection'>
          <div className='handmadegift'>

            <div className="image-side" >
              <Image src={Handmadegift} alt="Handmadegift" width={500} height={600} />
            </div>

            <div className="content-side-right">
              <span className="section-tagline">Handmade Gifts</span>
              <p className="section-description">Unique, handcrafted gifts that bring a personal touch to every occasion. Each item is made with love and care, perfect for showing appreciation or celebrating special moments.</p>
              <Link href="/handmadegift" className="collection-button">View Collections</Link>
            </div>



          </div>

          <div className='resinart'>
            <div className="content-side">
              <span className="section-tagline">Resin Arts</span>
              <p className="section-description">These resin artworks are beautifully crafted by combining colors, shapes, and unique designs. Each art piece is handcrafted and features a touch of art and beautiful design. They will help add a touch of grandeur and artistic flair to your home or office.</p>
              <Link href="/resinart" className="collection-button">View Collections</Link>
            </div>
            <div className="image-side" >
              <Image src={resinArt} alt="resinArt" width={500} height={600} />
            </div>
          </div>

          <div className='frame'>
            <div className="image-side" >
              <Image src={frame} alt="frame" width={500} height={600} />

            </div>

            <div className="content-side-right">
              <span className="section-tagline">Frames</span>
              <p className="section-description">Elegant, stylish photo frames designed to showcase your most cherished memories. Crafted with attention to detail, these frames bring your photos to life and add a touch of sophistication to any room.</p>
              <Link href="/frame" className="collection-button">View Collections</Link>
            </div>

          </div>

          <div className='walletcard'>
            <div className="content-side">
              <span className="section-tagline">Wallet Cards</span>
              <p className="section-description">Thoughtful and practical wallet cards that offer a meaningful message or sentiment. Perfect as keepsakes or small gifts, these cards are designed to fit easily into your wallet and serve as a reminder of love and positivity.</p>
              <Link href="/walletcard" className="collection-button">View Collections</Link>
            </div>
            <div className="image-side" >
              <Image src={walletcard} alt="walletcard" width={500} height={600} objectFit='cover' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;