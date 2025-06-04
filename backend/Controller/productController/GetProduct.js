const Product = require('../../Models/productSchema'); // Import the Product model

const getProduct = async (req, res) => {
    try {
        // Retrieve all products from the database
        const products = await Product.find();

        // If no products are found, send a 404 response
        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        // If products are found, send them in the response
        res.status(200).json({ success: true, products });
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

module.exports = getProduct;