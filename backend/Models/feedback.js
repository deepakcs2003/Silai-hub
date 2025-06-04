const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  profile_picture: {
    type: String,
    default: ''
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null
  },
  comments: {
    type: String,
    required: true
  },
  screenshotUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('Feedback', feedbackSchema);
