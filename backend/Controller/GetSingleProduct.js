const Product = require("../Models/productSchema");

const getSingleProduct = async (req, res) => {
    try {
        // Extract productId from query parameters
        const { productId } = req.query;

        // Validate productId
        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);

        // If the product is not found, send a 404 response
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // If the product is found, send it in the response
        res.status(200).json({ success: true, product });
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
};

module.exports = getSingleProduct;
