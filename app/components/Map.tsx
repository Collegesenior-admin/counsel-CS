'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const FredHeroBanner: React.FC = () => {
  const bannerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelector('.fred-banner-title')?.classList.add('revealed');
            document.querySelector('.fred-banner-desc')?.classList.add('revealed');
            document.querySelector('.fred-banner-btn')?.classList.add('revealed');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (bannerRef.current) observer.observe(bannerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-375 md:px-6">
      <section
        ref={bannerRef}
        className="relative bg-[#FFD14B] md:rounded-2xl overflow-hidden w-full max-w-370 h-140 sm:h-110 md:h-auto mx-auto p-6 md:p-8 lg:p-10"
      >
        {/* Background Image */}
        <img
          src="https://scriptens.com/wp-content/uploads/2026/05/Unionstar.svg"
          alt=""
          className="absolute -left-50 -bottom-80 sm:-bottom-30 sm:-left-60 w-350 h-350 sm:w-220 sm:h-170 pointer-events-none z-0"
        />

        <div className='flex'>

        {/* LEFT CONTENT */}
        <div className="relative z-20 w-full lg:w-[60%] xl:w-[80%] md:w-[60%]">
          <h2 className="fred-banner-title text-[28px] lg:text-[32px] md:text-[28px] sm:text-[28px] max-w-275 font-bold text-[#1a1a1a] tracking-wider md:tracking-widest opacity-0 translate-y-6 transition-all duration-500 mb-2">
            Tamil Nadu&apos;s Most Trusted Unified College Application Platform
          </h2>

          <div className="fred-banner-bottom lg:flex mb-8 gap-4 items-center">
            <p className="fred-banner-desc text-[15px] md:text-[14px] font-medium text-[#3a3a2a] mb-3 italic leading-relaxed tracking-wider md:tracking-widest opacity-0 translate-y-6 transition-all duration-500 delay-200">
              Apply to multiple TN colleges with just one simple form.
            </p>
            <a
              href="#"
              className="fred-banner-btn inline-flex items-center px-8 py-3 bg-[#FFE8A5] hover:bg-[#ffd970] text-[#1a1a1a] font-semibold text-[14px] rounded-[10px] tracking-wide md:tracking-wider whitespace-nowrap transition-colors opacity-0 translate-y-6 duration-700 delay-350"
              >
              Start your Application →
            </a>
          </div>
        </div>

        {/* RIGHT MAP SECTION */}
        <div className="absolute top-50 right-0 md:top-0 md:right-0 bottom-0 w-[20%] lg:w-[40%] md:w-[40%] flex items-center justify-end overflow-visible z-10 md:mt-0">
          <div className="relative w-110 h-110 sm:w-105 sm:h-115 md:w-80 md:h-80 shrink-0 -mr-20">
            
            {/* Spinning Circle */}
            <svg
              className="fred-circle-svg absolute inset-0 w-full h-full animate-[spin_14s_linear_infinite]"
              viewBox="0 0 300 300"
              xmlns="http://www.w3.org/2000/svg"
              >
              <defs>
                <path
                  id="fredCirclePath"
                  d="M 150,150 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
                  />
              </defs>
              <text>
                <textPath
                  href="#fredCirclePath"
                  startOffset="0%"
                  className="fill-[#CD9800] text-[19px] font-normal tracking-[0.6px]"
                  >
                  Start your journey with confidence. ✦ Start your journey with confidence. ✦ Start your journey with confidence. ✦
                </textPath>
              </text>
            </svg>

            {/* Map Image */}
            <Image
              src="https://scriptens.com/wp-content/uploads/2026/05/Frame-1000005701.svg"
              alt="Tamil Nadu"
              width={360}
              height={360}
              className="fred-map-img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-80 md:w-60 h-auto z-10"
              priority
              />
          </div>
        </div>
      </div>
      </section>

      {/* Custom Animation */}
      <style jsx global>{`
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
            }
            
            .fred-banner-title.revealed,
            .fred-banner-desc.revealed,
            .fred-banner-btn.revealed {
                opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  );
};

export default FredHeroBanner;