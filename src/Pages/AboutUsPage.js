import React, { useState } from 'react';
import { Scissors, Award, Clock, Image as ImageIcon } from 'lucide-react';
 
// Import your images (assuming the import paths are correct)
import w1 from '../Assist/workProcessImages/w1.jpg'
import w2 from '../Assist/workProcessImages/w2.jpg'
import w3 from '../Assist/workProcessImages/w3.jpg'
import w4 from '../Assist/workProcessImages/w4.jpg'
import w5 from '../Assist/workProcessImages/w5.jpg'

const AboutUsPage = () => {
  const [activeImage, setActiveImage] = useState(0);

  const workProcessImages = [w1, w2, w3, w4];

  const handleImageChange = (direction) => {
    setActiveImage((prev) => {
      if (direction === 'next') {
        return (prev + 1) % workProcessImages.length;
      }
      return (prev - 1 + workProcessImages.length) % workProcessImages.length;
    });
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 font-body">
      {/* Who We Are Section */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Scissors className="text-pink-500" size={48} />
            <h1 className="text-fs-1 font-heading text-deep-burgundy">
              Our Stitching Journey
            </h1>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed">
              My passion for tailoring began over a decade ago in a small workshop passed down through my family. What started as a family tradition has grown into a dedicated craft of creating perfectly fitted garments.
            </p>
            <p className="text-lg leading-relaxed">
              Every stitch tells a story, and every garment is a canvas where precision meets creativity. I've spent years honing my skills, learning from master tailors, and developing techniques that ensure each piece is unique and perfect.
            </p>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-xl blur-xl opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={w5}
              alt="Tailor at Work" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-white py-16 shadow-lg">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Award className="text-purple-500" size={48} />
            <h2 className="text-fs-2 font-heading text-deep-burgundy">
              Our Mission
            </h2>
          </div>
          <p className="max-w-3xl mx-auto text-fs-5 text-gray-700 leading-normal">
            We are committed to delivering exceptional quality, personalised service, and impeccable fit. Our mission is to transform fabrics into masterpieces that not only look stunning but make you feel confident and comfortable.
          </p>
        </div>
      </section>

      {/* Our Workshop Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center space-x-4 mb-12">
          <ImageIcon className="text-pink-500" size={48} />
          <h2 className="text-fs-2 font-heading text-deep-burgundy">
            Our Workshop
          </h2>
        </div>
        <div className="relative group">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src={workProcessImages[activeImage]} 
              alt="Workshop" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
            />
          </div>
          <div className="flex justify-center mt-6 space-x-4">
            <button 
              onClick={() => handleImageChange('prev')}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 shadow-md"
            >
              Previous
            </button>
            <button 
              onClick={() => handleImageChange('next')}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300 shadow-md"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-white py-16 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Clock className="text-purple-500" size={48} />
            <h2 className="text-fs-2 font-heading text-deep-burgundy">
              Our Achievements
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Scissors className="text-pink-500 mx-auto mb-4" size={48} />,
                title: "10+ Years",
                subtitle: "Of Tailoring Experience"
              },
              { 
                icon: <Award className="text-purple-500 mx-auto mb-4" size={48} />,
                title: "5000+ Blouses",
                subtitle: "Best Tailoring Service"
              },
              { 
                icon: <ImageIcon className="text-blue-500 mx-auto mb-4" size={48} />,
                title: "150+ Unique Designs",
                subtitle: "Professional Tailoring"
              }
            ].map((achievement, index) => (
              <div 
                key={index} 
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
              >
                {achievement.icon}
                <h3 className="text-fs-4 font-heading mb-3 text-gray-800">
                  {achievement.title}
                </h3>
                <p className="text-fs-6 font-bodytext-gray-600">
                  {achievement.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;