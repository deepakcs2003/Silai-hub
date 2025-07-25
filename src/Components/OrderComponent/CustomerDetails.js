import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import icons
const icons = {
  User: dynamic(() => import('lucide-react').then(mod => mod.User)),
  Mail: dynamic(() => import('lucide-react').then(mod => mod.Mail)),
  Phone: dynamic(() => import('lucide-react').then(mod => mod.Phone)),
  MapPin: dynamic(() => import('lucide-react').then(mod => mod.MapPin)),
  Home: dynamic(() => import('lucide-react').then(mod => mod.Home)),
  Building2: dynamic(() => import('lucide-react').then(mod => mod.Building2)),
  Tag: dynamic(() => import('lucide-react').then(mod => mod.Tag)),
  AlertCircle: dynamic(() => import('lucide-react').then(mod => mod.AlertCircle))
};

// Memoized InputWithIcon component to prevent recreation
const InputWithIcon = React.memo(({ icon: IconName, ...props }) => {
  const Icon = icons[IconName];
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...props}
        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
  );
});

const CustomerDetails = ({ orderData, setOrderData }) => {
  // Use useCallback to prevent function recreation on every render
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setOrderData((prev) => {
      if (name.includes('address.')) {
        const addressField = name.split('.')[1];
        return {
          ...prev,
          customer: {
            ...prev.customer,
            address: {
              ...prev.customer.address,
              [addressField]: value,
            },
          },
        };
      } else {
        return {
          ...prev,
          customer: {
            ...prev.customer,
            [name]: value,
          },
        };
      }
    });
  }, [setOrderData]);

  // Get values directly from orderData
  const { name, email, phone, address } = orderData.customer;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        {React.createElement(icons.User, { className: "mr-3 text-blue-600" })}
        Customer Details
      </h2>
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex items-center">
          {React.createElement(icons.AlertCircle, { className: "w-5 h-5 text-blue-600 mr-3" })}
          <p className="text-blue-800 font-medium">
            Please complete all required fields to proceed with your order
          </p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Personal Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <InputWithIcon
              icon={User}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <InputWithIcon
              icon={Mail}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <InputWithIcon
            icon="Phone"
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            placeholder="10-digit mobile number"
            required
          />
        </div>

        {/* Address Section */}
        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
            {React.createElement(icons.MapPin, { className: "mr-2 text-blue-600" })}
            Shipping Address
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Street */}
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <InputWithIcon
                icon="Home"
                type="text"
                id="street"
                name="address.street"
                value={address.street}
                onChange={handleInputChange}
                placeholder="Flat, House no., Street"
              />
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <InputWithIcon
                icon="Building2"
                type="text"
                id="city"
                name="address.city"
                value={address.city}
                onChange={handleInputChange}
                placeholder="Your city"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <InputWithIcon
                icon="Building2"
                type="text"
                id="state"
                name="address.state"
                value={address.state}
                onChange={handleInputChange}
                placeholder="Your state"
              />
            </div>

            {/* Pincode */}
            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <InputWithIcon
                icon="Tag"
                type="text"
                id="pincode"
                name="address.pincode"
                value={address.pincode}
                onChange={handleInputChange}
                placeholder="6-digit pincode"
              />
            </div>
          </div>

          {/* Country - Preset to India */}
          <input
            type="hidden"
            name="address.country"
            value={address.country}
          />
        </div>

      
      </div>
    </div>
  );
};

export default CustomerDetails;