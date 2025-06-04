import React from 'react';

export const SuitDetails = ({ formData, setformdata }) => {
    // Handles nested input changes for Suit
    const handleNestedInputChange = (section, event) => {
      const { name, value, type, checked } = event.target;
      setformdata((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: type === 'checkbox' ? checked : value,
        },
      }));
    };
  
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <label className="text-lg font-semibold text-gray-800 mb-4">Suit Details</label>
  
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Fabric Type</label>
              <select
                name="fabricType"
                value={formData.suitDetails.fabricType || ''}
                onChange={(e) => handleNestedInputChange('suitDetails', e)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cotton">Cotton</option>
                <option value="Silk">Silk</option>
                <option value="Georgette">Georgette</option>
                <option value="Chiffon">Chiffon</option>
                <option value="Satin">Satin</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Suit Style</label>
              <select
                name="suitStyle"
                value={formData.suitDetails.suitStyle || ''}
                onChange={(e) => handleNestedInputChange('suitDetails', e)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Straight Cut">Straight Cut</option>
                <option value="Anarkali">Anarkali</option>
                <option value="A-Line">A-Line</option>
                <option value="Patiala">Patiala</option>
                <option value="Palazzo">Palazzo</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Neckline Style</label>
              <input
                type="text"
                name="necklineStyle"
                value={formData.suitDetails.necklineStyle || ''}
                onChange={(e) => handleNestedInputChange('suitDetails', e)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Fit Type</label>
              <select
                name="fitType"
                value={formData.suitDetails.fitType || ''}
                onChange={(e) => handleNestedInputChange('suitDetails', e)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Regular Fit">Regular Fit</option>
                <option value="Slim Fit">Slim Fit</option>
                <option value="Loose Fit">Loose Fit</option>
              </select>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Embellishments</label>
              <input
                type="text"
                name="embellishments"
                value={formData.suitDetails.embellishments || ''}
                onChange={(e) => handleNestedInputChange('suitDetails', e)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="lining"
                  checked={formData.suitDetails.lining || false}
                  onChange={(e) => handleNestedInputChange('suitDetails', e)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Lining</label>
              </div>
  
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="padding"
                  checked={formData.suitDetails.padding || false}
                  onChange={(e) => handleNestedInputChange('suitDetails', e)}
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm text-gray-700">Padding</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  