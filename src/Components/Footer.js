import React from "react";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  Scissors, 
  MapPin 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-pink-50 to-purple-50 text-gray-800 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Contact Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <Scissors className="text-pink-500" size={36} />
              <h2 className="font-heading text-fs-2 font-bold text-gray-800">Guddi Silai</h2>
            </div>
            <p className="font-body text-fs-6 text-gray-600 mb-6 max-w-xs mx-auto md:mx-0">
              Crafting the perfect fit for every occasion, with passion and precision.
            </p>
            <div className="space-y-3 font-body text-fs-6 text-gray-600">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="text-pink-500" size={20} />
                <p>contact@guddisilai.com</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="text-pink-500" size={20} />
                <p>+91 7709894512</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="text-pink-500" size={20} />
                <p>Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="font-heading text-fs-3 font-semibold text-gray-800 mb-6">Quick Links</h3>
             <ul className="space-y-4 font-body text-fs-6">
              {[
                { href: "#about", label: "About Us" },
                { href: "#services", label: "Services" },
                { href: "#portfolio", label: "Portfolio" },
                { href: "#contact", label: "Contact" }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h3 className="font-heading text-fs-3 font-semibold text-gray-800 mb-6">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              {[
                { 
                  Icon: Instagram, 
                  href: "https://www.instagram.com",
                  color: "text-pink-500 hover:text-pink-600"
                },
                { 
                  Icon: Facebook, 
                  href: "https://www.facebook.com",
                  color: "text-blue-500 hover:text-blue-600"
                },
                { 
                  Icon: Twitter, 
                  href: "https://www.twitter.com",
                  color: "text-sky-500 hover:text-sky-600"
                }
              ].map(({ Icon, href, color }) => (
                <a 
                  key={href}
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${color} transition-colors duration-300 transform hover:scale-110`}
                >
                  <Icon size={32} />
                </a>
              ))}
            </div>
            <div className="mt-6 font-body text-fs-6 text-gray-600">
              <p>Follow our creative journey!</p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Copyright */}
         <div className="text-center font-body text-fs-7 text-gray-600">
          <p className="font-body text-fs-7">
            &copy; {new Date().getFullYear()} Guddi Silai. 
            <span className="ml-2 hidden md:inline">
              Tailoring Dreams, Stitch by Stitch.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};