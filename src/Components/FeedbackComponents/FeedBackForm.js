import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import uploadMedia from '../../Common/uploadMedia';
import summaryApi from '../../Common';

const FaStar = dynamic(() => import('react-icons/fa').then(mod => mod.FaStar), {
  ssr: false
});

const FeedBackForm = ({ feedback, onSuccess, buttonLabel = "Submit Feedback", isEdit }) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId') || '',
    feedbackId: '',
    name: localStorage.getItem('name') || '',
    email: localStorage.getItem('email') || '',
    profile_picture: localStorage.getItem('profile_picture') || '',
    rating: 5,
    comments: '',
    screenshotUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (isEdit && feedback) {
      setFormData({
        userId: feedback.userId || localStorage.getItem('userId') || '',
        feedbackId: feedback._id || '',
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        profile_picture: localStorage.getItem('profile_picture') || '',
        rating: feedback.rating || 3,
        comments: feedback.comments || '',
        screenshotUrl: feedback.screenshotUrl || '',
      });
    }
  }, [feedback, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingClick = (ratingValue) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await uploadMedia(file);
      setFormData((prevData) => ({
        ...prevData,
        screenshotUrl: result.url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        isEdit ? summaryApi.update_feedback.url : summaryApi.add_feedback.url,
        {
          method: isEdit ? summaryApi.update_feedback.method : summaryApi.add_feedback.method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (data.success) {
        alert(isEdit ? 'Feedback updated!' : 'Feedback submitted!');
        onSuccess?.();

        if (!isEdit) {
          setFormData({
            userId: localStorage.getItem('userId') || '',
            feedbackId: '',
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
            profile_picture: localStorage.getItem('profile_picture') || '',
            rating: 3,
            comments: '',
            screenshotUrl: '',
          });
          setHoverRating(0);
        }
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">{isEdit ? 'Edit' : 'Submit'} Feedback</h2>

      {/* Rating stars */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Rating:</label>
        <div className="flex space-x-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => React.createElement(FaStar, {
              key: star,
              className: `cursor-pointer text-2xl transition duration-200 ${
                (hoverRating || formData.rating) >= star ? 'text-yellow-400' : 'text-gray-300'
              }`,
              onMouseEnter: () => setHoverRating(star),
              onMouseLeave: () => setHoverRating(0),
              onClick: () => handleRatingClick(star)
            }))}
        </div>
      </div>

      {/* Comments box */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Comments:</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          rows="4"
          required
          placeholder="Share your experience..."
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Screenshot Upload */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Upload Screenshot:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2"
        />
        {formData.screenshotUrl && (
          <img
            src={formData.screenshotUrl}
            alt="Uploaded Screenshot"
            className="w-40 h-40 object-cover rounded border"
          />
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Submitting...' : buttonLabel}
      </button>
    </form>
  );
};

export default FeedBackForm;
