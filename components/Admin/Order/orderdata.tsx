import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const OrderDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState('');
  const [customizationDescription, setCustomizationDescription] = useState('');

  useEffect(() => {
    if (id) {
      console.log("Fetching order details for ID:", id); // Debugging
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(`/api/order/${id}`);
          setOrder(response.data.orders);
        } catch (error) {
          console.log("Error fetching order details:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrderDetails();
    }
  }, [id]);

  // useEffect(() => {
  //   if (!router.isReady) return; // Ensure router is ready
  
  //   if (id) {
  //     console.log("Fetching order details for ID:", id);
  //     const fetchOrderDetails = async () => {
  //       try {
  //         const response = await axios.get(`/api/order?orderId=${id}`);
  //         console.log("Order data received:", response.data);
  //         setOrder(response.data.order);
  //       } catch (error) {
  //         console.error("Error fetching order details:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchOrderDetails();
  //   }
  // }, [id, router.isReady]);
  
  

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/order?orderId=${id}`, {
        status: newStatus,
        customization: { description: customizationDescription },
      });

      if (response.status === 200) {
        alert('Order updated successfully!');
        setOrder(response.data.order);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/order?orderId=${id}`);

      if (response.status === 200) {
        alert('Order deleted successfully!');
        router.push('/admin/order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order');
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Name:</strong> {order.contact.name}</p>
      <p><strong>Email:</strong> {order.contact.email}</p>
      <p><strong>Phone Number:</strong> {order.contact.phoneNumber}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Customization:</strong> {order.customization.description}</p>

      <h3>Update Order Status</h3>
      <input
        type="text"
        placeholder="New status"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customization description"
        value={customizationDescription}
        onChange={(e) => setCustomizationDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update Order</button>

      <h3>Delete Order</h3>
      <button onClick={handleDelete}>Delete Order</button>
    </div>
  );
};

export default OrderDetails;
