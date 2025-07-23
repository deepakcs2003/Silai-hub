import React from 'react';
 
export const BlouseDetails = ({ formData, setformdata }) => {
  // Handles nested input changes for Blouse
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
          <label className="block text-fs-4 font-heading font-semibold text-deep-burgundy mb-4 tracking-tight leading-tight">
          Blouse Details
        </label>
        <div className="space-y-4">
          <div>
             <label className="block text-fs-6 font-body font-medium text-gray-700 tracking-wide">
              Sleeve Type
            </label>
            <select
              name="sleeveType"
              value={formData.blouseDetails.sleeveType || ''}
              onChange={(e) => handleNestedInputChange('blouseDetails', e)}
                className="w-full p-2 border rounded-md font-body text-fs-6 tracking-tight focus:outline-none focus:ring-2 focus:ring-deep-burgundy"
            >
              <option value="Short Sleeve">Short Sleeve</option>
              <option value="Long Sleeve">Long Sleeve</option>
              <option value="Sleeveless">Sleeveless</option>
            </select>
          </div>

          <div>
            <label className="block text-fs-6 font-body font-medium text-gray-700 tracking-wide">
              Blouse Back Design
            </label>
            <select
              name="blouseBackDesign"
              value={formData.blouseDetails.blouseBackDesign || ''}
              onChange={(e) => handleNestedInputChange('blouseDetails', e)}
              className="w-full p-2 border rounded-md font-body text-fs-6 tracking-tight focus:outline-none focus:ring-2 focus:ring-deep-burgundy"
            >
              <option value="Closed Back">Closed Back</option>
              <option value="Back Open">Back Open</option>
              <option value="Keyhole Back">Keyhole Back</option>
            </select>
          </div>

          <div>
            <label className="block text-fs-6 font-body font-medium text-gray-700 tracking-wide">
              Neckline Style
            </label>
            <input
              type="text"
              name="necklineStyle"
              value={formData.blouseDetails.necklineStyle || ''}
              onChange={(e) => handleNestedInputChange('blouseDetails', e)}
             className="w-full p-2 border rounded-md font-body text-fs-6 tracking-tight focus:outline-none focus:ring-2 focus:ring-deep-burgundy"
            />
          </div>

          <div>
            <label className="block text-fs-6 font-body font-medium text-gray-700 tracking-wide">
              Fit Type
            </label>
            <select
              name="fitType"
              value={formData.blouseDetails.fitType || ''}
              onChange={(e) => handleNestedInputChange('blouseDetails', e)}
              className="w-full p-2 border rounded-md font-body text-fs-6 tracking-tight focus:outline-none focus:ring-2 focus:ring-deep-burgundy"
            >
              <option value="Regular Fit">Regular Fit</option>
              <option value="Slim Fit">Slim Fit</option>
              <option value="Loose Fit">Loose Fit</option>
            </select>
          </div>

          <div>
            <label className="block text-fs-6 font-body font-medium text-gray-700 tracking-wide">
              Embellishments
            </label>
            <input
              type="text"
              name="embellishments"
              value={formData.blouseDetails.embellishments || ''}
              onChange={(e) => handleNestedInputChange('blouseDetails', e)}
             className="w-full p-2 border rounded-md font-body text-fs-6 tracking-tight focus:outline-none focus:ring-2 focus:ring-deep-burgundy"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="padding"
                checked={formData.blouseDetails.padding || false}
                onChange={(e) => handleNestedInputChange('blouseDetails', e)}
                className="w-4 h-4 text-deep-burgundy border-gray-300 rounded focus:ring-deep-burgundy"
              />
             <label className="text-fs-7 font-body text-gray-700 tracking-tight">Padding</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="lining"
                checked={formData.blouseDetails.lining || false}
                onChange={(e) => handleNestedInputChange('blouseDetails', e)}
                className="w-4 h-4 text-deep-burgundy border-gray-300 rounded focus:ring-deep-burgundy"
              />
              <label className="text-fs-7 font-body text-gray-700 tracking-tight">Lining</label>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};