import React, { useState } from 'react'; 
import { 
  ArrowLeft, 
  Expand, 
  ShoppingCart, 
  Ruler, 
  Palette, 
  Scissors, 
  Shirt 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const DesignDetailsPage = ({ onClose }) => {
  const location = useLocation();
  const { design } = location.state || {}; // Add fallback to avoid undefined error
  const [activeImage, setActiveImage] = useState(design?.image || 'fallback-image-url.jpg');
  const [zoomedImage, setZoomedImage] = useState(null);

  if (!design) {
    return <div>Loading...</div>; // Show loading if design data is not available
  }

  // Handle image zoom
  const handleImageZoom = (imageUrl) => {
    setZoomedImage(imageUrl);
  };

  // Render Blouse Tailoring Details
  const renderBlouseTailoringDetails = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        <Shirt className="mr-2 text-blue-600" />
        Blouse Tailoring Details
      </h3>
      <div className="grid md:grid-cols-2 gap-2">
        <p><strong>Gala (Neckline):</strong> {design.blouseTailoring?.galaDesign || 'Not available'}</p>
        <p><strong>Back Design:</strong> {design.blouseTailoring?.backDesign || 'Not available'}</p>
        <p><strong>Baju (Sleeves) Design:</strong> {design.blouseTailoring?.bajuDesign || 'Not available'}</p>
        <p><strong>Stitching Type:</strong> {design.blouseTailoring?.silaiType || 'Not available'}</p>
        <p><strong>Customizations:</strong> {design.blouseTailoring?.blouseCustomizations || 'Not available'}</p>
      </div>
    </div>
  );

  // Render Embellishments Details
  const renderEmbellishments = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-3 flex items-center">
        Embellishments
      </h3>
      <div className="grid md:grid-cols-2 gap-2">
        <p><strong>Embroidery:</strong> {design.embellishments?.embroidery || 'Not available'}</p>
        <p><strong>Beadwork:</strong> {design.embellishments?.beadwork || 'Not available'}</p>
        <p><strong>Stonework:</strong> {design.embellishments?.stonework || 'Not available'}</p>
        <p><strong>Additional Details:</strong> {design.embellishments?.additionalDetails || 'Not available'}</p>
      </div>
    </div>
  );

  // Render Price with Discount
  const renderPrice = () => {
    const discountedPrice = (design?.price?.max * (1 - design.discount / 100)).toFixed(2);
    return (
      <div>
        <span className="text-xl font-bold text-blue-600">₹{discountedPrice}</span>
        <span className="ml-2 text-sm text-gray-500 line-through">₹{design?.price?.max}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Navigation and Close Button */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onClose} 
          className="flex items-center text-gray-700 hover:text-blue-600 transition"
        >
          <ArrowLeft className="mr-2" /> Back
        </button>
      </div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Image Gallery Section */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Main Image */}
          <div className="relative group">
            <img 
              src={activeImage} 
              alt={design.name} 
              className="w-full h-96 object-cover rounded-lg"
            />
            <button 
              onClick={() => handleImageZoom(activeImage)}
              className="absolute top-4 right-4 bg-white/70 p-2 rounded-full hover:bg-white transition"
            >
              <Expand className="text-gray-700" />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div>
            <div className="grid grid-cols-3 gap-4">
              {design.images?.map((img, index) => (
                <img 
                  key={index}
                  src={img} 
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-full h-24 object-cover rounded-lg cursor-pointer 
                    ${activeImage === img ? 'border-2 border-blue-500' : 'opacity-70 hover:opacity-100'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Information Sections */}
        <div className="p-6 space-y-6">
          {/* Fabric & Material Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Palette className="mr-2 text-blue-600" />
              Fabric & Material
            </h3>
            <div className="grid md:grid-cols-3 gap-4 bg-gray-100 p-4 rounded-lg">
              <p><strong>Fabric Type:</strong> {design.fabricType}</p>
              <p><strong>Fabric Feel:</strong> {design.fabricFeel}</p>
              <p><strong>Durability:</strong> {design.durability}</p>
            </div>
          </div>

          {/* Blouse Tailoring Details */}
          {renderBlouseTailoringDetails()}

          {/* Embellishments Details */}
          {renderEmbellishments()}

          {/* Customization Options */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Scissors className="mr-2 text-blue-600" />
              Customization Options
            </h3>
            <div className="grid md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg">
              {design.customizationOptions?.map((option, index) => (
                <p key={index}><strong>{option}</strong></p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t flex justify-between items-center">
          {renderPrice()}
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center">
            <ShoppingCart className="mr-2" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <img 
            src={zoomedImage} 
            alt="Zoomed" 
            className="max-w-full max-h-full object-contain" 
          />
        </div>
      )}
    </div>
  );
};

export default DesignDetailsPage;
