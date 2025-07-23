import React from 'react';
 
const ReasonIcon = ({ children }) => (
  <div className="bg-accent/10 rounded-full p-4 inline-block">
    {children}
  </div>
);

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: "Over 10 Years of Experience",
      description: "Decades of expertise in creating perfect, custom-fitted garments."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        </svg>
      ),
      title: "Personalized Services",
      description: "Every piece is designed to fit your style and preferences."
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="M17 20h5v2h-5zM7 20h5v2H7zM2 3h3V1H2zm16 2h3V4h-3zm-5 5h5V8h-5zm-9 2h5v-1H3zM17 15h5v-1h-5zm-9 2h5v-1H8z" />
        </svg>
      ),
      title: "Affordable Pricing",
      description: "High-quality tailoring without breaking the bank."
    }
  ];

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-fs-2 font-heading font-bold leading-tight tracking-wide text-deep-burgundy">Why Choose Us</h2>
        <p className="text-fs-6 font-body leading-normal tracking-wide text-gray-700 mt-4">Crafting Perfection for Every Occasion</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reasons.map((reason, index) => (
          <div key={index} className="bg-neutral-50 p-6 rounded-lg shadow-md">
            <ReasonIcon>{reason.icon}</ReasonIcon>
            <h3 className="text-fs-4 font-heading font-semibold leading-tight tracking-tight text-deep-burgundy mt-4">
          {reason.title}
          </h3>

          <p className="text-fs-6 font-body leading-normal tracking-wide text-gray-700 mt-2">
            {reason.description}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
