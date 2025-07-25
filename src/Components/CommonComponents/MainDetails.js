import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const icons = {
    Info: dynamic(() => import('lucide-react').then(mod => mod.Info)),
    Palette: dynamic(() => import('lucide-react').then(mod => mod.Palette)),
    Shirt: dynamic(() => import('lucide-react').then(mod => mod.Shirt)),
    Scissors: dynamic(() => import('lucide-react').then(mod => mod.Scissors)),
    Layers: dynamic(() => import('lucide-react').then(mod => mod.Layers)),
    Tag: dynamic(() => import('lucide-react').then(mod => mod.Tag)),
    CheckCircle2: dynamic(() => import('lucide-react').then(mod => mod.CheckCircle2)),
    AlertCircle: dynamic(() => import('lucide-react').then(mod => mod.AlertCircle)),
    ChevronDown: dynamic(() => import('lucide-react').then(mod => mod.ChevronDown)),
    ChevronUp: dynamic(() => import('lucide-react').then(mod => mod.ChevronUp))
};

const DetailItem = ({ icon, label, value, variant = 'default' }) => {
    const variants = {
        default: 'bg-blue-50 text-blue-800',
        highlight: 'bg-green-50 text-green-800',
        warning: 'bg-yellow-50 text-yellow-800'
    };
    
    const Icon = icons[icon];
    return (
        <div className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md ${variants[variant]}`}>
            <div className="flex items-center space-x-3">
                {React.createElement(Icon, { className: "w-5 h-5 opacity-70" })}
                <span className="font-semibold text-sm md:text-base">{label}</span>
            </div>
            <span className="font-medium text-sm md:text-base truncate max-w-[50%] text-right">{value}</span>
        </div>
    );
};

const MainDetails = ({ product }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [expandedDetails, setExpandedDetails] = useState(false);

    // Truncate description if it's too long
    const truncateDescription = (text, maxLength = 150) => {
        if (!text) return '';
        return text.length > maxLength
            ? text.substring(0, maxLength) + '...'
            : text;
    };

    const details = [
        {
            icon: 'AlertCircle',
            label: 'category',
            value: product?.category,
            variant: 'highlight'
        },
        {
            icon: 'Shirt',
            label: 'Product Type',
            value: product?.productType,
            variant: 'default'
        },
        {
            icon: 'Palette',
            label: 'Colors',
            value: product?.color,
            variant: 'highlight'
        },
        {
            icon: 'Layers',
            label: 'Fabric',
            value: product?.fabricType,
            variant: 'default'
        },
        {
            icon: 'Scissors',
            label: 'Stitching Type',
            value: product?.stitchingType,
            variant: 'default'
        },
        {
            icon: 'Tag',
            label: 'Pattern',
            value: product?.pattern,
            variant: 'highlight'
        },
        {
            icon: 'CheckCircle2',
            label: 'Customization',
            value: product?.customizationAvailable ? 'Available' : 'Not Available',
            variant: product?.customizationAvailable ? 'highlight' : 'warning'
        },
        {
            icon: 'AlertCircle',
            label: 'Availability',
            value: product?.availabilityStatus,
            variant: product?.availabilityStatus === 'In Stock' ? 'highlight' : 'warning'
        }
    ];

    return (
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-full">
            <div className="p-5 bg-blue-50">
                <div className="flex items-center mb-3">
                    {React.createElement(icons.Info, { className: "w-6 h-6 mr-3 text-blue-600" })}
                    <h2 className="text-xl font-bold text-blue-800">Product Description</h2>
                </div>

                <p className="text-gray-700 text-sm md:text-base whitespace-pre-line">
                    {showFullDescription
                        ? product?.description
                        : truncateDescription(product?.description)}
                </p>

                {product?.description && product.description.length > 150 && (
                    <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2 flex items-center"
                    >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                        {showFullDescription ? 
                            React.createElement(icons.ChevronUp, { className: "ml-1 w-4 h-4" })
                         : 
                            React.createElement(icons.ChevronDown, { className: "ml-1 w-4 h-4" })
                        }
                    </button>
                )}
            </div>

            {/* Details Section */}
            <div className="p-1">
                <div className="space-y-3">
                    {details.slice(0, expandedDetails ? details.length : 3).map((detail, index) => (
                        <DetailItem
                            key={index}
                            icon={detail.icon}
                            label={detail.label}
                            value={detail.value}
                            variant={detail.variant}
                        />
                    ))}

                    {details.length > 3 && (
                        <button
                            onClick={() => setExpandedDetails(!expandedDetails)}
                            className="w-full text-center text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center justify-center mt-3"
                        >
                            {expandedDetails ? 'Show Less' : `View All ${details.length} Details`}
                            {expandedDetails
                                ? React.createElement(icons.ChevronUp, { className: "ml-2 w-4 h-4" })
                                : React.createElement(icons.ChevronDown, { className: "ml-2 w-4 h-4" })}
                        </button>
                    )}
                </div>
            </div>


        </div>
    );
};

export default MainDetails;