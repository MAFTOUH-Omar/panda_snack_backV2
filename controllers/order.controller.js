const Order = require("../models/order.model");
const Meal = require("../models/meal.model")
// const user = require('../models/user.model')
const jwt = require('jsonwebtoken'); // for verifying the JWT token
// Créer une nouvelle commande
const createOrder = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      adress,
      meal,
      quantity,
      status,
      totalPrice,
      userId
    } = req.body;

    // Assuming you have decoded the user's token and have access to their ID
    const newOrder = new Order({
      name,
      email,
      phone,
      adress,
      meal,
      quantity,
      status,
      totalPrice,
      userId, 
    });

    await newOrder.save();

    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
};

// Obtenir toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('meal');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error});
  }
};

// Obtenir une commande par son ID
const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId).populate('meal');
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Error fetching order" });
  }
};

// Mettre à jour une commande par son ID
const updateOrderById = async (req, res) => {
  const orderId = req.params.id;
  const {
    name,
    email,
    phone,
    adress,
    meal,
    quantity,
    status,
    totalPrice,
  } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        name,
        email,
        phone,
        adress,
        meal,
        quantity,
        status,
        totalPrice,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Error updating order" });
  }
};

// Supprimer une commande par son ID
const deleteOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findByIdAndRemove(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Error deleting order" });
  }
};

const showOrdersByuserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ userId })
      .populate('meal') // Populate the 'meal' field
      .exec();

    if (!orders) {
      return res.status(404).json({ message: 'No orders were found' });
    }

    // Split the Mealpicture field in each meal and replace it with just the filename
    orders.forEach(order => {
      if (order.meal && order.meal.Mealpicture) {
        const mealPictureSegments = order.meal.Mealpicture.split('/');
        const mealPictureFilename = mealPictureSegments[mealPictureSegments.length - 1];
        order.meal.Mealpicture = mealPictureFilename;
      }
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders by userId:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const countOrdersByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orderCount = await Order.countDocuments({ userId });

    res.json({ orderCount });
  } catch (error) {
    console.error('Error counting orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  showOrdersByuserId,
  countOrdersByUserId
};