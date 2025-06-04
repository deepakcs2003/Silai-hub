const feedback = require('../../Models/feedback');

const deleteFeedback = async (req, res) => {
    try{
        const {feedbackId} = req.body;
        // Validate required fields
        if (!feedbackId) {
            return res.status(400).json({ success: false, message: 'Feedback ID is required' });
        }
        // Find the feedback by ID
        const existingFeedback = await feedback.findById(feedbackId);
        if (!existingFeedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found' });
        }
        // Delete the feedback
        await feedback.findByIdAndDelete(feedbackId);
        // Send success response
        return res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
    }catch(err){
        console.error("Error deleting feedback:", err);
        return res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}
module.exports = deleteFeedback;