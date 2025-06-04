const mongoose = require('mongoose');

// Order Schema
const OrderSchema = new mongoose.Schema({
    // Embedded Customer Details
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Referencing the User model
        required: true,
    },
    customer: {
        name: { type: String, required: true }, // Customer Name
        email: { type: String, required: true }, // Customer Email
        phone: { type: String, required: true }, // Customer Phone Number
        address: {
            street: { type: String }, // Street Address
            city: { type: String }, // City
            state: { type: String }, // State
            pincode: { type: String }, // Pincode
            country: { type: String, default: 'India' }, // Default: India
        },
    },

    // Order Type: Readymade or Tailor-Made
    orderType: { type: String, enum: ['readymade', 'tailor', 'custom'], required: true },

    // Product details
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

    clothPic: [{
        type: String,
        required: function () {
            return this.orderType === 'tailor' || this.orderType === 'custom';
        },
    }],
    color: {
        type: String,
        required: function () {
            return this.orderType === 'tailor' || this.orderType === 'custom';
        },
    },
    designDetails: {
        type: String,
        required: function () {
            return this.orderType === 'custom';
        },
    },
    designPic: [{
        type: String,
        required: function () {
            return this.orderType === 'custom';
        },
    }],
    Link:{
        type: String,
        required: function () {
            return this.orderType === 'custom';
        },
    },
    customerDetails: {
        type: Object, // Include more fields as needed
        required: true,
    },
    measurements:{
        blouse: {
            chest: { type: Number },
            waist: { type: Number },
            shoulder: { type: Number },
            length: { type: Number },
            sleeveLength: { type: Number },
            neckDepthFront: { type: Number },
            neckDepthBack: { type: Number },
        },
        dress: {
            chest: { type: Number },
            waist: { type: Number },
            hip: { type: Number },
            length: { type: Number },
            sleeveLength: { type: Number },
        },
        lehenga: {
            waist: { type: Number },
            hip: { type: Number },
            length: { type: Number },
        },
    },
    // Common Order Information
    orderDate: { type: Date, default: Date.now }, // Date when the order was placed
    deliveryDate: { type: Date }, // Expected delivery date
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], required: true }, // Payment status
    paymentType: {
        type: String,
        enum: ['COD', 'UPI'], // Allowed values
        required: true, // Optional: Add this if paymentType is mandatory
    },
    totalPrice: { type: Number, required: true }, // Total price of the order
    specialInstructions: { type: String }, // Any special instructions provided by the customer
    orderStatus: { type: String, enum: ['pending', 'in-process', 'completed', 'cancelled'], default: 'pending' }, // Order status
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
