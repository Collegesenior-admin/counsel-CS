'use client';

import React, { useEffect, useState } from 'react';
import { 
  SearchCode, 
  Building2, 
  MapPlus, 
  Route, 
  ChevronRight,
  ChevronLast,
  ChevronLeft
} from 'lucide-react';

const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const cards = [
    {
      icon: SearchCode,
      title: "Free Counseling, Always",
      desc: "Our guidance is completely free for students and parents. You get honest, unbiased advice with no charges or pressure — just the help you need to make the right choice.",
    },
    {
      icon: Building2,
      title: "Trusted by Top Colleges",
      desc: "We work closely with leading colleges across Tamil Nadu. This ensures accurate details, smoother processes, and better support for your admission journey.",
    },
    {
      icon: MapPlus,
      title: "Personalized College Mapping",
      desc: "Every student is different. Our counselors take the time to understand your profile and suggest options that truly match your academic goals and interests.",
    },
    {
      icon: Route,
      title: "Guidance from Start to Finish",
      desc: "From exploring colleges to submitting forms and getting confirmation, we guide you through the entire process — clear, simple, and always available to assist.",
    },
  ];

  useEffect(() => {
    const section = document.getElementById('why-choose-us');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section id="why-choose-us" className="max-w-387 mx-auto p-3 md:p-6 font-sans overflow-hidden">
      {/* Header */}
      <div className="mb-10 text-left">
        <h2 className="text-3xl md:text-5xl font-semibold md:font-bold text-gray-900 leading-tight">
          Why Choose <span className="text-blue-600">CollegeSenior?</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto lg:mx-0 text-[15px] leading-relaxed">
          Here's why thousands of students and parents trust CollegeSenior for a stress-free admission journey with expert guidance, personal attention, and reliable support.
        </p>
      </div>

      {/* Desktop Layout - 4 Columns */}
      <div className="hidden lg:flex gap-0 pt-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`flex-1 px-6 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-[17px] font-bold text-gray-800 mb-3">{card.title}</h3>
              <p className="text-[14px] text-gray-600 leading-relaxed">{card.desc}</p>
              
              {index !== cards.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile + Tablet Carousel */}
      <div className="lg:hidden relative">
        <div className="overflow-visible">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              // Calculation accounts for the width of the card + the gap
              transform: `translateX(calc(-${currentIndex} * (100% / 1.25 + 24px/1.25)))`,
            }}
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="min-w-[calc((100vw-80px)/1.25)] md:min-w-[calc((100vw-80px)/2.25)] bg-white  flex flex-col"
                >
                  <div className="w-14 h-14 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-[12px] text-gray-600 leading-relaxed flex-1">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === cards.length - 1}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
