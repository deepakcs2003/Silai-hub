import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import summaryApi from '../Common';
import TypeDetails from '../Components/CommonComponents/TypeDetails';
import { Heart, Phone, Share2, Smartphone } from 'lucide-react';
import MainDetails from '../Components/CommonComponents/MainDetails';
import PriceDetails from '../Components/CommonComponents/PriceDetails';
import PopupModal from '../Components/PopupModal';
import CommonContactCart from '../Components/CommonContactCart';

const SingleProductDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get('productId');

  const [product, setProduct] = useState(null);
  const [mainMedia, setMainMedia] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${summaryApi.get_single_product.url}?productId=${productId}`, {
        method: summaryApi.get_single_product.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      setProduct(data.product);

      const mediaList = data.product.images || [];
      setMainMedia(mediaList[0]);
    } catch (err) {
      console.error('Error fetching product details:', err.message);
    }
  };

  const handleMediaSelect = (media) => {
    setMainMedia(media);
  };

  const handleLike = () => {
    if (!isLiked) {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.productName,
        text: `Check out this amazing product: ${product.productName}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied to clipboard!'));
    }
  };

  const handlePopup = (type) => {
    setSelectedProduct(product);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedProduct(null);
  };

  const renderMainMedia = () => {
    if (!mainMedia) return null;

    return (
      <div className="bg-white rounded-lg shadow-lg flex justify-center items-center">
        <img
          src={mainMedia.url}
          alt="Product Media"
          className="object-contain max-w-full max-h-full p-3"
        />
      </div>
    );
  };

  useEffect(() => {
    fetchData();
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-pulse text-xl text-gray-600">Loading product details...</div>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <CommonContactCart></CommonContactCart>
      <div className="bg-blue-600 text-white p-6 rounded-t-lg">
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <p className="text-sm text-blue-200">{product.category}</p>
      </div>

      <div className="mb-8">{renderMainMedia()}</div>

      <div className="flex overflow-x-auto space-x-4 pb-8">
        {product.images?.map((media, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-24 h-24 relative cursor-pointer rounded-lg overflow-hidden ${mainMedia?.url === media.url ? 'ring-4 ring-blue-500' : ''
              }`}
            onClick={() => handleMediaSelect(media)}
          >
            <img src={media.url} alt={`Media ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-b-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleLike}
            disabled={isLiked}
            className={`flex-1 mr-4 flex items-center justify-center py-3 rounded-lg transition-all duration-300 ${isLiked
                ? 'bg-red-500 text-white cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            <Heart className="mr-2" />
            {likes} Likes
          </button>

          <button
            onClick={handleShare}
            className="flex-1 ml-4 flex items-center justify-center py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Share2 className="mr-2" />
            Share
          </button>
        </div>

        {popupVisible && selectedProduct && (
          <PopupModal product={selectedProduct} onClose={handleClosePopup} />
        )}

        <div className="space-y-6">
          <MainDetails product={product} />
          <TypeDetails product={product} />
          <PriceDetails product={product} />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => handlePopup('buy')}
            className="flex-1 mr-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Buy
          </button>

          <button
            onClick={() => handlePopup('add_to_cart')}
            className="flex-1 ml-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;
