import React from 'react';
import {
    FaTags,
    FaTruck,
    FaCheckCircle,
    FaTimesCircle,
    FaPercentage,
    FaShoppingCart
} from 'react-icons/fa';

const PriceDetails = ({ product }) => {
    // Calculate discounted prices
    const tailorDiscountedPrice = product.tailorPrice
        ? (product.tailorPrice - (product.tailorPrice * product.discount) / 100).toFixed(2)
        : 'N/A';

    const readyMadeDiscountedPrice = product.readyMadePrice
        ? (product.readyMadePrice - (product.readyMadePrice * product.discount) / 100).toFixed(2)
        : 'N/A';

    // Calculate discount savings
    const tailorSavings = product.tailorPrice
        ? (product.tailorPrice - tailorDiscountedPrice).toFixed(2)
        : 'N/A';

    const readyMadeSavings = product.readyMadePrice
        ? (product.readyMadePrice - readyMadeDiscountedPrice).toFixed(2)
        : 'N/A';

    return (
        <div className="w-full max-w-full mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Discount Badge - Responsive Positioning */}
            <div className='flex justify-between '>
                <div className="bg-gradient-to-r w-1/2 from-blue-600 to-purple-700 text-white p-4 md:p-6 text-center">
                    <h2 className="text-base md:text-3xl font-bold flex items-center justify-start gap-3">
                        <FaShoppingCart />
                        Price Details
                    </h2>
                </div>

                <div className=" bg-red-500 text-white  px-3 py-1 w-1/2 flex items-center flex justify-center gap-2  text-sm md:text-base">
                    <FaPercentage />
                    <span className="font-bold">{product.discount}% OFF</span>
                </div>

                {/* Header - Responsive Typography */}

            </div>


            {/* Pricing Section - Flexible Layout */}
            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Discounted Prices Section */}
                <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-lg">
                    <h3 className="text-lg md:text-xl font-bold text-green-800 mb-3 md:mb-4 flex items-center gap-2">
                        <FaTags className="text-green-600" /> Discounted Prices
                    </h3>

                    <div className="space-y-2 md:space-y-3">
                        {/* tailor Price - Responsive Flex Layout */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                            <span className="text-gray-700 font-bold  text-center w-full md:w-auto md:text-left text-sm md:text-base">tailor Price:</span>
                            <div className="flex md:flex-row items-center gap-2 md:gap-3">
                                <span className="line-through text-gray-500 text-sm md:text-base">₹{product.tailorPrice}</span>
                                <span className="font-bold text-green-700 text-base md:text-xl">₹{tailorDiscountedPrice}</span>
                                <span className="text-green-600 font-semibold text-sm md:text-base">(-₹{tailorSavings})</span>
                            </div>
                        </div>

                        {/* Ready-made Price - Responsive Flex Layout */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                            <span className="text-gray-700 font-bold text-center w-full md:w-auto md:text-left text-sm md:text-base">Ready-made Price:</span>
                            <div className="flex  md:flex-row items-center gap-2 md:gap-3">
                                <span className="line-through text-gray-500 text-sm md:text-base">₹{product.readyMadePrice}</span>
                                <span className="font-bold text-green-700 text-base md:text-xl">₹{readyMadeDiscountedPrice}</span>
                                <span className="text-green-600 font-semibold text-sm md:text-base">(-₹{readyMadeSavings})</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information - Responsive Layout */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-lg">
                    <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4 flex items-center gap-2">
                        <FaTruck className="text-blue-600" /> Product Information
                    </h3>

                    <div className="space-y-2 md:space-y-3">
                        {/* Availability */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 flex items-center gap-2 text-sm md:text-base">
                                <FaCheckCircle className="text-green-500" /> Availability:
                            </span>
                            <span className={`font-semibold text-sm md:text-base ${product.availabilityStatus === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                                {product.availabilityStatus}
                            </span>
                        </div>

                        {/* Quantity in Stock */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 text-sm md:text-base">Quantity in Stock:</span>
                            <span className="font-semibold text-blue-700 text-sm md:text-base">{product.quantityInStock}</span>
                        </div>

                        {/* Shipping Cost */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 text-sm md:text-base">Shipping Cost:</span>
                            <span className="font-semibold text-blue-700 text-sm md:text-base">₹{product.shippingCost}</span>
                        </div>

                        {/* Estimated Delivery */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 text-sm md:text-base">Estimated Delivery:</span>
                            <span className="font-semibold text-blue-700 text-sm md:text-base">{product.estimatedDeliveryTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceDetails;