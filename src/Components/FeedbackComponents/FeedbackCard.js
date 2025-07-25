import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const icons = {
  Star: dynamic(() => import('lucide-react').then(mod => mod.Star)),
  Edit: dynamic(() => import('lucide-react').then(mod => mod.Edit)),
  Trash2: dynamic(() => import('lucide-react').then(mod => mod.Trash2)),
  MoreVertical: dynamic(() => import('lucide-react').then(mod => mod.MoreVertical))
};

const FeedbackCard = ({ feedback, isOwner, onUpdate, onEdit, onDelete }) => {
    const [showActions, setShowActions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showFullComment, setShowFullComment] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            month: date.toLocaleString('en-US', { month: 'short' }),
            day: date.toLocaleString('en-US', { day: 'numeric' }),
            year: date.toLocaleString('en-US', { year: '2-digit' }),
        };
    };

    const renderStars = (rating) => (
        [...Array(5)].map((_, i) => (
            React.createElement(icons.Star, {
                key: i,
                className: `h-4 w-4 ${i < rating ? 'text-green-500 fill-current' : 'text-gray-300'}`
            })
        ))
    );

    const getCardColor = (rating) => {
        if (rating >= 4) return 'bg-gradient-to-br from-blue-200 to-cyan-200 border-blue-300';
        if (rating >= 3) return 'bg-gradient-to-br from-yellow-100 to-amber-200 border-yellow-300';
        return 'bg-gradient-to-br from-rose-200 to-purple-100 border-rose-300';
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                onUpdate?.();
            }, 1000);
            onDelete?.(feedback._id);
            setShowActions(false);
        }
    };

    const getInitials = (name) => (
        name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'U'
    );

    const { month, day, year } = formatDate(feedback.updatedAt);

    return (
        <div className={`relative group rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border ${getCardColor(feedback.rating)} overflow-hidden`}>
            {loading && (
                <div className="absolute inset-0 z-30 bg-white bg-opacity-90 flex justify-center items-center rounded-xl">
                    <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full" />
                </div>
            )}

            <div className="p-4 space-y-3">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 overflow-hidden">
                        {feedback.profile_picture ? (
                            <img src={feedback.profile_picture} alt={feedback.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                        ) : (
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {getInitials(feedback.name)}
                            </div>
                        )}
                        <span className="font-semibold text-sm text-gray-900 truncate max-w-[120px]">{feedback.name}</span>
                    </div>

                    {isOwner && (
                        <div className="relative">
                            <button onClick={() => setShowActions(!showActions)} className="p-1.5 rounded hover:bg-gray-100">
                                {React.createElement(icons.MoreVertical, { className: "h-4 w-4 text-gray-500" })}
                            </button>
                            {showActions && (
                                <div className="absolute right-0 top-full mt-2 z-20 bg-white rounded shadow-lg border w-32">
                                    <button onClick={() => { onEdit?.(feedback); setShowActions(false); }} className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        {React.createElement(icons.Edit, { className: "w-4 h-4" })} Edit
                                    </button>
                                    <button onClick={handleDelete} className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        {React.createElement(icons.Trash2, { className: "w-4 h-4" })} Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Rating */}
                <div className="flex justify-between items-center">
                    <div className="flex gap-1">{renderStars(feedback.rating)}</div>
                    <span className="text-xs font-medium text-gray-500">{feedback.rating}/5</span>
                </div>

                {/* Comment */}
                <div className="text-sm text-gray-700 leading-relaxed break-words">
                    {showFullComment ? feedback.comments : (feedback.comments?.slice(0, 20) || '')}
                    {feedback.comments?.length > 100 && (
                        <button onClick={() => setShowFullComment(!showFullComment)} className="text-blue-600 ml-1 text-xs font-medium">
                            {showFullComment ? 'Show less' : '...View full comment'}
                        </button>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end border-t pt-3 border-gray-100 flex-wrap">
                    {feedback.screenshotUrl && (
                        <img
                            src={feedback.screenshotUrl}
                            alt="screenshot"
                            className="w-14 h-14 object-contain rounded border border-gray-200 mt-2"
                        />
                    )}
                    <div className="text-xs text-right text-gray-600 mt-2 ml-auto">
                        <div><span className="font-medium">Month:</span> {month}</div>
                        <div><span className="font-medium">Day:</span> {day}</div>
                        <div><span className="font-medium">Year:</span> {year}</div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default FeedbackCard;
