import React from 'react';

const AdvancedFilters = ({ filters, updateFilters, availableOptions }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Object.keys(availableOptions).map((key) => (
        <div key={key}>
          <label className="block font-heading text-fs-5 text-deep-burgundy mb-2">{key}</label>
          <select
            value={filters[key] || ''}
            onChange={(e) => updateFilters(key, e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full font-body text-fs-6 leading-normal tracking-wide text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold"
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
