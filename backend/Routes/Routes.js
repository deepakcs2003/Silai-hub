const express = require('express');
const getSingleProduct = require('../Controller/GetSingleProduct');
const getAllProduct = require('../Controller/GetAllProduct');
const router = express.Router();

router.get("/get_single_product", getSingleProduct); // Corrected route path


router.get("/gel_all_product",getAllProduct);



module.exports = router;
