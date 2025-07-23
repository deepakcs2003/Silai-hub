import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import summaryApi from '../Common';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.signUp.url, {
      method: summaryApi.signUp.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
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
      console.error('Signup failed:', data.message);
    }
  };

  const handleGoogleSignup = async (response) => {
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
      console.error('Google signup failed:', data.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-4 py-8 font-body" 
      style={{background: 'linear-gradient(135deg, #d7f9f8 0%, #ffffea 25%, #fff0d4 50%, #fbe0e0 75%, #e5d4ef 100%)'}}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div 
            className="px-8 pt-8 pb-6 text-center" 
            style={{background: 'linear-gradient(135deg, #d7f9f8, #ffffea)'}}
          >
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg" 
              style={{background: 'linear-gradient(135deg, #fbe0e0, #e5d4ef)'}}
            >
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-fs-2 font-heading text-deep-burgundy leading-tight">Join Us Today</h1>
            <p className="text-fs-6 text-gray-600 tracking-tight">Create your new account</p>
          </div>


            {/* Google Login */}
            <div className="flex justify-center mt-10">
              <div className="w-[90%]">
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => console.error('Google Signup Failed')}
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
          <div className="px-8 pb-8 mt-4">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gold focus:ring-4 focus:ring-gold/30 outline-none text-fs-6 text-deep-burgundy placeholder-gray-400 font-body bg-off-white"
                    style={{background: 'linear-gradient(135deg, #d7f9f8, #ffffea)'}}
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gold focus:ring-4 focus:ring-gold/30 outline-none text-fs-6 text-deep-burgundy placeholder-gray-400 font-body bg-off-white"
                    style={{background: 'linear-gradient(135deg, #d7f9f8, #ffffea)'}}
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                     className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gold focus:ring-4 focus:ring-gold/30 outline-none text-fs-6 text-deep-burgundy placeholder-gray-400 font-body bg-off-white"
                    style={{background: 'linear-gradient(135deg, #d7f9f8, #ffffea)'}}
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
                className="w-full py-4 rounded-2xl font-semibold text-white font-heading text-fs-5 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-deep-burgundy to-gold"
                style={{background: 'linear-gradient(135deg, #10b981, #059669)'}}
              >
                Create Account
              </button>
            </form>

           

            {/* Login Link */}
            <div className="text-center mt-8 text-fs-7">
              <p className="text-gray-600">
                Already have an account?{' '}
                <a 
                  href="/login" 
                  className="font-semibold text-emerald-600 hover:text-emerald-800 transition-colors duration-300 hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-fs-7 text-gray-500">
          <p className="text-gray-500 text-sm">
            By signing up, you agree to our Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;