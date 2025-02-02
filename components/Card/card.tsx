<div className="card"  key={product._id}>
{product.image && (
  <Image src={product.image} alt={product.productName} width={300} height={300} />
)}
<h3>{product.productName}</h3>
<p>Rs {product.price}</p>
<div className='home-icons'>
    <Link href="/cart">
      <div className="fas fa-cart-plus" style={{color: '#4C394F', fontSize: '1.5rem' }}></div>
    </Link>
    <Link href="/payment">
      <div className="buttons">
        <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </Link>
  </div>
</div>