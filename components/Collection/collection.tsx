import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../../src/app/globals.css";
import "../Collection/collection.css";

// Define the Product type
interface Product {
  _id: string;
  productName: string;
  price: number;
  category: string;
  image?: string;
}

const CollectionPage = () => {
  const [products, setProducts] = useState<Product[]>([]); // Initialize with an empty array
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Initialize with an empty array
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 3699]); // Default range
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false); // Dropdown State
  const itemsPerPage = 12;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product");
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", (error as Error));
      }
    };
    fetchProducts();
  }, []);

  // Price filter handler
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };

  const handleReset = () => {
    setPriceRange([0, 4999]); // Reset to default range
    setFilteredProducts(products); // Reset filtering
    setIsOpen(false); // Close dropdown
  };

  const handleFilter = () => {
    let updatedProducts: Product[] = [...products]; // Initialize as a copy of products

    if (category !== "all") {
      updatedProducts = updatedProducts.filter((product) => product.category === category);
    }

    updatedProducts = updatedProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(updatedProducts);
    setPage(1);
    setIsOpen(false); // Close dropdown after applying filters
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div>
      <div className="filters">
        <select onChange={handleCategoryChange}>
          <option value="all">Collections </option>
          <option value="handmadegift">Handmade Gifts</option>
          <option value="resinart">Resin Arts</option>
          <option value="frame">Frames</option>
          <option value="walletcard">Wallet Cards</option>
        </select>

        {/* Price Filter Dropdown */}
        <div className="dropdown-collection-pricce">
          <button className="dropdown-price" onClick={() => setIsOpen(!isOpen)}>
            Price ▼
          </button>

          {isOpen && (
            <div className="dropdown-content">
              <p>The highest price is LKR {priceRange[1].toLocaleString("en-IN")}</p>
              <button onClick={handleReset} className="reset-btn">
                Reset
              </button>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                />
              </div>
              <button onClick={handleFilter} className="apply-btn">
                Apply
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cards">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <div className="card" onClick={() => handleProduct(product._id)} key={product._id}>
              {product.image && (
                <Image src={product.image} alt={product.productName} width={400} height={300} />
              )}
              <h3>{product.productName}</h3>
              <p>LkR {product.price}</p>
              <div className="home-icons">
                <Link href="/cart">
                  <div className="fas fa-cart-plus" style={{ color: "black", fontSize: "1.5rem" }}></div>
                </Link>
                <div className="buttons">
                  <button className="buy-now">Buy Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="pagination">
        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {page * itemsPerPage < filteredProducts.length && (
          <button onClick={() => setPage(page + 1)}>See More</button>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
