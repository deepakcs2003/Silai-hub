import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PromoBanner = () => {
  return (
    <div className="w-full bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center">
        <Link 
          to="/order/null/custom" 
          className="flex items-center justify-center space-x-2 
                     text-sm sm:text-base md:text-lg font-heading
                     font-medium hover:text-indigo-100 
                     transition-colors duration-300 
                     group"
        >
          <span className="animate-pulse">✨</span>
          <span className="text-center whitespace-nowrap overflow-hidden text-ellipsis">
            Apna design, apne hisaab se! Click karo, customize karo
          </span>
          <ChevronRight 
            className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" 
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </div>
  );
};

export default PromoBanner;