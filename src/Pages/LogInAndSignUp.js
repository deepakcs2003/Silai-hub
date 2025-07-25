import React, { lazy, Suspense } from 'react';
const Link = lazy(() => import('react-router-dom').then(mod => ({ default: mod.Link })));

export const LogInAndSignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h2>
      <p className="text-lg text-gray-600 mb-8">Please choose an option:</p>
      <div className="flex gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Link to="/login">
            <button className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">
              Login
            </button>
          </Link>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Link to="/signup">
            <button className="px-6 py-3 bg-green-500 text-white text-lg rounded-lg shadow-md hover:bg-green-600 focus:outline-none">
              Signup
            </button>
          </Link>
        </Suspense>
      </div>
    </div>
  );
};

