import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Note: Replace these with your actual image imports
import b1 from '../Assist/b1.jpg';
import b2 from '../Assist/b2.jpg';
import b3 from '../Assist/b3.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = [
    {
      image: b1,
      title: "Perfect Fit, Every Time!",
      subtitle: "Tailored Elegance for Every Occasion",
      description: "Where Precision Meets Style",
      buttonText: "Explore Designs",
      link: "/gallery" // Link for Explore Designs button
    },
    {
      image: b2,
      title: "Custom Couture Crafted",
      subtitle: "Unique Designs, Personal Touch",
      description: "Your Vision, Our Expertise",
      buttonText: "Start Your Design",
      link: "/order/null/custom" // Link for Start Your Design button
    },
    {
      image: b3,
      title: "Seamless Style Solutions",
      subtitle: "Tailoring Beyond Boundaries",
      description: "Comfort Meets Sophistication",
      buttonText: "Order Now",
      link: "/gallery" // Link for Order Now button
    }
  ];

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroContent.length);
  }, [heroContent.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  // Auto-slider effect
  useEffect(() => {
    const autoSlideInterval = setInterval(handleNextSlide, 5000);
    return () => clearInterval(autoSlideInterval);
  }, [handleNextSlide]);

  return (
    <div className="relative h-[250px] md:h-[700px] w-full overflow-hidden">
      {/* Background Image Carousel */}
      {heroContent.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out
            ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        />
      ))}

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 
              ${currentSlide === index ? 'bg-white w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <button 
        onClick={handlePrevSlide} 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/40 text-white 
                   p-3 rounded-full z-20 transition duration-300 
                   hidden md:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={handleNextSlide} 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/40 text-white 
                   p-3 rounded-full z-20 transition duration-300 
                   hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 flex flex-col justify-center h-full text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white 
                         drop-shadow-lg animate-fade-in-up">
            {heroContent[currentSlide].title}
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90 
                         drop-shadow-md animate-fade-in-up animation-delay-200">
            {heroContent[currentSlide].subtitle}
          </h2>
          <p className="text-md md:text-lg mb-8 text-white/80 
                        drop-shadow-md animate-fade-in-up animation-delay-400 max-w-2xl mx-auto">
            {heroContent[currentSlide].description}
          </p>
          
          <div className="flex justify-center space-x-4 animate-fade-in-up animation-delay-600">
            {/* First Button with Link */}
            <a 
              href={heroContent[currentSlide].link} 
              className="bg-white text-gray-900 px-6 py-2 rounded-full 
                         hover:bg-gray-100 transition duration-300 
                         flex items-center font-semibold shadow-lg"
            >
              {heroContent[currentSlide].buttonText} 
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            {/* Second Button with Link */}
            <a 
              href="/about" 
              className="bg-transparent border-2 border-white text-white 
                         px-6 py-2 rounded-full hover:bg-white/20 
                         transition duration-300 flex items-center font-semibold"
            >
              Learn More 
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
