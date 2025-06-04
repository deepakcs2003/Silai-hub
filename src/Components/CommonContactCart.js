import { Phone, Smartphone } from 'lucide-react'
import React from 'react'

const CommonContactCart = () => {
    
    const phoneNumber = '+91 9152794553';
    const cleanedPhoneNumber = phoneNumber.replace(/\s+/g, '');
  
    const handleCall = () => {
      window.location.href = `tel:${cleanedPhoneNumber}`;
    };
  return (
    <div>
         <div className="contact-section bg-white shadow-md rounded-lg p-4 max-w-md mx-auto my-4 flex flex-col items-center space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <Smartphone className="text-blue-500" size={32} />
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="text-gray-600 mb-2">Need help? Reach out to us directly</p>
          <div className="flex items-center space-x-3">
            <span className="text-lg font-medium text-gray-700">{phoneNumber}</span>
          </div>
        </div>

        <button
          onClick={handleCall}
          className="
          flex items-center justify-center 
          w-full max-w-xs 
          bg-blue-500 text-white 
          py-3 px-6 
          rounded-full 
          hover:bg-blue-600 
          transition duration-300 
          ease-in-out 
          transform hover:scale-105 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-300 
          shadow-md
        "
        >
          <Phone className="mr-2" size={20} />
          Call Now
        </button>
      </div>
    </div>
  )
}

export default CommonContactCart