const express = require('express');
const { addProduct } = require('../Controller/productController/addProduct');
const authToken = require('../Middleware/authMiddleware');
const { updateProduct } = require('../Controller/productController/updateProduct');
const { deleteProduct } = require('../Controller/productController/deleteProduct');
const getProduct = require('../Controller/productController/GetProduct');
const router = express.Router();

router.post("/add_product",authToken,addProduct);

router.post("/update_product",authToken,updateProduct);

router.delete("/delete_product",authToken,deleteProduct);

router.get("/get_product",authToken,getProduct);

module.exports = router;