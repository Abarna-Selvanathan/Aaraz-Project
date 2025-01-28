import React from "react";
import Image from "next/image";
import "../walletcard-collection/Walletcard-collection.css";
import "../../src/app/globals.css"
import Link from 'next/link';


// Define the type for each product
interface Product {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
}

const WalletCardsCollection: React.FC = () => {
  const products: Product[] = [
    {
      imageSrc: "https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622756/AARAZ/Image/li3k1otaxxgls5hh90er.png",
      altText: "Calendar Wallet Card",
      title: "Calendar Wallet Card",
      price: "Rs 1000",
    },
    {
      imageSrc: "https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622757/AARAZ/Image/yjkzhlwmsflvkjosodtg.png",
      altText: "Love Bank Wallet Card",
      title: "Love Bank Wallet Card",
      price: "Rs 1000",
    },
    {
      imageSrc: "https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/u5zynggrpczq67pfebhx.jpg",
      altText: "Wallet Card",
      title: "Wallet Card",
      price: "Rs 1000",
    },
    {
      imageSrc: "https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/wc4ftddygawcibxcex73.png",
      altText: "Map Wallet Card",
      title: "Map Wallet Card",
      price: "Rs 1000",
    },
  ];

  const handleBuyNow = () => {
    console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
  };

  return (
    <>
      <section className="Collections">
        <h1>Collections Of Wallet Cards</h1>
        <div className="products">
          {products.map((product, index) => (
            <div className="product" key={index}>
              <Image
                src={product.imageSrc}
                alt={product.altText}
                width={200}
                height={200}
              />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
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
    </>
  );
};

export default WalletCardsCollection;
