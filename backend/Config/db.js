const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        return connection;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error; // Make sure to throw the error to handle it in the .catch() block
    }
};

module.exports = dbConnect;