const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required: function() {
            // Only require password if googleId is not present (i.e., regular sign-up)
            return !this.googleId;
        }
    },
    googleId: { 
        type: String, 
        unique: true,  // Ensures googleId is unique
        sparse: true,  // Allows for the possibility of null or undefined values
    },
    profile_picture: { 
        type: String 
    },
    role: {
        type: String,
        enum: ['general', 'admin', 'user'],  // Role can either be 'user', 'admin', or 'general'
        default: 'general'           // Default role is 'general'
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
});

// Create model for User
module.exports = mongoose.model('User', userSchema);
