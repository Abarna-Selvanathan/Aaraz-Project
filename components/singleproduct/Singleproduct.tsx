import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../src/app/globals.css";
import "../singleproduct/Singleproduct.css";

const Singleproductviewpage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any | null>(null); // Default to null
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState<any[]>([]);
  

  useEffect(() => {
    if (!id) return; 

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [id]);

   useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/product');
          const data = await response.json();
          setProducts(data.products); 
        } catch (error: any) {
          console.error('Error fetching products:', error.message);
        }
      };
      fetchProducts();
    }, []);
 
  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to the cart.`);
  };

  const handleBuyNow = () => {
    router.push({
      pathname: "/order", 
      query: {id: id}
    })
  };

  
  if (loading) return <p>Loading product...</p>;

  
  if (!product) return <p>Product not found.</p>;
  const handleProduct = (id: string) => {
    router.push(`/product/${id}`)
  }

  return (
    <>
      <div className="ProductReview">
        <div className="Illustrationimg">
          <Image
            src={product.image } 
            alt={product.productName }
            width={400}
            height={500}
          />
        </div>

        <div className="Illustrationtext">
          <h1>{product.productName}</h1>
          <p className="stock">{product.stock > 0 ? "In stock" : "Out of stock"}</p>
          <p className="price">Rs {product.price}</p>
          <p className="Quantity">Quantity</p>
          <div className="buttons">
            <input
              type="number"
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

        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" onClick={() => handleProduct(product._id)} key={product._id}>
              {product.image && (
                <Image src={product.image} alt={product.productName} width={300} height={300} />
              )}
              <h3>{product.productName}</h3>
              <p>Rs {product.price}</p>
              <div className='home-icons'>
                  <Link href="/cart">
                    <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem' }}></div>
                  </Link>
                    <div className="buttons">
                      <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>
          ))}
        </div>

        
        
            
        
        
     


      </div>

    </>
  );
};

export default Singleproductviewpage;

