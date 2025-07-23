import React, { useState, useRef, useEffect } from "react";
import uploadMedia from "../../Common/uploadMedia"; // Cloudinary uploader
 
const ImageUploader = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Prevent default drag behaviors on the entire window
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleWindowDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Add event listeners to prevent default drag behavior
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.addEventListener(eventName, preventDefaults, false);
    });

    // Prevent drop on window (outside our component)
    window.addEventListener('drop', handleWindowDrop, false);

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.removeEventListener(eventName, preventDefaults, false);
      });
      window.removeEventListener('drop', handleWindowDrop, false);
    };
  }, []);

  const handleImageUpload = async (inputFiles) => {
    const files = Array.from(inputFiles);
    setLoading(true);
    
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await uploadMedia(file); // Cloudinary function
          return { url: result.url };
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );
    
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...uploadedImages.filter(Boolean)],
    }));
    
    setLoading(false);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Only set isDragOver to false if we're leaving the container entirely
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handlePaste = (e) => {
    const items = e.clipboardData.items;
    const files = [];
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === "file") {
        files.push(items[i].getAsFile());
      }
    }
    
    if (files.length) {
      handleImageUpload(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="w-full font-body text-fs-6 leading-normal tracking-wide">
      {/* Drag and Drop Upload Area */}
      <div
        ref={containerRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onPaste={handlePaste}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all min-h-[220px] flex flex-col justify-center items-center relative ${
          isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-400 bg-gray-50 hover:border-blue-500'
        }`}
        onClick={handleClick}
      >
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={(e) => handleImageUpload(e.target.files)}
          className="hidden"
          ref={fileInputRef}
        />
        
        <div className="text-fs-2 text-gray-400 mb-2">📁</div>
        <p className="text-fs-6 text-gray-700 mb-1">
              {isDragOver ? "Drop images here" : "Click / Drag & Drop / Paste to upload"}
        </p>
        <p className="text-fs-7 text-gray-500">Supports multiple images</p>

        {loading && (
          <div className="mt-2 text-blue-600 text-sm">Uploading... please wait</div>
        )}
      </div>

      {/* Image Previews - Outside the drag and drop area */}
      {formData.images && formData.images.length > 0 && (
        <div className="mt-6">
           <h3 className="text-fs-6 font-medium text-gray-700 mb-3">
              Uploaded Images ({formData.images.length})
           </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.images.map((img, index) => (
               <div
            key={index}
            className="relative border border-gray-300 rounded-2xl overflow-hidden h-32 w-full group"
          >
                <img
                  src={img.url}
                  alt={`uploaded-${index}`}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;