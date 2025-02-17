import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import TrackingTimeline from "../../../components/Tracking/tracking";

const trackingData = {
  trackingNumber: "7Y937849CV2",
  courier: "ARAMEX",
  deliveryType: "2-6 Days",
  status: "Delivered",
  steps: [
    { time: "11:20", date: "Nov 16", status: "Order Received", description: "Your order is being processed in Dubai - UAE warehouse." },
    { time: "12:35", date: "Nov 16", status: "", description: "Your order is ready to be shipped from Dubai - UAE warehouse." },
    { time: "15:10", date: "Nov 16", status: "Your order is shipped", description: "Your order has arrived in Riyadh - KSA warehouse." },
    { time: "10:00", date: "Nov 18", status: "", description: "Your order has been picked up by ARAMEX and is on the way to Jeddah." },
    { time: "17:00", date: "Nov 18", status: "", description: "Your order has arrived in Jeddah and expected delivery is Nov 19." },
    { time: "08:00", date: "Nov 19", status: "", description: "Your order is out for delivery." },
    { time: "13:00", date: "Nov 19", status: "Delivered", description: "" },
  ],
};

const TrackingPage = () => {
    return( 
    <div>
        <Navbar/>
        <TrackingTimeline {...trackingData} />;
        <Footer/>
    </div>
    );
}

export default TrackingPage;
