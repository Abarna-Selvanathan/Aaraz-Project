import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import "../../src/app/globals.css";
import "../singleproduct/Singleproduct.css";
import { Share2, Clock, CheckSquare, MessageSquare } from "lucide-react";
import Loader from "../Loader/loader";

const Singleproductviewpage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState("");
  const [activeSection, setActiveSection] = useState(null);

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
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} items to the cart.`);
  };

  const handleBuyNow = () => {
    router.push({ pathname: "/order", query: { id: id } });
  };


  const handleProduct = (id: string) => {
    router.push(`/product/${id}`);
  };



  useEffect(() => {
    setUrl(window.location.href); // Get current URL dynamically
  }, []);

  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: url,
        });
        console.log("Shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser doesn't support Web Share API.");
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) return <Loader/>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <div className="ProductReview">
        <div className="product-container">
          <div className="Illustrationimg">
            <Image src={product.image} alt={product.productName} width={400} height={500} />
          </div>

          <div className="Illustrationtext">
            <h1>{product.productName}</h1>
            <p className="stock">{product.stock > 0 ? "Out of stock" : "In stock"}</p>
            <p className="price">LKR {product.price}</p>
            <p className="description">{product.description}</p>
            <p className="Quantity">Quantity</p>
            <div className="quantity-container">
              <button className="quantity-btn" onClick={handleDecrease}>−</button>
              <input type="text" value={quantity} readOnly className="quantity-input" />
              <button className="quantity-btn" onClick={handleIncrease}>+</button>
            </div>
            <div className="button-buy">
              <button className="buy-now" onClick={handleBuyNow}>Buy It Now</button>

            </div>
            <div className="product-details">
              <div className="section-details">
                <div
                  className="section-header"
                  onClick={() => toggleSection("reviews")}
                >
                  <div className="icon-text"
                  >
                    <MessageSquare size={20} />
                    <Link href="/review" style={{ color: "#555", textDecoration: "none" }}>
                      <span >Customer Reviews</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="section-details">
                <div
                  className="section-header"
                  onClick={() => toggleSection("delivery")}
                >
                  <div className="icon-text">
                    <Clock size={20} />
                    <span>Delivery Duration</span>
                  </div>
                  <span>{activeSection === "delivery" ? "-" : "+"}</span>
                </div>
                {activeSection === "delivery" && (
                  <div className="section-content">
                    <p>The delivery duration is approximately 3-5 business days.</p>
                  </div>
                )}
              </div>

              <div className="section-details">
                <div
                  className="section-header"
                  onClick={() => toggleSection("customization")}
                >
                  <div className="icon-text">
                    <CheckSquare size={20} />
                    <span>Customization Details</span>
                  </div>
                  <span>{activeSection === "customization" ? "-" : "+"}</span>
                </div>
                {activeSection === "customization" && (
                  <div className="section-content">
                    <p>Here are the customization options available for this product.</p>
                  </div>
                )}
              </div>

              <button className="share-btn" onClick={shareProduct}>
                <Share2 size={20} /> Share
              </button>
            </div>
          </div>


        </div>



      </div>
      <section className="section-related">
        <h2>You may also like</h2>
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
    </>
  );
};

export default Singleproductviewpage;
