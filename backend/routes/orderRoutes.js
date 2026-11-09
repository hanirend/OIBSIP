const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// CREATE ORDER
router.post('/create', async (req, res) => {
  try {
    const { userId, base, sauce, cheese, vegetables, price } = req.body;

    if (!userId || !base || !sauce || !cheese || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newOrder = new Order({
      user: userId,
      pizza: { base, sauce, cheese, vegetables },
      price
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET ALL ORDERS FOR A SPECIFIC USER
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET SINGLE ORDER BY ID (for status tracking)
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;