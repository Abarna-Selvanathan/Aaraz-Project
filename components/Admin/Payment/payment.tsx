// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Payment {
//   _id: string;
//   orderId: {
//     _id: string;
//     productName: string;
//     price: number;
//     quantity: number;
//   };
//   userId: {
//     _id: string;
//     username: string;
//     email: string;
//   };
//   paymentStatus: string;
//   paymentMethod: string;
//   amountPaid: number;
//   transactionDate: Date;
// }

// const Payments: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await axios.get('/api/payment'); // Fetch all payments
//         if (response.status === 200) {
//           setPayments(response.data); // Set the payments data
//         }
//       } catch (error) {
//         console.error('Error fetching payments:', error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   return (
//     <div className="main-content-Product">
//       <div className="ProductTable">
//         <div className="products">
//           <h1>Payments Details</h1>
//           <div className="table-container">
//             <table className="product-table">
//               <thead>
//                 <tr>
//                   <th>User ID</th>
//                   <th>Order ID</th>
//                   <th>Payment ID</th>
//                   <th>Payment Status</th>
//                   <th>Payment Date</th>
//                   <th>Total Amount</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {payments.map((payment) => (
//                   <tr key={payment._id}>
//                     <td>{payment.userId.username}</td>
//                     <td>{payment.orderId.productName}</td>
//                     <td>{payment._id}</td>
//                     <td>{payment.paymentStatus}</td>
//                     <td>{new Date(payment.transactionDate).toLocaleDateString()}</td>
//                     <td>LKR {payment.amountPaid}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payments;