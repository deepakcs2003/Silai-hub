const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    // Basic Product Information
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Lehenga', 'Suit', 'Blouse', 'tailor', 'Dress', 'Saree', 'Others'],
        required: true
    },
    description: {
        type: String,
    },
    productType: {
        type: String,
        enum: ['readymade', 'Custom-made', 'Semi-stitched', 'tailor'],
    },
    color:{
        type:String,
    },
    // Price and Stock Details
    price: {
        type: Number,
    },
    tailorPrice: {  
        type: Number,
        required: function() { return this.productType === 'tailor'; }
    },
    readyMadePrice: {  
        type: Number,
        required: function() { return this.productType === 'readymade'; }
    },
    discount: {
        type: Number,
        default: 0
    },
    discountedPrice: {
        type: Number,
        default: function() {
            return this.discount ? this.price - (this.price * this.discount) / 100 : this.price;
        }
    },
    quantityInStock: {
        type: Number,
        required: true,
        min: 0
    },

    // Additional Product Details Specific to Categories
    fabricType: {
        type: String,
        required: true,
        enum: ['Cotton', 'Silk', 'Satin', 'Georgette', 'Linen', 'Chiffon', 'Velvet', 'Other']
    },
    stitchingType: {
        type: String,
        enum: ['Machine Stitching', 'Hand Stitching', 'Mixed'],
        default: 'Machine Stitching'
    },
    pattern: {
        type: String,
        enum: ['Plain', 'Embroidered', 'Printed', 'Dyed', 'Geometric', 'Floral', 'Polka Dots', 'Other'],
    },
    embellishments: {
        type: [String],  // Store any embellishments like 'Zari Work', 'Sequin', 'Stone Work', etc.
        default: []
    },

    // Customization Details
    customizationAvailable: {
        type: Boolean,
        default: false
    },
   
    images: [
        {
            url: { type: String, required: true },
        },
    ],
    video: {
        type: String, 
        default: ''
    },

    // Shipping and Delivery
    shippingCost: {
        type: Number,
    },
    estimatedDeliveryTime: {
        type: String,
    },

    // Product Availability
    availabilityStatus: {
        type: String,
        enum: ['Available', 'Out of Stock', 'Discontinued'],
        default: 'Available'
    },
    featuredProduct: {
        type: Boolean,
        default: false
    },
    seasonalTags: {
        type: [String],
        default: []
    },

    // Specific Fields for Suit, Lehenga, Blouse, etc.
    blouseDetails: {
        type: Object,
        required: function() {
            return this.category === 'Blouse';  // Add this condition for Blouse category
        },
        properties: {
            sleeveType: {
                type: String,
                enum: ['Short Sleeve', 'Long Sleeve', 'Sleeveless', '3/4 Sleeve', 'Full Sleeve'],
                default: 'Short Sleeve',
                description: 'Select the sleeve style for the blouse.'
            },
            blouseBackDesign: {
                type: String,
                enum: ['Open Back', 'Closed Back', 'Tie Back', 'Other'],
                default: 'Closed Back',
                description: 'Choose the type of back design for your blouse.'
            },
            necklineStyle: {
                type: String,
                enum: ['Round Neck', 'V-Neck', 'Square Neck', 'Collared', 'Boat Neck', 'Other'],
                description: 'Select the neckline style for your blouse.'
            },
            fitType: {
                type: String,
                enum: ['Regular Fit', 'Slim Fit', 'Loose Fit'],
                default: 'Regular Fit',
                description: 'Choose the fit type for the blouse.'
            },
            embellishments: {
                type: [String], // Embellishments like beads, stones, sequins
                default: [],
                description: 'List of any embellishments on the blouse, such as sequins, beads, or embroidery.'
            },
            padding: {
                type: Boolean,
                default: false, 
                description: 'Indicates whether the blouse comes with padding.'
            },
            lining: {
                type: Boolean,
                default: false, 
                description: 'Indicates whether the blouse is lined.'
            }
        }
    },

    suitDetails: {
        type: Object,
        required: function() {
            return this.category === 'Suit';  // Add this condition for Suit category
        },
        properties: {
            sleeveType: {
                type: String,
                enum: ['Short Sleeve', 'Long Sleeve', 'Sleeveless', '3/4 Sleeve', 'Full Sleeve'],
                default: 'Short Sleeve',
                description: 'Select the sleeve style for the suit.'
            },
            fitType: {
                type: String,
                enum: ['Regular Fit', 'Slim Fit', 'Loose Fit'],
                default: 'Regular Fit',
                description: 'Choose the fit type for the suit.'
            },
            style: {
                type: String,
                enum: ['Straight Cut', 'Anarkali', 'Floor Length', 'Straight Pant', 'Palazzo', 'Other'],
                description: 'Choose the style of the suit.'
            },
            fabricType: {
                type: String,
                enum: ['Cotton', 'Silk', 'Chiffon', 'Georgette', 'Linen', 'Other'],
                description: 'Choose the fabric type for the suit.'
            }
        }
    },

    lehengaDetails: {
        type: Object,
        required: function() {
            return this.category === 'Lehenga';  // Add this condition for Lehenga category
        },
        properties: {
            lehengaType: {
                type: String,
                enum: ['A-Line', 'Circular', 'Mermaid', 'Straight Cut', 'Flared', 'Other'],
                default: 'A-Line',
                description: 'Select the type of lehenga (e.g., A-Line, Circular, Flared).'
            },
            lehengaWaist: {
                type: Number, // Waist size for the lehenga
                description: 'Enter the waist size for the lehenga.'
            },
            lehengaDupattaIncluded: {
                type: Boolean,
                default: true, 
                description: 'Indicates whether the lehenga includes a dupatta.'
            },
            lehengaFabric: {
                type: String,
                enum: ['Silk', 'Georgette', 'Satin', 'Chiffon', 'Cotton', 'Other'],
                description: 'Choose the fabric for the lehenga.'
            },
            embroidery: {
                type: String,
                enum: ['Handwork', 'Machine Embroidery', 'No Embroidery', 'Other'],
                description: 'Specify the type of embroidery work used on the lehenga.'
            }
        }
    },

    sareeDetails: {
        type: Object,
        required: function() {
            return this.category === 'Saree';  // Add this condition for Saree category
        },
        properties: {
            sareeLength: {
                type: Number,  // Length of the Saree in meters
                description: 'Enter the length of the saree (usually 5 to 9 meters).'
            },
            pleated: {
                type: Boolean,
                default: false, 
                description: 'Indicates whether the pleats of the saree are already done.'
            },
            embroideryDetails: {
                type: String,
                default: 'Custom Embroidery based on requirements', 
                description: 'Provide details about the type of embroidery work (if any).'
            },
            sareeFabric: {
                type: String,
                enum: ['Silk', 'Chiffon', 'Georgette', 'Satin', 'Cotton', 'Other'],
                default: 'Silk', 
                description: 'Choose the fabric for the saree.'
            },
            blouseType: {
                type: String,
                enum: ['Unstitched Blouse', 'Pre-Stitched Blouse', 'Custom Blouse'],
                description: 'Choose the blouse type with the saree.'
            },
            borderStyle: {
                type: String,
                enum: ['Plain', 'Zari Work', 'Embroidery', 'Sequins', 'Other'],
                description: 'Specify the style of the saree border.'
            },
            drapeStyle: {
                type: String,
                enum: ['Nivi', 'Bengali', 'Maharashtrian', 'Other'],
                description: 'Choose the drape style for the saree.'
            }
        }
    },

    // Tags for easier search
    tags: {
        type: [String],
        default: []
    },

    // Admin Controls
    dateAdded: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    productStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
