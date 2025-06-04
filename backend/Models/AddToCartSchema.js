const mongoose = require('mongoose');

// Add to Cart Schema with Item-level Discount and ProductType
const addToCartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User Model
        required: true
    },
    cartItems: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to Product Model
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            },
            discount: {
                type: Number,
                default: 0, // Discount applied to each item
            },
            discountedPrice: {
                type: Number,
            },
            productType: {
                type: String,
                enum: ['tailor', 'readymade'], // Limit to possible types
                default: 'readymade' // Default value, adjust as needed
            },
            productName: {
                type: String,
            },
            image: [{
                type: String, // Array of image URLs (or paths)
            }],
            category: {
                type: String, // Category of the product
            }
        }
    ],
    totalCartValue: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0, // Discount applied to the total cart value
        required: true
    },
    finalTotal: {
        type: Number,
        required: true,
        default: 0 // Final price after applying all item-level discounts
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create model for AddToCart
module.exports = mongoose.model('AddToCart', addToCartSchema);
