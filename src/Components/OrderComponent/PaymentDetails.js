import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const icons = {
  CreditCard: dynamic(() => import('lucide-react').then(mod => mod.CreditCard)),
  DollarSign: dynamic(() => import('lucide-react').then(mod => mod.DollarSign)),
  Phone: dynamic(() => import('lucide-react').then(mod => mod.Phone)),
  Star: dynamic(() => import('lucide-react').then(mod => mod.Star)),
  Shield: dynamic(() => import('lucide-react').then(mod => mod.Shield)),
  Scissors: dynamic(() => import('lucide-react').then(mod => mod.Scissors)),
  Users: dynamic(() => import('lucide-react').then(mod => mod.Users))
};

const PaymentDetails = ({ orderProduct, orderData, setOrderData }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const actualPrice = orderProduct?.price || 0;
  const discountPercentage = orderProduct?.discount || 0;
  const discountAmount = actualPrice * (discountPercentage / 100);
  const discountedPrice = actualPrice - discountAmount;
  const quantity = orderProduct?.quantity || 1;
  const totalPrice = discountedPrice * quantity;

  useEffect(() => {
    setOrderData(prev => ({
      ...prev,
      paymentType: paymentMethod,
      totalPrice: totalPrice,
      paymentStatus: 'pending'
    }));
  }, [paymentMethod, totalPrice, setOrderData]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const trustFeatures = [
    { icon: 'DollarSign', text: "Best Prices in City", color: "text-green-600" },
    { icon: 'Scissors', text: "Custom Design Expert", color: "text-purple-600" },
    { icon: 'Shield', text: "Strong Stitching Quality", color: "text-blue-600" },
    { icon: 'Users', text: "1000+ Happy Customers", color: "text-pink-600" }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Trust Building Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6" style={{background: 'linear-gradient(135deg, #d6e6ff 0%, #e5d4ef 100%)'}}>
        <div className="grid grid-cols-2 gap-3">
          {trustFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              {React.createElement(icons[feature.icon], { className: `w-4 h-4 ${feature.color}` })}
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Call to Action Section */}
        <div className="p-6" style={{backgroundColor: '#d7f9f8'}}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              {React.createElement(icons.Phone, { className: "w-5 h-5 text-green-600 mr-2" })}
              <span className="text-lg font-bold text-gray-800">Ready to Order?</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Call us now to discuss your design, measurements, and payment options
            </p>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              {React.createElement(icons.Phone, { className: "w-4 h-4 mr-2" })}
              Call Now: +91 98765 43210
            </a>
          </div>
        </div>

        {/* Assurance Banner */}
        <div className="p-4 text-center" style={{backgroundColor: '#fbe0e0'}}>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-700">
            <div className="flex items-center">
              {React.createElement(icons.Star, { className: "w-4 h-4 text-yellow-500 mr-1" })}
              <span>Trusted by 1000+</span>
            </div>
            <div className="flex items-center">
              {React.createElement(icons.Shield, { className: "w-4 h-4 text-blue-500 mr-1" })}
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center">
              {React.createElement(icons.Scissors, { className: "w-4 h-4 text-purple-500 mr-1" })}
              <span>Expert Tailoring</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;