import React from 'react';

const AdvancedFilters = ({ filters, updateFilters, availableOptions }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(availableOptions).map((key) => (
        <div key={key}>
          <label className="block font-semibold">{key}</label>
          <select
            value={filters[key] || ''}
            onChange={(e) => updateFilters(key, e.target.value)}
            className="border rounded px-4 py-2 w-full"
          >
            <option value="">Select {key}</option>
            {availableOptions[key].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdvancedFilters;
