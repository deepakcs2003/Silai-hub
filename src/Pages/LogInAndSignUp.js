import React from 'react';
import { Link } from 'react-router-dom';
 
export const LogInAndSignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-fs-6 font-body">Welcome!</h2>
      <p className="text-lg text-gray-600 mb-8 text-fs-6 font-body">Please choose an option:</p>
      <div className="flex gap-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-blue-500 text-white text-lg text-fs-6 font-body rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-3 bg-green-500 text-white text-fs-6 font-body text-lg rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

