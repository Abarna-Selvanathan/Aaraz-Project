import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import '../handmade-collection/Handmade-collection.css';
import "../../src/app/globals.css";

// Define the Product interface
interface Product {
    _id: string;
    image: string;
    productName: string;
    price: number;
}

const HandmadegiftCollection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); // Initialize products as an empty array
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/product');
                const data = await response.json();
                setProducts(data.products || []); // Ensure products is set to an empty array if undefined
            } catch (error) {
                console.error('Error fetching products:', (error as Error));
            }
        };
        fetchProducts();
    }, []);

    // Ensure products is always an array before slicing
    const paginatedProducts = products.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const handleProduct = (id: string) => {
        router.push(`/product/${id}`);
    };

    return (
        <>
            <section className="Collections">
                <p>Collections Of Handmade Gifts</p>
                <div className="cards">
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <div className="card" onClick={() => handleProduct(product._id)} key={product._id}>
                                {product.image && (
                                    <Image src={product.image} alt={product.productName} width={400} height={300} />
                                )}
                                <h3>{product.productName}</h3>
                                <p>LKR {product.price}</p>
                                <div className='home-icons'>
                                    <Link href="/cart">
                                        <div className="fas fa-cart-plus" style={{ color: 'black', fontSize: '1.5rem' }}></div>
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
                    {page * itemsPerPage < products.length && <button onClick={() => setPage(page + 1)}>See More</button>}
                </div>
            </section>
        </>
    );
};

export default HandmadegiftCollection;
