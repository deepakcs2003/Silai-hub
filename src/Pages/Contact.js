import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-100">
            We are always here to assist you with all your tailoring needs!
          </p>
        </div>

        {/* Bilingual Intro */}
        <div className="p-6 bg-gray-100 text-center italic">
          <p className="text-gray-700">
            Aap humein kabhi bhi contact kar sakte hain. Hum aapke liye hamesha tayar hain, 
            chahe wo product related ho, design related ho, ya koi aur madad chahiye ho.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="grid md:grid-cols-3 gap-6 p-8">
          {/* Email */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300">
            <Mail className="mx-auto mb-4 text-pink-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600">guddivishwakarma915@gmai.com</p>
          </div>

          {/* Phone */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300">
            <Phone className="mx-auto mb-4 text-purple-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600">+91 9152794553</p>
          </div>

          {/* Address */}
          <div className="bg-white border rounded-lg p-6 text-center shadow-md hover:shadow-xl transition-all duration-300">
            <MapPin className="mx-auto mb-4 text-blue-500" size={48} />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600">618,gate no 8,mada, malad west Mumbai, Maharashtra, India</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-gray-100 text-center">
          <p className="mb-6 text-lg text-gray-700">
            Feel free to reach out with any questions. We will get back to you as soon as possible!
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="mailto:contact@guddisilai.com" 
              className="px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors duration-300 flex items-center"
            >
              <Mail className="mr-2" size={20} />
              Email Us
            </a>
            <a 
              href="tel:+911234567890" 
              className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300 flex items-center"
            >
              <Phone className="mr-2" size={20} />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;