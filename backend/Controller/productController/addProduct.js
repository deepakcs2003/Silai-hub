const Product = require('../../Models/productSchema');  // Import the Product model

const addProduct = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: 'Access denied. You are not authorized to add products.'
            });
        }

        // Destructure the request body to get all product details
        const {
            productName,
            category,
            description,
            productType,
            price,
            tailorPrice,
            readyMadePrice,
            discount,
            color,
            quantityInStock,
            fabricType,
            stitchingType,
            pattern,
            embellishments,
            customizationAvailable,
            images,
            video,
            shippingCost,
            estimatedDeliveryTime,
            availabilityStatus,
            featuredProduct,
            seasonalTags,
            lehengaDetails,  // Make sure lehengaDetails is destructured here
            blouseDetails,
            suitDetails,
            sareeDetails,
            tags
        } = req.body;

        // Validate that lehengaDetails is provided for Lehenga category
        if (category === 'Lehenga' && !lehengaDetails) {
            return res.status(400).json({
                message: 'Lehenga details are required for Lehenga products.'
            });
        }

        // Create a new product instance using the request data
        const newProduct = new Product({
            productName,
            category,
            description,
            productType,
            price,
            tailorPrice,
            readyMadePrice,
            discount,
            color,
            discountedPrice: discount ? price - (price * discount) / 100 : price,
            quantityInStock,
            fabricType,
            stitchingType,
            pattern,
            embellishments,
            customizationAvailable,
            images,
            video,
            shippingCost,
            estimatedDeliveryTime,
            availabilityStatus,
            featuredProduct,
            seasonalTags,
            lehengaDetails, // Add lehengaDetails here
            blouseDetails,
            suitDetails,
            sareeDetails,
            tags
        });

        // Save the new product
        await newProduct.save();

        return res.status(201).json({
            message: 'Product added successfully!',
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'An error occurred while adding the product.',
            error: error.message
        });
    }
};

module.exports = {
    addProduct
};
