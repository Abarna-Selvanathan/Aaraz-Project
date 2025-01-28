import React from "react";
import Image from "next/image";
import '../resin-collection/Resin-collection.css'
import Link from 'next/link';
import "../../src/app/globals.css"

const ResinArtsCollection: React.FC = () => {

  const handleBuyNow = () => {
    console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
  };


  return (
    <>
   

      <section className="Collections">
        <h1>Collections Of Resin Arts</h1>
        <div className="products">
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622753/AARAZ/Image/iczmzo7ncja7vgecijhg.jpg" alt="Resin Frame" width={300} height={300} />
            <h3>Resin Frame</h3>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622756/AARAZ/Image/hcfmz4jrvkq2bg5t44by.jpg" alt="Letter Keychain" width={300} height={300} />
            <h3>Letter Keychain</h3>
            <p>Rs 400</p>
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
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622755/AARAZ/Image/ihdnmziidr9ms4u84awg.jpg" alt="Name Stand" width={300} height={300} />
            <h3>Name Stand</h3>
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
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622757/AARAZ/Image/rcfr2po397xqn9htjt1q.jpg" alt="Letter & Photo Stand" width={300} height={300} />
            <h3>Letter & Photo Stand</h3>
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
          <div className="product">
            <Image src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/xakd3esdebbu2egqjljz.jpg" alt="Resin Preservation" width={300} height={300} />
            <h3>Resin Preservation</h3>
            <p>Rs 3000</p>
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

export default ResinArtsCollection;
