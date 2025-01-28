import React from "react";
import Image from "next/image";
import '../handmade-collection/Handmade-collection.css'
import "../../src/app/globals.css"
import Link from 'next/link';


const HandmadegiftCollection: React.FC = () => {

  const handleBuyNow = () => {
    console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
  };

  return (
    <>
     

      <section className="Collections">
        <h1>Collections Of Handmade Gifts</h1>
        <div className="products">
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/ri29mh5dezqyezcuttoz.png" alt="Explosion Box" width={300} height={300} />
            <h3>Explosion Box</h3>
            <p>Rs 1300</p>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622756/AARAZ/Image/c5ixjkhdewsqznqvwmwn.png" alt="Photo Book" width={300} height={300} />
            <h3>Photo Book</h3>
            <p>Rs 1200</p>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/r6yticdgnka7rnvilixn.png" alt="Photo Box" width={300} height={300} />
            <h3>Photo Box</h3>
            <p>Rs 1200</p>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/tbwonvttk7svly3m6acl.jpg" alt="Polaroid Pic" width={300} height={300} />
            <h3>Polaroid Pic</h3>
            <p>Rs 1000</p>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/krmdhti2gqths6tjiypa.jpg" alt="Round Photo Collage" width={300} height={300} />
            <h3>Round Photo Collage</h3>
            <p>Rs 2500</p>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/dmhokmbujtlkahddpago.jpg" alt="Square Photo Collage" width={300} height={300} />
            <h3>Square Photo Collage</h3>
            <p>Rs 2900</p>
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

export default HandmadegiftCollection;
