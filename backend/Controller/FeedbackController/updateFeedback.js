const feedback = require('../../Models/feedback');

const updateFeedback = async (req, res) => {
    try{
        const { feedbackId, userId, name, email, profile_picture, rating, comments, screenshotUrl } = req.body;

        // Validate required fields
        if (!feedbackId || !userId || !name || !email || !comments || (rating !== undefined && (rating < 1 || rating > 5))) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Find the feedback by ID
        const existingFeedback = await feedback.findById(feedbackId);
        if (!existingFeedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }

        // Update the feedback fields
        existingFeedback.userId = userId;
        existingFeedback.name = name;
        existingFeedback.email = email;
        existingFeedback.profile_picture = profile_picture || '';
        existingFeedback.rating = rating || null;
        existingFeedback.comments = comments;
        existingFeedback.screenshotUrl = screenshotUrl || '';

        // Save the updated feedback to the database
        await existingFeedback.save();

        // Send success response
        return res.status(200).json({ success: true, message: 'Feedback updated successfully', feedback: existingFeedback });
    }catch(err){
        console.error("Error updating feedback:", err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}

module.exports = updateFeedback;