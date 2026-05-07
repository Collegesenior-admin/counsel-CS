'use client';

import React, { useEffect, useState } from 'react';
import { 
  SearchCode, 
  Building2, 
  MapPlus, 
  Route 
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

  // Scroll Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('why-choose-us');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <section id="why-choose-us" className="max-w-400 mx-auto px-6 md:px-10 py-16 font-sans">
      {/* Header */}
      <div className="mb-12 text-center lg:text-left">
        <p className="text-sm text-blue-600 font-medium mb-2">The CollegeSenior’s Advantage</p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Why Choose <span className="text-[#2F80ED]">CollegeSenior?</span>
        </h2>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto lg:mx-0 text-[15px] leading-relaxed">
          Here’s why thousands of students and parents trust CollegeSenior for a stress-free admission journey with expert guidance, personal attention, and reliable support.
        </p>
      </div>

      {/* Desktop Layout - 4 Columns with Dividers */}
      <div className="hidden lg:flex gap-0 pt-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`flex-1 px-10 relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="w-14 h-14 bg-[#f7f7ff] border border-[#aec4ff] rounded-2xl flex items-center justify-center mb-6">
                <Icon className="w-8 h-8 text-gray-700" strokeWidth={2} />
              </div>

              <h3 className="text-[17px] font-bold text-gray-900 mb-3 leading-tight">
                {card.title}
              </h3>

              <p className="text-[14px] text-gray-600 leading-relaxed">
                {card.desc}
              </p>

              {/* Vertical Divider */}
              {index !== cards.length - 1 && (
                <div className="absolute right-0 top-0 h-full w-px bg-gray-200" />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile + Tablet Carousel */}
      <div className="lg:hidden">
        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 2.25)}%)`,
            }}
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="min-w-[calc((100vw-80px)/2.25)] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col"
                >
                  <div className="w-14 h-14 bg-[#f5f5f3] border border-[#e0e0de] rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-gray-700" strokeWidth={2} />
                  </div>

                  <h3 className="text-[17px] font-bold text-gray-900 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[14px] text-gray-600 leading-relaxed flex-1">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === cards.length - 1}
            className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;