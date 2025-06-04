const Product = require('../../Models/productSchema');  // Import the Product model

// Controller function to delete a product
const deleteProduct = async (req, res) => {
    try {
        // Extract the productId from the request body
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. You are not authorized to add products.'
            });
        }
        const { productId } = req.body;

        // Ensure productId is provided
        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required to delete the product'
            });
        }

        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(productId);

        // If no product is found, send a 404 response
        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Respond with success message
        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({
            message: 'Error deleting product',
            error: error.message
        });
    }
};

module.exports = {
    deleteProduct
};
