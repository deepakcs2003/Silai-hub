const feedback=require('../../Models/feedback');

const getUserFeedback = async (req, res) => {
  try {
    const userId= req.user.id
    console.log("userId",userId);
    const feedbacks = await feedback.find({ userId: userId });

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this user.' });
    }

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}  
module.exports = getUserFeedback;
