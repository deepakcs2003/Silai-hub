import React, { useContext, useState } from 'react';
import HeroSection from '../Components/HeroSection';
import Services from '../Components/ServiceCard';
import WhyChooseUs from '../Components/WhyChooseUs';
import FeaturedDesigns from '../Components/FeaturedDesigns';
import { AppContext } from '../App';
import FeedbackCard from '../Components/FeedbackComponents/FeedbackCard';
import { useNavigate } from 'react-router-dom';
import { Smile } from "lucide-react";

const Home = () => {
  const { allFeedback } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(12);
  const navigate = useNavigate();

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  // Sort feedback by rating descending
  const sortedFeedback = [...(allFeedback || [])].sort((a, b) => b.rating - a.rating);
  const visibleFeedback = sortedFeedback.slice(0, visibleCount);

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #d6e6ff 0%, #d7f9f8 20%, #ffffea 40%, #fff0d4 60%, #fbe0e0 80%, #e5d4ef 100%)'
      }}
    >
      {/* Simple Hero Section */}
      <section className="py-2">
        <div className="mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-4 md:mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Premium Design Collection
            </h1>
            <p className="text-black text-lg md:text-xl max-w-2xl mx-auto">
              Discover amazing designs crafted with passion and precision
            </p>
          </div>

          {/* Featured Products */}
          <div className="">
            <FeaturedDesigns />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 px-4 justify-center items-center">
            <a
              href="/gallery"
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              🎨 View All Product
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              💬 Get Custom Design
            </button>
                 <a
                href="/feedback"
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
              >
              😄  Give Feedback
              </a>
          </div>
          
        </div>
        
      </section>
      
          {/* Feedback Grid */}
            <div className="grid grid-cols-2 mx-3 md:mx-3 mt-6 md:mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              
              {visibleFeedback.map((feedback, index) => (
                <div
                  key={feedback._id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <FeedbackCard feedback={feedback} isOwner={false} />
                </div>
              ))}
            </div>

      {/* Other Sections */}
      <section className="space-y-12 md:space-y-16 py-8">
        {/* Hero Section Component */}
        <div className=" overflow-hidden">
          <HeroSection />
        </div>

        {/* Why Choose Us Component */}
        <div className="mx-4 rounded-2xl shadow-xl overflow-hidden">
          <WhyChooseUs />
        </div>

        {/* Services Component */}
        <div className="mx-4 rounded-2xl shadow-xl overflow-hidden">
          <Services />
        </div>
      </section>

      {/* Customer Feedback Section */}
      {visibleFeedback.length > 0 && (
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What Our Customers Say
              </h2>
              <div className="w-24 h-1 bg-white mx-auto rounded-full mb-4"></div>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Real experiences from our valued customers
              </p>
            </div>

        

            {/* Load More Button */}
            {visibleCount < sortedFeedback.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleViewMore}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  ⬇️ View More
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;