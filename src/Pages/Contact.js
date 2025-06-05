import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const Contact = () => {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Guddi Tailoring Services",
    "telephone": "+91-9152794553",
    "email": "guddivishwakarma915@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "618, Gate No 8, Mada",
      "addressLocality": "Malad West",
      "addressRegion": "Mumbai, Maharashtra",
      "addressCountry": "India"
    },
    "openingHours": "Mo-Sa 09:00-19:00",
    "description": "Professional tailoring services in Mumbai. Custom clothing, alterations, and design services available."
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <div className="min-h-screen py-4 px-3 sm:py-8 sm:px-4 lg:px-6" 
           style={{ background: 'linear-gradient(135deg, #d6e6ff 0%, #d7f9f8 50%, #ffffea 100%)' }}>
        
        {/* Main Container */}
        <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Hero Header */}
          <div className="relative overflow-hidden" 
               style={{ background: 'linear-gradient(135deg, #e5d4ef 0%, #fbe0e0 100%)' }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
            </div>
            <div className="relative text-center py-8 px-4 sm:py-12 sm:px-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-3 sm:mb-4">
                Contact Us
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                We are always here to assist you with all your tailoring needs!
              </p>
            </div>
          </div>

          {/* Bilingual Message */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 text-center" 
               style={{ backgroundColor: '#ffffea' }}>
            <div className="max-w-4xl mx-auto">
              <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                Aap humein kabhi bhi contact kar sakte hain. Hum aapke liye hamesha tayar hain, 
                chahe wo product related ho, design related ho, ya koi aur madad chahiye ho.
              </p>
            </div>
          </div>

          {/* Contact Cards Grid */}
          <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8" 
               style={{ backgroundColor: '#fff0d4' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              
              {/* Email Card */}
              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                   style={{ borderTop: '4px solid #d6e6ff' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: '#d6e6ff' }}>
                    <Mail className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Email Us</h3>
                  <p className="text-sm sm:text-base text-gray-600 break-all">
                    guddivishwakarma915@gmail.com
                  </p>
                  <div className="mt-4">
                    <a href="mailto:guddivishwakarma915@gmail.com" 
                       className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors duration-200">
                      <Mail className="mr-2" size={16} />
                      Send Email
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                   style={{ borderTop: '4px solid #fbe0e0' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: '#fbe0e0' }}>
                    <Phone className="text-red-500" size={32} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Call Us</h3>
                  <p className="text-sm sm:text-base text-gray-600 font-mono">
                    +91 9152794553
                  </p>
                  <div className="mt-4">
                    <a href="tel:+919152794553" 
                       className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors duration-200">
                      <Phone className="mr-2" size={16} />
                      Call Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="group bg-white rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1"
                   style={{ borderTop: '4px solid #d7f9f8' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300"
                       style={{ backgroundColor: '#d7f9f8' }}>
                    <MapPin className="text-teal-600" size={32} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Visit Us</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    618, Gate No 8, Mada<br />
                    Malad West, Mumbai<br />
                    Maharashtra, India
                  </p>
                  <div className="mt-4">
                    <a href="https://maps.google.com/?q=618+Gate+No+8+Mada+Malad+West+Mumbai+Maharashtra" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors duration-200">
                      <MapPin className="mr-2" size={16} />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        

          {/* CTA Section */}
          <div className="px-4 py-6 sm:px-6 sm:py-8 bg-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                Feel free to reach out with any questions about our tailoring services. 
                We will get back to you as soon as possible!
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a href="mailto:guddivishwakarma915@gmail.com" 
                   className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                   style={{ background: 'linear-gradient(135deg, #d6e6ff 0%, #e5d4ef 100%)' }}>
                  <Mail className="mr-2" size={20} />
                  <span className="text-gray-800">Send Email</span>
                </a>
                
                <a href="tel:+919152794553" 
                   className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                   style={{ background: 'linear-gradient(135deg, #fbe0e0 0%, #fff0d4 100%)' }}>
                  <Phone className="mr-2" size={20} />
                  <span className="text-gray-800">Call Now</span>
                </a>
                
                <a href="https://wa.me/919152794553" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                   style={{ background: 'linear-gradient(135deg, #d7f9f8 0%, #ffffea 100%)' }}>
                  <MessageCircle className="mr-2" size={20} />
                  <span className="text-gray-800">WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;