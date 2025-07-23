import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // import useNavigate
import { AppContext } from '../App';
import FeedBackForm from '../Components/FeedbackComponents/FeedBackForm';
import FeedbackCard from '../Components/FeedbackComponents/FeedbackCard';
import { toast } from 'react-toastify';
import summaryApi from '../Common';
 
const FeedbackPage = () => {
    const navigate = useNavigate();  // initialize navigate
    const { loading, allFeedback, fetchFeedback } = useContext(AppContext);
    const [getUserFeedback, setUserFeedback] = useState([]);
    const [othersFeedback, setOthersFeedback] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showAllFeedback, setShowAllFeedback] = useState(6);
    const [showAllUserFeedback, setShowAllUserFeedback] = useState(6);
    const [editingFeedback, setEditingFeedback] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        if (!currentUserId) {
            navigate('/login');  // Redirect to login page if userId not found
        } else {
            fetchFeedback();
        }
    }, [currentUserId, navigate, fetchFeedback]);

    useEffect(() => {
        if (allFeedback && allFeedback.length > 0) {
            const sorted = [...allFeedback].sort((a, b) => {
                if (b.rating !== a.rating) return b.rating - a.rating;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setUserFeedback(sorted.filter((fb) => fb.userId === currentUserId));
            setOthersFeedback(sorted.filter((fb) => fb.userId !== currentUserId));
        }
    }, [allFeedback, currentUserId]);

    const handleEdit = (feedback) => {
        setEditingFeedback(feedback);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (feedbackId) => {
        try {
            const response = await fetch(summaryApi.delete_feedback.url, {
                method: summaryApi.delete_feedback.method,
                body: JSON.stringify({ feedbackId }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

            toast.success("Feedback deleted");
            fetchFeedback();
        } catch (error) {
            console.error("Delete failed:", error);
            toast.error("Failed to delete feedback");
        }
    };

    const handleEditCancel = () => {
        setShowForm(false);
        setEditingFeedback(null);
        setIsEditing(false);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingFeedback(null);
        setIsEditing(false);
        fetchFeedback();
    };

    return (
        <div className="max-w-7xl font-body mx-auto px-4 py-8">
            <h2 className="text-2xl text-fs-2 font-bold mb-6 text-center text-blue-700">Submit or Edit Your Feedback</h2>

            {/* Feedback Form */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-blue-100">
                <FeedBackForm
                    feedback={editingFeedback}
                    onSuccess={handleFormSuccess}
                    buttonLabel={isEditing ? "Update Feedback" : "Submit Feedback"}
                    isEdit={isEditing}
                />
                {isEditing && (
                    <div className="text-right mt-2">
                        <button
                            onClick={handleEditCancel}
                            className="text-sm text-fs-6 text-red-500 hover:underline"
                        >
                            Cancel Edit
                        </button>
                    </div>
                )}
            </div>

            {/* USER FEEDBACK */}
            <h2 className="text-xl text-fs-2 font-semibold my-4 text-gray-800">Your Feedback</h2>
            {getUserFeedback.length ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {getUserFeedback.slice(0, showAllUserFeedback).map((feedback) => (
                            <FeedbackCard
                                key={feedback._id}
                                feedback={feedback}
                                isOwner={true}
                                onEdit={() => handleEdit(feedback)}
                                onDelete={() => handleDelete(feedback._id)}
                            />
                        ))}
                    </div>
                    {getUserFeedback.length > showAllUserFeedback && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowAllUserFeedback((prev) => prev + 6)}
                                className="text-blue-600 text-fs-6 font-body hover:underline font-medium"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-500 text-fs-6">You have not submitted any feedback yet.</p>
            )}

            {/* OTHERS' FEEDBACK */}
            <h2 className="text-xl text-fs-2 font-body font-semibold my-6 text-gray-800">Feedback From Others</h2>
            {othersFeedback.length ? (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {othersFeedback.slice(0, showAllFeedback).map((feedback) => (
                            <FeedbackCard
                                key={feedback._id}
                                feedback={feedback}
                                isOwner={false}
                            />
                        ))}
                    </div>
                    {othersFeedback.length > showAllFeedback && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => setShowAllFeedback((prev) => prev + 6)}
                                className="text-fs-6 text-blue-600 hover:underline font-medium"
                            >
                                Show More
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-gray-500 text-fs-6">No feedback from other users yet.</p>
            )}
        </div>
    );
};

export default FeedbackPage
