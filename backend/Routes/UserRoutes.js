const express = require('express');
const { createOrder, updateOrder, cancelOrder } = require('../Controller/OrderController/OrderController');
const authToken = require('../Middleware/authMiddleware');
const {addToCart, removeFromCart, updateCartQuantity } = require('../Controller/OrderController/AddToCartController');
const { getAddToCart } = require('../Controller/OrderController/GetAddToCart');
const router = express.Router();

// Import the controller

// Route to create a new order
router.post('/create', authToken, createOrder);

// Route to update an existing order
router.put('/update', authToken, updateOrder);

// Route to cancel an existing order
router.delete('/cancel', authToken, cancelOrder);

// Route to add to cart, update cart items (increase/decrease quantity), or remove items
router.post('/cart', authToken, addToCart);

router.get("/get_all_cart",authToken,getAddToCart);

router.post("/delete_add_to_cart",authToken,removeFromCart);

router.post("/updateCartQuantity",authToken,updateCartQuantity);

module.exports = router;
