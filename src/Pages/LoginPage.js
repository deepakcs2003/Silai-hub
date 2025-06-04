import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import summaryApi from '../Common';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.logIn.url, {
      method: summaryApi.logIn.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('profilePicture', data.user.profilePicture);
      localStorage.setItem('userId',data.user._id);

      navigate('/');
      window.location.reload();
    } else {
      console.error('Login failed:', data.message);
    }
  };

  const handleGoogleLogin = async (response) => {
    const credential = response.credential;
    const backendResponse = await fetch(summaryApi.google.url, {
      method: summaryApi.google.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    });
    const data = await backendResponse.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('profilePicture', data.user.profilePicture);
      localStorage.setItem('userId',data.user._id);

      navigate('/');
      window.location.reload();
    } else {
      console.error('Google login failed:', data.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8" 
      style={{background: 'linear-gradient(135deg, #d6e6ff 0%, #d7f9f8 25%, #ffffea 50%, #fff0d4 75%, #fbe0e0 100%)'}}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div 
            className="px-8 pt-8 pb-6 text-center" 
            style={{background: 'linear-gradient(135deg, #e5d4ef, #d6e6ff)'}}
          >
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg" 
              style={{background: 'linear-gradient(135deg, #fff0d4, #ffffea)'}}
            >
              <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>
          

            {/* Google Login */}
            <div className="flex justify-center mt-10">
              <div className="w-[90%]">
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => console.error('Google Login Failed')}
                  theme="outline"
                  size="large"
                  width="100%"
                />
              </div>
            </div>
             {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
          {/* Form Section */}
          <div className="px-8 pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-gray-700 placeholder-gray-400"
                    style={{background: 'linear-gradient(135deg, #ffffea, #fff0d4)'}}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none text-gray-700 placeholder-gray-400"
                    style={{background: 'linear-gradient(135deg, #ffffea, #fff0d4)'}}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{background: 'linear-gradient(135deg, #667eea, #764ba2)'}}
              >
                Sign In
              </button>
            </form>

           

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <a 
                  href="/signup" 
                  className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-300 hover:underline"
                >
                  Create Account
                </a>
              </p>
            </div>
              {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Secure login with end-to-end encryption
          </p>
        </div>
          </div>
          
        </div>

      
      </div>
    </div>
  );
};

export default LoginPage;