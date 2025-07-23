import React, { useState, useEffect, useContext } from 'react';
import {
  fabricTypes,
  stitchingTypes,
  patterns,
  embellishmentsOptions,
  categories,
  productTypes,
  availabilityStatuses,
  featuredProductOptions,
  color
} from '../Common/option';
import Card from '../Components/Card';
import { X, Filter } from 'lucide-react';
import { AppContext } from '../App';
 
const GalleryPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    fabricType: '',
    stitchingType: '',
    pattern: '',
    embellishment: '',
    availabilityStatus: '',
    featuredProduct: '',
    color: '',
    tailorPrice: [0, 10000],
    customizationAvailable: '',
    productType: '',
    readyMadePrice: [0, 10000],
    discount: [0, 100],
  });
  const { allProduct, getAllProduct, addToCart } = useContext(AppContext);

  useEffect(() => {
    getAllProduct();
  }, []);
  // Update filtered products whenever filters change
  useEffect(() => {
    let products = [...allProduct];

    if (filters.category) {
      products = products.filter(product => product.category === filters.category);
    }

    if (filters.fabricType) {
      products = products.filter(product => product.fabricType === filters.fabricType);
    }

    if (filters.stitchingType) {
      products = products.filter(product => product.stitchingType === filters.stitchingType);
    }

    if (filters.pattern) {
      products = products.filter(product => product.pattern === filters.pattern);
    }

    if (filters.embellishment) {
      products = products.filter(product => product.embellishments.includes(filters.embellishment));
    }

    if (filters.availabilityStatus) {
      products = products.filter(product => product.availabilityStatus === filters.availabilityStatus);
    }

    if (filters.featuredProduct !== '') {
      products = products.filter(product => product.featuredProduct === (filters.featuredProduct === 'true'));
    }

    if (filters.color) {
      products = products.filter(product => product.color === filters.color);
    }

    if (filters.tailorPrice) {
      products = products.filter(product =>
        product.tailorPrice >= filters.tailorPrice[0] &&
        product.tailorPrice <= filters.tailorPrice[1]
      );
    }

    if (filters.customizationAvailable !== '') {
      products = products.filter(
        product => product.customizationAvailable === (filters.customizationAvailable === 'true')
      );
    }

    if (filters.productType) {
      products = products.filter(product => product.productType === filters.productType);
    }

    if (filters.readyMadePrice) {
      products = products.filter(product =>
        product.readyMadePrice >= filters.readyMadePrice[0] &&
        product.readyMadePrice <= filters.readyMadePrice[1]
      );
    }

    if (filters.discount) {
      products = products.filter(product =>
        product.discount >= filters.discount[0] && product.discount <= filters.discount[1]
      );
    }

    setFilteredProducts(products);
  }, [filters, allProduct]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Handle range changes
  const handleRangeChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: '',
      fabricType: '',
      stitchingType: '',
      pattern: '',
      embellishment: '',
      availabilityStatus: '',
      featuredProduct: '',
      color: '',
      tailorPrice: [0, 10000],
      customizationAvailable: '',
      productType: '',
      readyMadePrice: [0, 10000],
      discount: [0, 100],
    });
  };

  return (
    <div className="min-h-screen font-body bg-gray-50 flex flex-col lg:flex-row">
      {/* Filter Sidebar - Mobile and Desktop */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 w-52 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:block lg:w-60 lg:shadow-none text-fs-6
        `}
      >
        <div className="p-6 relative">
          {/* Close Button for Mobile */}
          <button 
            onClick={() => setIsFilterOpen(false)} 
            className="lg:hidden absolute top-4 right-4 text-gray-600 hover:text-red-500 text-fs-6"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl text-fs-2 font-bold text-gray-800 mb-6">Filter Products</h2>

          {/* Filter Content */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
            {/* Dropdown Filters */}
            <div className="space-y-4">
              {[
                { name: 'category', options: categories, label: 'Category' },
                { name: 'fabricType', options: fabricTypes, label: 'Fabric Type' },
                { name: 'stitchingType', options: stitchingTypes, label: 'Stitching Type' },
                { name: 'pattern', options: patterns, label: 'Pattern' },
                { name: 'embellishment', options: embellishmentsOptions, label: 'Embellishment' },
                { name: 'availabilityStatus', options: availabilityStatuses, label: 'Availability' },
              ].map(({ name, options, label }) => (
                <div key={name}>
                  <label className="block text-sm text-fs-6 font-medium text-gray-700 mb-1">{label}</label>
                  <select 
                    name={name} 
                    onChange={handleFilterChange} 
                    value={filters[name]} 
                    className="w-full border text-fs-6 font-body border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All {label}s</option>
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Price Range Filters */}
            <div className="space-y-4 font-body">
              {[
                { name: 'tailorPrice', label: 'tailor Price', max: 10000 },
                { name: 'readyMadePrice', label: 'Ready Made Price', max: 10000 },
                { name: 'discount', label: 'Discount', max: 100 },
              ].map(({ name, label, max }) => (
                <div key={name} className="space-y-2">
                  <label className="block text-sm text-fs-6 font-medium text-gray-700">
                    {label}: {filters[name][0]} - {filters[name][1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={max}
                    value={filters[name][0]}
                    onChange={(e) => handleRangeChange(name, [Number(e.target.value), filters[name][1]])}
                    className="w-full h-2 bg-blue-100 text-fs-6 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Reset and Apply Filters */}
            <div className="flex space-x-4">
              <button 
                onClick={resetFilters} 
                className="w-full bg-red-500 text-white text-fs-6 py-2 rounded-md hover:bg-red-600 transition"
              >
                Reset Filters
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)} 
                className="w-full bg-blue-500 text-white text-fs-6 py-2 rounded-md hover:bg-blue-600 transition lg:hidden"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-blue-500 text-white text-fs-6  p-3 rounded-full shadow-lg hover:bg-blue-600 transition lg:hidden"
        >
          <Filter size={24} />
        </button>

        {/* Product Grid */}
          <Card products={filteredProducts} />
      </div>
    </div>
  );
};

export default GalleryPage;