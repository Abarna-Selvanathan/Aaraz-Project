import Navbar from "../../../components/Navbar/Navbar";
import PaymentForm from "../../../components/Payment/payment";
import Footer from "../../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for Order
interface Order {
  productId: {
    productName: string;
    image: string;
    price: number;
  };
  quantity: number;
}

function PaymentPage() {
  const [order, setOrder] = useState<Order | null>(null);  // Initialize as null

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const cookieResponse = await axios.get('/api/cookie');
        if (cookieResponse.status === 200 && cookieResponse.data?.user?.id) {
          const orderResponse = await axios.post('/api/order/getbyUserId', {
            userId: cookieResponse.data?.user?.id
          });
          setOrder(orderResponse.data.order || null);  // Ensure `null` if no order found
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div>
      <Navbar />
      {/* Only pass order if it's available */}
      {order ? <PaymentForm order={order} /> : <div>Loading...</div>}
      <Footer />
    </div>
  );
}

export default PaymentPage;
