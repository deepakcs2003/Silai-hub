import React, { useCallback } from 'react';
import { 
  Ruler, 
  ChevronRight, 
  Triangle, 
  ArrowDown, 
  ArrowUp,
  AlertCircle
} from 'lucide-react';

const Measurement = React.memo(({ setOrderData, orderData, category }) => {
  // Color palette
  const colors = ['#d6e6ff', '#d7f9f8', '#ffffea', '#fff0d4', '#fbe0e0', '#e5d4ef'];

  // Handle input changes - using useCallback to prevent re-renders
  const handleMeasurementChange = useCallback((field, value) => {
    setOrderData(prevData => ({
      ...prevData,
      measurements: {
        ...prevData.measurements,
        [category.toLowerCase()]: {
          ...prevData.measurements[category.toLowerCase()],
          [field]: parseFloat(value) || 0
        }
      }
    }));
  }, [setOrderData, category]);

  // Measurement fields configuration with centimeter units
  const measurementConfig = {
    'Blouse': [
      { field: 'chest', label: 'Chest Measurement (cm)', hinglishLabel: 'छाती का माप (Chest Measurement in cm)', icon: Triangle },
      { field: 'waist', label: 'Waist Measurement (cm)', hinglishLabel: 'कमर का माप (Waist Measurement in cm)', icon: Ruler },
      { field: 'shoulder', label: 'Shoulder Width (cm)', hinglishLabel: 'कंधे की चौड़ाई (Shoulder Width in cm)', icon: ArrowUp },
      { field: 'length', label: 'Blouse Length (cm)', hinglishLabel: 'ब्लाउज की लंबाई (Blouse Length in cm)', icon: ArrowDown },
      { field: 'sleeveLength', label: 'Sleeve Length (cm)', hinglishLabel: 'आस्तीन की लंबाई (Sleeve Length in cm)', icon: ArrowDown },
      { field: 'neckDepthFront', label: 'Neck Depth (Front) (cm)', hinglishLabel: 'गर्दन की गहराई (सामने) (Neck Depth Front in cm)', icon: ChevronRight },
      { field: 'neckDepthBack', label: 'Neck Depth (Back) (cm)', hinglishLabel: 'गर्दन की गहराई (पीछे) (Neck Depth Back in cm)', icon: ChevronRight },
    ],
    'Dress': [
      { field: 'chest', label: 'Bust Measurement (cm)', hinglishLabel: 'बस्ट का माप (Bust Measurement in cm)', icon: Triangle },
      { field: 'waist', label: 'Waist Measurement (cm)', hinglishLabel: 'कमर का माप (Waist Measurement in cm)', icon: Ruler },
      { field: 'hip', label: 'Hip Measurement (cm)', hinglishLabel: 'कूल्हे का माप (Hip Measurement in cm)', icon: Triangle },
      { field: 'length', label: 'Dress Length (cm)', hinglishLabel: 'पोशाक की लंबाई (Dress Length in cm)', icon: ArrowDown },
      { field: 'sleeveLength', label: 'Sleeve Length (cm)', hinglishLabel: 'आस्तीन की लंबाई (Sleeve Length in cm)', icon: ArrowDown },
    ],
    'Lehenga': [
      { field: 'waist', label: 'Waist Measurement (cm)', hinglishLabel: 'कमर का माप (Waist Measurement in cm)', icon: Ruler },
      { field: 'hip', label: 'Hip Measurement (cm)', hinglishLabel: 'कूल्हे का माप (Hip Measurement in cm)', icon: Triangle },
      { field: 'length', label: 'Lehenga Length (cm)', hinglishLabel: 'लहंगा की लंबाई (Lehenga Length in cm)', icon: ArrowDown },
    ]
  };

  // Get measurement fields for the current category
  const measurementFields = measurementConfig[category] || [];

  // If category is not supported, return null
  if (!measurementFields.length) {
    return null;
  }

  // Get current measurements for the category
  const currentMeasurements = orderData.measurements[category.toLowerCase()] || {};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <Ruler className="h-8 w-8 mr-3 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">
          {category} Measurements
        </h2>
      </div>
       <div className="border-l-4 border-blue-400 p-4 mb-6" style={{backgroundColor: '#d6e6ff'}}>
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <p className="text-blue-800 font-medium">
                    Please complete all required fields to proceed with your order
                  </p>
                </div>
              </div>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {measurementFields.map(({ field, label, hinglishLabel, icon: Icon }, index) => (
            <MeasurementInput
              key={field}
              field={field}
              label={label}
              hinglishLabel={hinglishLabel}
              icon={Icon}
              value={currentMeasurements[field] || 0}
              onChange={handleMeasurementChange}
              backgroundColor={colors[index % colors.length]}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

// Separate input component to prevent re-renders
const MeasurementInput = React.memo(({ field, label, hinglishLabel, icon: Icon, value, onChange, backgroundColor }) => {
  const handleChange = useCallback((e) => {
    onChange(field, e.target.value);
  }, [field, onChange]);

  return (
    <div className="relative p-4 rounded-lg border border-gray-200" style={{backgroundColor}}>
      <label 
        htmlFor={field} 
        className="block mb-2 text-sm font-medium text-gray-700 flex items-center"
      >
        <Icon className="h-4 w-4 mr-2 text-blue-500" />
        {hinglishLabel}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-blue-500 opacity-70" />
        </div>
        <input
          id={field}
          type="number"
          min="0"
          step="0.1"
          placeholder={label}
          defaultValue={value === 0 ? '' : value}
          onChange={handleChange}
          className="pl-10 w-full px-3 py-2 border-2 border-gray-300 rounded-lg 
                     focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                     transition-all duration-300 
                     text-gray-700 placeholder-gray-400 bg-white"
        />
      </div>
    </div>
  );
});

export default Measurement;