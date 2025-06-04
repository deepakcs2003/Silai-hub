const Product = require("../Models/productSchema");

const getAllProduct = async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();

        // Check if products exist
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        // Send the fetched products as a response
        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching products:", err);

        // Send a generic error response
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = getAllProduct;
 