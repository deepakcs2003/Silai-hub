import React, { useState } from 'react';
import { Star, Edit, Trash2, User, Calendar, MessageCircle, MoreVertical, X, Eye, Image } from 'lucide-react';

const FeedbackCard = ({ feedback, isOwner, onUpdate, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [loading, setLoading] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: '2-digit',
        });
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`h-4 w-4 transition-colors ${index < rating ? 'text-amber-400 fill-current' : 'text-gray-300'
                    }`}
            />
        ));
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                if (onUpdate) onUpdate();
            }, 1000);
        }
        onDelete?.(feedback._id);
        setShowActions(false);
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'bg-green-100 text-green-700';
        if (rating >= 3) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    const getCardColor = (rating) => {
        if (rating >= 4) return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200';
        if (rating >= 3) return 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200';
        return 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200';
    };

    const truncateText = (text, limit = 120) => {
        if (!text) return '';
        return text.length > limit ? text.slice(0, limit) + '...' : text;
    };

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U';
    };

    return (
        <>
            <div className={`relative group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${getCardColor(feedback.rating)} overflow-hidden`}>
                {/* Loading overlay */}
                {loading && (
                    <div className="absolute inset-0 z-30 bg-white bg-opacity-90 flex justify-center items-center rounded-xl">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <span className="text-sm text-gray-600">Processing...</span>
                        </div>
                    </div>
                )}

                <div className="p-4">
                    {/* Header - Name, Profile Picture and Actions */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                            {/* Profile Picture or Initials */}
                            <div className="flex-shrink-0">
                                {feedback.profile_picture ? (
                                    <img
                                        src={feedback.profile_picture}
                                        alt={feedback.name}
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                        {getInitials(feedback.name)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 text-sm truncate">
                                    {feedback.name}
                                </h3>
                            </div>
                        </div>

                        {/* Actions */}
                        {isOwner && (
                            <div className="relative">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowActions(!showActions);
                                    }}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                    disabled={loading}
                                >
                                    <MoreVertical className="h-4 w-4 text-gray-500" />
                                </button>

                                {showActions && (
                                    <div className="absolute top-full right-0 z-20 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 min-w-[140px] overflow-hidden">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onEdit?.(feedback);
                                                setShowActions(false);
                                            }}
                                            className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors flex items-center text-gray-700"
                                        >
                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowActions(false);
                                                handleDelete();
                                            }}
                                            className="w-full px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Rating Stars */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                            {renderStars(feedback.rating)}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{feedback.rating}/5</span>
                    </div>

                    {/* Truncated Comments */}
                    <div className="mb-3">
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
                            {truncateText(feedback.comments, 80)}
                        </p>
                    </div>

                    {/* Footer with View Details */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                            {feedback.screenshotUrl && (
                                <div className="flex items-center">
                                    <img
                                        src={feedback.screenshotUrl}
                                        alt="Feedback screenshot"
                                        className="w-14 h-14 object-contain rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setShowDetails(true)}
                            className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            <span>View Details</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
                    <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
                            <h2 className="text-xl font-semibold text-gray-900">Feedback Details</h2>
                            <button
                                onClick={() => setShowDetails(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* User Info */}
                            <div className="flex items-center space-x-4 mb-6">
                                {feedback.profile_picture ? (
                                    <img
                                        src={feedback.profile_picture}
                                        alt={feedback.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                                        {getInitials(feedback.name)}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{feedback.name}</h3>
                                    <p className="text-gray-600">{feedback.email}</p>
                                    {feedback.createdAt && (
                                        <div className="flex items-center mt-1 text-sm text-gray-500">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {formatDate(feedback.createdAt)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="mb-6">
                                <div className="flex items-center space-x-2 mb-2">
                                    <span className="text-sm font-medium text-gray-700">Rating:</span>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                                        {feedback.rating}/5
                                    </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {renderStars(feedback.rating)}
                                </div>
                            </div>

                            {/* Full Comments */}
                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-2">Comments:</h4>
                                <div className="max-h-40 overflow-y-auto break-words whitespace-pre-wrap p-2 border rounded bg-gray-50 text-gray-800 leading-relaxed">
                                    {feedback.comments}
                                </div>
                            </div>


                            {/* Screenshot */}
                            {feedback.screenshotUrl && (
                                <div>
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Screenshot:</h4>
                                    <img
                                        src={feedback.screenshotUrl}
                                        alt="Feedback screenshot"
                                        className="w-full max-h-96 object-contain rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Close actions menu when clicking outside */}
            {showActions && (
                <div className="fixed inset-0 z-10" onClick={() => setShowActions(false)} />
            )}
        </>
    );
};

export default FeedbackCard;