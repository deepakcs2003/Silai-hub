import { memo, useMemo } from 'react';

const StarRating = memo(({ rating }) => {
  return (
    <div className="flex text-yellow-500">
      {[...Array(5)].map((_, index) => (
        <svg 
          key={index} 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill={index < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
});

const Testimonials = memo(() => {
  const testimonials = useMemo(() => [
    {
      name: 'Sarah Johnson',
      image: '/images/customer-1.jpg',
      review: 'Absolutely amazing tailoring! The blouse fits perfectly and the design is exactly what I wanted.',
      rating: 5
    },
    {
      name: 'Raj Patel',
      image: '/images/customer-2.jpg',
      review: 'Professional service and quick turnaround. My wedding suit was tailored to perfection.',
      rating: 5
    },
    {
      name: 'Emily Wong',
      image: '/images/customer-3.jpg',
      review: 'Great alterations service. They transformed my old dress into something beautiful.',
      rating: 4
    }
  ], []);

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary">Customer Testimonials</h2>
          <p className="text-neutral-600 mt-4">What Our Clients Say</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-neutral-50 p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-primary">{testimonial.name}</h3>
                  <StarRating rating={testimonial.rating} />
                </div>
              </div>
              <p className="text-neutral-600 italic">"{testimonial.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
export { StarRating };
export default Testimonials;
