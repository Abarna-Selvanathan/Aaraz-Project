import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h3>{item.name}</h3>
              <p>Price: {item.price} LKR</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
          <h2>Total: {total} LKR</h2>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
