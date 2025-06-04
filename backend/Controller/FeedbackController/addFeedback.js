const feedback = require('../../Models/feedback');

const addFeedback = async (req, res) => {
    try{
        const { userId, name, email, profile_picture, rating, comments, screenshotUrl } = req.body;
        console.log("Feedback data received:", req.body);
        // Validate required fields
        if (!userId || !name || !email || !comments || (rating !== undefined && (rating < 1 || rating > 5))) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Create a new feedback object
        const newFeedback = new feedback({
            userId,
            name,
            email,
            profile_picture: profile_picture || '',
            rating: rating || null,
            comments,
            screenshotUrl: screenshotUrl || ''
        });

        // Save the feedback to the database
        await newFeedback.save();

        // Send success response
        return res.status(201).json({ success: true, message: 'Feedback added successfully', feedback: newFeedback });
    }catch(err){
        console.error("Error adding feedback:", err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}
module.exports = addFeedback;