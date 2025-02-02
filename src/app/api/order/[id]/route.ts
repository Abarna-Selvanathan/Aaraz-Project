import { NextApiRequest, NextApiResponse } from 'next';
import DBconnect from '../../../../../lib/dbConnect';
import Order from '../../../../../models/Order';
import Product from '../../../../../models/Product'; // Ensure product exists before order

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await DBconnect(); // Ensure DB connection

  if (req.method === 'POST') {
    return createOrder(req, res);
  } else if (req.method === 'GET') {
    return getOrderById(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

// POST: Create new order
const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, productId, quantity, deliveryDetails } = req.body;

    // Validate Product Exists
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(400).json({ error: 'Invalid productId. Product not found.' });
    }

    // Create Order
    const newOrder = new Order({ userId, productId, quantity, deliveryDetails, status: 'pending' });
    await newOrder.save();

    return res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
};

// GET: Get order by ID
const getOrderById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json(order);
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch order', details: error.message });
  }
};
