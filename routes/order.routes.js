const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  showOrdersByuserId,
  countOrdersByUserId
} = require("../controllers/order.controller");

// Route pour créer une nouvelle commande
router.post("/orders", createOrder);

// Route pour obtenir toutes les commandes
router.get("/orders", getAllOrders);
// Show orders by userId
router.get("/showOrdersByuserId/:userId", showOrdersByuserId);
//Count orders by userId 
router.get("/countOrdersByUserId/:userId", countOrdersByUserId);

// Route pour obtenir une commande par son ID
router.get("/orders/:id", getOrderById);

// Route pour mettre à jour une commande par son ID
router.put("/orders/:id", updateOrderById);

// Route pour supprimer une commande par son ID
router.delete("/orders/:id", deleteOrderById);

module.exports = router;
