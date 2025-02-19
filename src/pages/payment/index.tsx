import Navbar from "../../../components/Navbar/Navbar";
import PaymentForm from "../../../components/Payment/payment";
import Footer from "../../../components/Footer/Footer"
import { useEffect, useState } from "react";
import axios from "axios";


function PaymentPage() {
  const [order, setOrder] = useState()

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const cookieResponse = await axios.get('/api/cookie')
        if (cookieResponse.status === 200 && cookieResponse.data?.user?.id) {
          const orderResponse = await axios.post('/api/order/getbyUserId', {
            userId: cookieResponse.data?.user?.id
          })
          setOrder(orderResponse.data.order)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchOrder()
  }, [])
  return (
    <div>
      <Navbar />
      <PaymentForm order={order} />
      <Footer />

    </div>
  );
}

export default PaymentPage;
