import React from 'react';
import { Shirt, Star, Scissors } from 'lucide-react';

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-neutral-50 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
    <p className="text-neutral-600">{description}</p>
  </div>
);

const Services = () => {
  const services = [
    {
      icon: <Shirt size={48} className="text-accent" />,
      title: "Custom Blouse Stitching",
      description: "Perfectly tailored blouses that complement your style and body type."
    },
    {
      icon: <Star size={48} className="text-accent" />,
      title: "Star & Lehenga Designing",
      description: "Exquisite designs that make you stand out on special occasions."
    },
    {
      icon: <Scissors size={48} className="text-accent" />,
      title: "Alteration Services",
      description: "Professional alterations to ensure your clothes fit like a glove."
    }
  ];

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-primary">Our Services</h2>
        <p className="text-neutral-600 mt-4">Crafting Perfection, Stitch by Stitch</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
