'use client';

import { useRef, useState } from 'react';

export default function FeaturedColleges() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState('anna');

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -380, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 380, behavior: 'smooth' });
  };

  return (
    <section className="bg-gray-100 p-4 md:p-12">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/3 pt-4 lg:pt-10">
            <h2 className="text-2xl md:text-4xl font-medium mb-2">
              Featured College
            </h2>

            <p className="text-gray-500  md:text-md leading-5 mb-6 text-justify">
              Our counselors, with years of experience in education and admissions,
              have helped hundreds of students secure seats in top colleges.
              Personalized guidance you can trust.
            </p>

            {/* TOGGLE */}
            <div className="relative bg-[#1D71F2] p-1 rounded-full inline-flex items-center w-full max-w-85 h-13 md:h-13 sm:h-13">
              <button
                onClick={() => setActive('anna')}
                className={`relative z-10 flex-1 font-medium text-md m-1 p-2 rounded-full transition-colors md:p-2 sm:p-2
                  ${active === 'anna' ? 'bg-white text-[#1D71F2]' : 'text-white'}
                `}
              >
                Anna University
              </button>

              <button
                onClick={() => setActive('deemed')}
                className={`relative z-10 flex-1 font-medium text-md m-1 p-2 rounded-full transition-colors
                  ${active === 'deemed' ? 'bg-white text-[#1D71F2]' : 'text-white'}
                `}
              >
                Deemed
              </button>
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="w-full lg:w-2/3 relative">

            {/* Controls */}
            <button
              onClick={scrollLeft}
              className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#1D71F2] shadow-xl hover:bg-[#1D71F2] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>

            <button
              onClick={scrollRight}
              className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[#1D71F2] shadow-xl hover:bg-[#1D71F2] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>

            {/* Carousel */}
            <div
              ref={carouselRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth snap-x pb-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="snap-start min-w-70 md:min-w-[320px] lg:min-w-75 bg-white rounded-lg p-3 shadow-sm border border-gray-100 shrink-0"
                >
                  <div className="rounded-lg overflow-hidden mb-1">
                    <div className="w-full h-90 md:h-90 lg:h-90 bg-gray-300 flex items-center justify-center text-gray-600 text-sm md:text-base">
                      College Banner
                    </div>
                  </div>

                  <div className="bg-[#1D71F2] rounded-md flex overflow-hidden">
                    <button className="flex-1 text-white font-bold p-2 hover:bg-blue-700 transition-colors text-sm md:text-base">
                      Apply now
                    </button>
                    <button className="flex-1 text-blue-600 p-1 m-1 font-bold bg-white rounded-sm hover:bg-blue-700 hover:text-white transition-colors text-sm md:text-base">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
