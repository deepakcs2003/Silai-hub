import React, { useContext, useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
const HeroSection = lazy(() => import('../Components/HeroSection'));
const Services = lazy(() => import('../Components/ServiceCard'));
const WhyChooseUs = lazy(() => import('../Components/WhyChooseUs'));
const FeaturedDesigns = lazy(() => import('../Components/FeaturedDesigns'));
const FeedbackCard = lazy(() => import('../Components/FeedbackComponents/FeedbackCard'));
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
// ...existing code...

const Home = () => {
  const { allFeedback } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const observerRef = useRef();
  const loadingRef = useRef();

  // Save and restore scroll position
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }

    const handleBeforeUnload = () => {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    };
  }, []);

  // Sort feedback by rating descending
  const sortedFeedback = [...(allFeedback || [])].sort((a, b) => b.rating - a.rating);
  const visibleFeedback = sortedFeedback.slice(0, visibleCount);

  // Infinite scroll callback
  const loadMoreFeedback = useCallback(() => {
    if (isLoading || visibleCount >= sortedFeedback.length) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 12, sortedFeedback.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, visibleCount, sortedFeedback.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && visibleCount < sortedFeedback.length) {
          loadMoreFeedback();
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreFeedback, isLoading, visibleCount, sortedFeedback.length]);

  const handleCustomDesign = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    navigate('/contact');
  };

  const handleFeedback = () => {
    sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    navigate('/feedback');
  };

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
            <Suspense fallback={<div>Loading designs...</div>}>
              <FeaturedDesigns />
            </Suspense>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row mt-4 gap-4 px-4 justify-center items-center">
            <button
              onClick={handleCustomDesign}
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              💬 Get Custom Design
            </button>
            <button
              onClick={handleFeedback}
              className="w-full sm:w-auto bg-white text-purple-600 font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
            >
              😄 Give Feedback
            </button>
          </div>
        </div>
      </section>
      
      {/* All Products with Infinite Scroll */}
      {visibleFeedback.length > 0 && (
        <section className="px-4">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              🎨 All Products
            </h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              Discover our complete collection of amazing designs
            </p>
          </div>

          <div className="grid grid-cols-2 mx-3 md:mx-3 mt-6 md:mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {visibleFeedback.map((feedback, index) => (
              <div
                key={feedback._id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Suspense fallback={<div>Loading feedback...</div>}>
                  <FeedbackCard feedback={feedback} isOwner={false} />
                </Suspense>
              </div>
            ))}
          </div>

          {/* Loading indicator and infinite scroll trigger */}
          {visibleCount < sortedFeedback.length && (
            <div ref={loadingRef} className="flex justify-center py-8">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  <span className="text-purple-600 font-medium">Loading more amazing designs...</span>
                </div>
              ) : (
                <div className="text-purple-600 font-medium opacity-50">
                  Scroll down to discover more designs
                </div>
              )}
            </div>
          )}

          {/* End of content indicator */}
          {visibleCount >= sortedFeedback.length && sortedFeedback.length > 12 && (
            <div className="text-center py-8">
              <div className="text-gray-600 font-medium">
                🎉 You've explored our entire collection!
              </div>
            </div>
          )}
        </section>
      )}

      {/* Other Sections */}
      <section className="space-y-12 md:space-y-16 py-8">
        {/* Hero Section Component */}
        <div className="overflow-hidden">
          <Suspense fallback={<div>Loading hero...</div>}>
            <HeroSection />
          </Suspense>
        </div>

        {/* Why Choose Us Component */}
        <div className="mx-4 rounded-2xl shadow-xl overflow-hidden">
          <Suspense fallback={<div>Loading why choose us...</div>}>
            <WhyChooseUs />
          </Suspense>
        </div>

        {/* Services Component */}
        <div className="mx-4 rounded-2xl shadow-xl overflow-hidden">
          <Suspense fallback={<div>Loading services...</div>}>
            <Services />
          </Suspense>
        </div>
      </section>

      {/* Customer Feedback Section Header */}
      {visibleFeedback.length > 0 && (
        <section className="px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                What Our Customers Say
              </h2>
              <div className="w-24 h-1 bg-white mx-auto rounded-full mb-4"></div>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Real experiences from our valued customers
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;