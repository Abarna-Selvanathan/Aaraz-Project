import { useState, ChangeEvent } from "react";
import Image from "next/image";
import "../../src/app/globals.css"
import "../singleproduct/Singleproduct.css";
import Link from "next/link";

const Singleproductviewpage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to the cart.`);
    // Replace with actual add-to-cart logic.
  };

  const handleBuyNow = () => {
    console.log(`Proceed to checkout with ${quantity} items.`);
    // Replace with actual buy-now logic.
  };

  return (
    <>
     

      <div className="ProductReview">
        <div className="Illustrationimg">
          <Image
            src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/rexnx5hnev2xys9v0om0.jpg"
            alt="Illustration Frame"
            width={400}
            height={500}
          />
        </div>
        <div className="Illustrationtext">
          <h1>Illustration Frame</h1>
          <p className="stock">In stock</p>
          <p className="price">Rs 3200</p>
          <p className="Quantity">Quantity</p>
          <div className="buttons">
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
          <Link href="/payment">
            <div className="buttons">
              <button className="buy-now" onClick={handleBuyNow}>
                Buy It Now
              </button>
          </div>
          </Link>
        </div>
      </div>
      <div className="RelatedDetails">
        <ul className="Relatedtext">
          <li>
            <Link href="/review">
              <p>Reviews</p>
            </Link>
          
          
            <p>Specification</p>
            <div>
              Frame Size - 8 inches X 12 inches
              <br />
              Material - Glass Frame
              <br />
              <br />
              We use high-quality glass box frames.
              Number of members in the picture - 1 or 2 members.
              You can send us the pictures and mention the name to be added to
              aaraz@gmail.com with your order ID.
              <br />
              <br />
              Send the pictures by email to aaraz@gmail.com
              <br />
              <br />
              Whatsapp +94 77 456 4754 with your mail ID and order number
            </div>
          
            <p>Delivery Duration</p>
            <div>
              Preparation - 3 to 7 working days
              <br />
              <br />
              Within Vavuniya Delivery - 1 or 2 working days after preparation
              <br />
              <br />
              Outside Vavuniya Delivery - 3 to 5 working days after preparation
            </div>
          
            <p>Customization details</p>
            <div>
              To ensure that your customization preferences are met, please
              send images and details to aaraz@gmail.com or Whatsapp +94 77 456
              4754.
              <br />
              <br />
              Please mention your order ID in the subject line. Additionally, if
              your order includes multiple products that require customization,
              please send a separate email for each product.
            </div>
          </li>
        </ul>
      </div>
      <div className="Related">
        <section className="RelatedCollections">
          <h1>Related Products</h1>
          <div className="Relatedproducts">
            <div className="Relatedproduct">
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622753/AARAZ/Image/iczmzo7ncja7vgecijhg.jpg"
                alt="Resin Frame"
                width={200}
                height={250}
              />
              <h3>Resin Frame</h3>
              <p>Rs 2000</p>
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
            <div className="Relatedproduct">
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/r6yticdgnka7rnvilixn.png"
                alt="Photobox"
                width={200}
                height={250}
              />
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
            <div className="Relatedproduct">
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622754/AARAZ/Image/ri29mh5dezqyezcuttoz.png"
                alt="Explosion box"
                width={200}
                height={250}
              />
              <h3>Explosion box</h3>
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
            <div className="Relatedproduct">
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
            <div className="Relatedproduct">
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/r6yticdgnka7rnvilixn.png"
                alt="Photobox"
                width={200}
                height={250}
              />
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
            <div className="Relatedproduct">
              <Image
                src="https://res.cloudinary.com/dgqumuoqj/image/upload/v1737622752/AARAZ/Image/dmhokmbujtlkahddpago.jpg"
                alt="Squre Photo Collage"
                width={200}
                height={250}
              />
              <h3>Squre Photo Collage</h3>
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

        
      </div>

    </>
  );
};

export default Singleproductviewpage;
