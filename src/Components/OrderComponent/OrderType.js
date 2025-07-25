import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const icons = {
  Shirt: dynamic(() => import('lucide-react').then(mod => mod.Shirt)),
  Ruler: dynamic(() => import('lucide-react').then(mod => mod.Ruler)),
  Image: dynamic(() => import('lucide-react').then(mod => mod.Image)),
  PaintBucket: dynamic(() => import('lucide-react').then(mod => mod.PaintBucket)),
  Link2: dynamic(() => import('lucide-react').then(mod => mod.Link2)),
  FileText: dynamic(() => import('lucide-react').then(mod => mod.FileText)),
  Upload: dynamic(() => import('lucide-react').then(mod => mod.Upload)),
  CheckCircle2: dynamic(() => import('lucide-react').then(mod => mod.CheckCircle2)),
  AlertCircle: dynamic(() => import('lucide-react').then(mod => mod.AlertCircle))
};

// Cloudinary Upload Function remains the same as in the original component
const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const url = `https://api.cloudinary.com/v1_1/de2jtctdv/image/upload`;

  try {
    const dataResponse = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!dataResponse.ok) {
      throw new Error('Failed to upload image');
    }

    return await dataResponse.json();
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

const ProductType = ({ orderType, setOrderData, orderData }) => {
  const [localOrderType, setLocalOrderType] = useState(orderType || 'custom');
  const [imagePreview, setImagePreview] = useState({
    clothPic: [],
    designPic: []
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setLocalOrderType(orderType || 'custom');
  }, [orderType]);

  const handleChange = (e, field) => {
    const { value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files);
      setImagePreview(prev => ({
        ...prev,
        [field]: fileArray.map(file => URL.createObjectURL(file))
      }));
    }

    setOrderData(prevData => ({
      ...prevData,
      [field]: files ? files : value,
    }));
  };

  const handleImageUpload = async (files, field) => {
    setIsUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const uploadedImages = await Promise.all(uploadPromises);

      const imageUrls = uploadedImages.map(img => img.secure_url);

      setOrderData(prevData => ({
        ...prevData,
        [field]: imageUrls
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
      <div className=" p-8 ">
        <div className="flex items-center justify-center mb-8">
          {React.createElement(icons.Shirt, { className: "h-10 w-10 mr-4 text-blue-600" })}
          <h2 className="text-3xl font-bold text-gray-800">Order Customization</h2>
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex items-center">
            {React.createElement(icons.AlertCircle, { className: "w-5 w-5 text-blue-600 mr-3" })}
            <p className="text-blue-800 font-medium">
              Please complete all required fields to proceed with your order
            </p>
          </div>
        </div>
        {/* Ready Made Information */}
        {localOrderType === 'readymade' && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md mb-6">
            <div className="flex items-center">
              {React.createElement(icons.CheckCircle2, { className: "h-6 w-6 mr-3 text-blue-600" })}
              <p className="text-blue-700 font-medium">Select from our curated ready-made collection</p>
            </div>
          </div>
        )}

        {/* Tailor and Custom Options */}
        {(localOrderType === 'tailor' || localOrderType === 'custom') && (
          <div className="space-y-6">
            {/* Cloth Picture Upload */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label
                htmlFor="clothPic"
                className="flex items-center text-sm font-medium text-gray-700 mb-3"
              >
                {React.createElement(icons.Image, { className: "h-5 w-5 mr-2 text-blue-600" })}
                Cloth Picture You Want to Tailor
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="clothPic"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    handleChange(e, 'clothPic');
                    handleImageUpload(e.target.files, 'clothPic');
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg 
                             file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                             file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                    {React.createElement(icons.Upload, { className: "h-8 w-8 animate-bounce text-blue-600" })}
                  </div>
                )}
              </div>
              {imagePreview.clothPic.length > 0 && (
                <div className="flex space-x-3 mt-4">
                  {imagePreview.clothPic.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt="Cloth Preview"
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Color Selection */}
            <div>
              <label
                htmlFor="color"
                className="flex items-center text-sm font-medium text-gray-700 mb-3"
              >
                {React.createElement(icons.PaintBucket, { className: "h-5 w-5 mr-2 text-blue-600" })}
                Color of your cloth
              </label>
              <input
                type="text"
                id="color"
                value={orderData.color || ''}
                onChange={(e) => handleChange(e, 'color')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter color"
              />
            </div>
          </div>
        )}

        {/* Custom Design Additional Fields */}
        {localOrderType === 'custom' && (
          <div className="space-y-6 mt-6">
            {/* Design Details */}
            <div>
              <label
                htmlFor="designDetails"
                className="flex items-center text-sm font-medium text-gray-700 mb-3"
              >
                {React.createElement(icons.FileText, { className: "h-5 w-5 mr-2 text-blue-600" })}
                Design Details as per your requirement
              </label>
              <textarea
                id="designDetails"
                value={orderData.designDetails || ''}
                onChange={(e) => handleChange(e, 'designDetails')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                rows="4"
                placeholder="Describe your custom design"
              />
            </div>

            {/* Design Picture Upload */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label
                htmlFor="designPic"
                className="flex items-center text-sm font-medium text-gray-700 mb-3"
              >
                <Image className="h-5 w-5 mr-2 text-blue-600" />
                Design Reference Pictures your want to tailor
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="designPic"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    handleChange(e, 'designPic');
                    handleImageUpload(e.target.files, 'designPic');
                  }}
                  className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg 
                             file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                             file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                             hover:file:bg-blue-100"
                  disabled={isUploading}
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
                    <Upload className="h-8 w-8 animate-bounce text-blue-600" />
                  </div>
                )}
              </div>
              {imagePreview.designPic.length > 0 && (
                <div className="flex space-x-3 mt-4">
                  {imagePreview.designPic.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt="Design Preview"
                      className="w-24 h-24 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Design Reference Link */}
            <div>
              <label
                htmlFor="link"
                className="flex items-center text-sm font-medium text-gray-700 mb-3"
              >
                {React.createElement(icons.Link2, { className: "h-5 w-5 mr-2 text-blue-600" })}
                Design Reference Link(like Pinterest,Youtube,Internet etc.)
              </label>
              <input
                type="url"
                id="link"
                value={orderData.link || ''}
                onChange={(e) => handleChange(e, 'link')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Paste your design reference link"
              />
            </div>
          </div>
        )}

        {/* Customer Details */}
        <div className="mt-6">
          <label
            htmlFor="customerDetails"
            className="flex items-center text-sm font-medium text-gray-700 mb-3"
          >
            {React.createElement(icons.AlertCircle, { className: "h-5 w-5 mr-2 text-blue-600" })}
            Additional Customer Details
          </label>
          <textarea
            id="customerDetails"
            value={orderData.customerDetails || ''}
            onChange={(e) => handleChange(e, 'customerDetails')}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
                       focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            rows="4"
            placeholder="Enter any additional customer information"
          />
        </div>
      </div>
  );
};

export default ProductType;