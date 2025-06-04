import React from 'react';
import { fabricTypes } from '../../Common/option';

const LehengaDetails = ({ formData, setformdata }) => {

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
        <label className="font-medium text-gray-700">Lehenga Type</label>
        <select
          name="lehengaType"
          value={formData.lehengaDetails.lehengaType}
          onChange={(e) => handleNestedInputChange('lehengaDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="A-Line">A-Line</option>
          <option value="Mermaid">Mermaid</option>
          <option value="Flared">Flared</option>
          <option value="Straight">Straight</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Lehenga Waist</label>
        <input
          type="text"
          name="lehengaWaist"
          value={formData.lehengaDetails.lehengaWaist}
          onChange={(e) => handleNestedInputChange('lehengaDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="lehengaDupattaIncluded"
          checked={formData.lehengaDetails.lehengaDupattaIncluded}
          onChange={(e) => handleNestedInputChange('lehengaDetails', e)}
          className="mr-2"
        />
        <label className="font-medium text-gray-700">Lehenga Dupatta Included</label>
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Embroidery Details</label>
        <input
          type="text"
          name="embroideryDetails"
          value={formData.lehengaDetails.embroideryDetails}
          onChange={(e) => handleNestedInputChange('lehengaDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="font-medium text-gray-700">Saree Fabric</label>
        <select
          name="fabricType"
          value={formData.lehengaDetails.fabricType}
          onChange={(e) => handleNestedInputChange('lehengaDetails', e)}
          className="mt-2 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Fabric Type</option>
          {fabricTypes.map((fabric) => (
            <option key={fabric} value={fabric}>
              {fabric}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LehengaDetails;
