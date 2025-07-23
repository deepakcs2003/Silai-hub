import React from 'react';
import { fabricTypes } from '../../Common/option';

const SareeDetails = ({ formData, setformdata }) => {
 
  const handleNestedInputChange = (nestedKey, event) => {
    const { name, value, type, checked } = event.target;
    setformdata((prevFormData) => ({
      ...prevFormData,
      [nestedKey]: {
        ...prevFormData[nestedKey],
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col">
        <label className="font-medium text-gray-700 tracking-wide">Saree Length</label>
        <input
          type="text"
          name="sareeLength"
          value={formData.sareeDetails.sareeLength}
          onChange={(e) => handleNestedInputChange('sareeDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="blouseIncluded"
          checked={formData.sareeDetails.blouseIncluded}
          onChange={(e) => handleNestedInputChange('sareeDetails', e)}
          className="mr-2"
        />
       <label className="font-medium text-gray-700 tracking-wide">Blouse Included</label>
       </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="pleated"
          checked={formData.sareeDetails.pleated}
          onChange={(e) => handleNestedInputChange('sareeDetails', e)}
          className="mr-2"
        />
        <label className="font-medium text-gray-700 tracking-wide">Pleated</label>
      </div>

      <div className="flex flex-col">
      <label className="font-medium text-gray-700 tracking-wide">Blouse Fit Type</label>
        <select
          name="blouseFitType"
          value={formData.sareeDetails.blouseFitType}
          onChange={(e) => handleNestedInputChange('sareeDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="Regular Fit">Regular Fit</option>
          <option value="Slim Fit">Slim Fit</option>
          <option value="Loose Fit">Loose Fit</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700 tracking-wide">Embroidery Details</label>
        <input
          type="text"
          name="embroideryDetails"
          value={formData.sareeDetails.embroideryDetails}
          onChange={(e) => handleNestedInputChange('sareeDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SareeDetails;
