const express = require('express');
const addFeedback = require('../Controller/FeedbackController/addFeedback');
const authToken = require('../Middleware/authMiddleware');
const updateFeedback = require('../Controller/FeedbackController/updateFeedback');
const deleteFeedback = require('../Controller/FeedbackController/deleteFeedback');
const getAllFeedback = require('../Controller/productController/getAllFeedback');
const getUserFeedback = require('../Controller/FeedbackController/getUserFeedback');
const router = express.Router();

router.post('/add',authToken,addFeedback);
router.post('/update', authToken, updateFeedback); // Assuming the same controller handles updates
router.delete('/delete', authToken, deleteFeedback); // Assuming the same controller handles updates
router.get('/getAll',getAllFeedback);
router.get('/getUserFeedback',authToken,getUserFeedback);

module.exports = router;