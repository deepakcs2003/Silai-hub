const Product = require('../../Models/productSchema');  // Import the Product model

// Controller function to update an existing product
const updateProduct = async (req, res) => {
    try {
        // Extract the product ID and updated product data from the request body
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. You are not authorized to add products.'
            });
        }
        const { productId, ...updateData } = req.body;
        // Ensure productId is provided
        if (!productId) {
            return res.status(400).json({
                message: 'Product ID is required to update the product'
            });
        }

        // Find the product by its ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, // Product ID to find
            updateData, // All other fields to update (extracted from req.body)
            { new: true } // Return the updated document
        );

        // If no product is found with the given ID, send a 404 response
        if (!updatedProduct) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Respond with the updated product
        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error) {
        // Handle errors and send an error response
        console.error(error);
        res.status(500).json({
            message: 'Error updating product',
            error: error.message
        });
    }
};

module.exports = {
    updateProduct
};
