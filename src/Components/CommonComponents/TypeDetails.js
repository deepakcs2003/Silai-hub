import { Palette, Shirt, Scissors, Diamond, Info, Brush, Tag, FileText, Box } from 'lucide-react';
import { useState } from 'react';

const CategoryIcon = {
    'Blouse': Shirt,
    'Suit': Scissors,
    'Lehenga': Diamond,
    'Saree': Box,
};

const TypeDetails = ({ product }) => {
    const [showMore, setShowMore] = useState(false);

    const renderDetailsRow = (label, value, IconComponent, colorClass) => (
        <div className={`flex justify-between items-center py-3 border-b ${colorClass}`}>
            <div className="flex items-center gap-2">
                <IconComponent className="w-6 h-6 text-black sm:text-black" /> {/* Changed to text-black */}
                <span className="font-medium text-gray-700 text-sm sm:text-base">{label}</span>
            </div>
            <span className="text-gray-900 font-semibold text-sm sm:text-base">{value}</span>
        </div>
    );

    const renderCategoryDetails = () => {
        const CategoryIconComponent = CategoryIcon[product?.category] || Info;

        switch (product?.category) {
            case 'Blouse':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <CategoryIconComponent className="w-8 h-8 text-black" /> {/* Changed to text-black */}
                            <h2 className="text-xl sm:text-2xl font-bold text-black">Blouse Details</h2>
                        </div>
                        <div className="bg-red-50 p-4">
                            {renderDetailsRow('Sleeve Type', product.blouseDetails?.sleeveType || 'N/A', Brush, 'border-pink-300')}
                            {renderDetailsRow('Back Design', product.blouseDetails?.blouseBackDesign || 'N/A', Tag, 'border-pink-300')}
                            {showMore && (
                                <>
                                    {renderDetailsRow('Neckline Style', product.blouseDetails?.necklineStyle || 'N/A', Palette, 'border-pink-300')}
                                    {renderDetailsRow('Fit Type', product.blouseDetails?.fitType || 'N/A', Scissors, 'border-pink-300')}
                                    {renderDetailsRow('Embellishments', product.blouseDetails?.embellishments || 'None', Tag, 'border-pink-300')}
                                    {renderDetailsRow('Padding', product.blouseDetails?.padding ? 'Yes' : 'No', FileText, 'border-pink-300')}
                                    {renderDetailsRow('Lining', product.blouseDetails?.lining ? 'Yes' : 'No', FileText, 'border-pink-300')}
                                </>
                            )}
                        </div>
                        <button
                            className="text-pink-500 text-sm sm:text-base mt-2"
                            onClick={() => setShowMore((prev) => !prev)}
                        >
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                );

            case 'Suit':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <CategoryIconComponent className="w-8 h-8 text-black" /> {/* Changed to text-black */}
                            <h2 className="text-xl sm:text-2xl font-bold text-black">Suit Details</h2>
                        </div>
                        <div className="bg-red-50 p-4">
                            {renderDetailsRow('Sleeve Type', product.suitDetails?.sleeveType || 'N/A', Brush, 'border-blue-300')}
                            {renderDetailsRow('Fit Type', product.suitDetails?.fitType || 'N/A', Scissors, 'border-blue-300')}
                            {renderDetailsRow('Style', product.suitDetails?.style || 'N/A', Palette, 'border-blue-300')}
                            {showMore && (
                                <>
                                    {renderDetailsRow('Fabric Type', product.suitDetails?.fabricType || 'N/A', FileText, 'border-blue-300')}
                                </>
                            )}
                        </div>
                        <button
                            className="text-blue-500 text-sm sm:text-base mt-2"
                            onClick={() => setShowMore((prev) => !prev)}
                        >
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                );

            case 'Lehenga':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <CategoryIconComponent className="w-8 h-8 text-black" /> {/* Changed to text-black */}
                            <h2 className="text-xl sm:text-2xl font-bold text-black">Lehenga Details</h2>
                        </div>
                        <div className="bg-red-50 p-4">
                            {renderDetailsRow('Lehenga Type', product.lehengaDetails?.lehengaType || 'N/A', Shirt, 'border-purple-300')}
                            {renderDetailsRow('Waist Size', product.lehengaDetails?.lehengaWaist || 'N/A', Tag, 'border-purple-300')}
                            {showMore && (
                                <>
                                    {renderDetailsRow('Dupatta Included', product.lehengaDetails?.lehengaDupattaIncluded ? 'Yes' : 'No', Palette, 'border-purple-300')}
                                    {renderDetailsRow('Fabric', product.lehengaDetails?.lehengaFabric || 'N/A', FileText, 'border-purple-300')}
                                    {renderDetailsRow('Embroidery', product.lehengaDetails?.embroidery || 'N/A', Tag, 'border-purple-300')}
                                </>
                            )}
                        </div>
                        <button
                            className="text-purple-500 text-sm sm:text-base mt-2"
                            onClick={() => setShowMore((prev) => !prev)}
                        >
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                );

            case 'Saree':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            <CategoryIconComponent className="w-8 h-8 text-black" /> {/* Changed to text-black */}
                            <h2 className="text-xl sm:text-2xl font-bold text-black">Saree Details</h2>
                        </div>
                        <div className="bg-red-50 p-4">
                            {renderDetailsRow('Length', `${product.sareeDetails?.sareeLength || 'N/A'} meters`, Brush, 'border-green-300')}
                            {renderDetailsRow('Pleated', product.sareeDetails?.pleated ? 'Yes' : 'No', Scissors, 'border-green-300')}
                            {renderDetailsRow('Embroidery Details', product.sareeDetails?.embroideryDetails || 'N/A', FileText, 'border-green-300')}
                            {showMore && (
                                <>
                                    {renderDetailsRow('Fabric', product.sareeDetails?.sareeFabric || 'N/A', Palette, 'border-green-300')}
                                    {renderDetailsRow('Blouse Type', product.sareeDetails?.blouseType || 'N/A', Tag, 'border-green-300')}
                                    {renderDetailsRow('Border Style', product.sareeDetails?.borderStyle || 'N/A', Tag, 'border-green-300')}
                                    {renderDetailsRow('Drape Style', product.sareeDetails?.drapeStyle || 'N/A', FileText, 'border-green-300')}
                                </>
                            )}
                        </div>
                        <button
                            className="text-green-500 text-sm sm:text-base mt-2"
                            onClick={() => setShowMore((prev) => !prev)}
                        >
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                );

            default:
                return (
                    <div className="text-center py-6 text-gray-500">
                        <Info className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                        <p className="text-xl">No details available for this category</p>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-full mx-auto bg-blue-50 shadow-lg rounded-lg p-2 overflow-hidden">
            {renderCategoryDetails()}
        </div>
    );
};

export default TypeDetails;
