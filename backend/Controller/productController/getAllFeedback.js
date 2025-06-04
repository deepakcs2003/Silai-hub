const feedback = require('../../Models/feedback');

const getAllFeedback = async (req, res) => {
    try {
        const allFeedback = await feedback.find();

        // If no feedback is found, send a 404 response
        if (!allFeedback || allFeedback.length === 0) {
            return res.status(404).json({ success: false, message: 'No feedback found' });
        }

        // If feedback is found, send it in the response
        res.status(200).json({ success: true, feedback: allFeedback });
    } catch (err) {
        // Handle any errors that occur
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}
module.exports = getAllFeedback;

