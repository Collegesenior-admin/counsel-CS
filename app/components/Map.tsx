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
    <div className="mx-auto max-w-375 min-[575]:px-6">
      <section
        ref={bannerRef}
        className="relative bg-[#FFD14B] min-[575]:rounded-2xl overflow-hidden w-full max-w-370 max-[424]:h-120 max-[575]:h-115 min-[575]:h-68 md:h-65 lg:h-60 mx-auto p-6 min-575:mx-6 md:p-8 lg:p-8"
      >
        {/* Background Image */}
        <img
          src="https://scriptens.com/wp-content/uploads/2026/05/Unionstar.svg"
          alt=""
          className="absolute -left-28 -bottom-130 sm:-bottom-55 sm:-left-70 md:-left-90 md:-bottom-60 w-370 h-370 max-[575]:scale-250 sm:w-240 sm:h-180 pointer-events-none z-0"
        />

        <div className='flex'>

          {/* LEFT CONTENT */}
          <div className="relative z-20 min-[424]:w-[90%] max-[424]:w-full min-[575]:w-[65%] lg:w-[70%] sm:w-[60%] md:w-[65%] sm:ml-3">
            <h2 className="fred-banner-title text-[27px] lg:text-[28px] md:text-[22px] min-[575]:text-[22px] max-w-275 p-0 font-semibold text-[#1a1a1a] tracking-wide md:tracking-wider opacity-0 transition-all duration-500">
              Tamil Nadu&apos;s Most Trusted Unified College Application Platform
            </h2>

            <div className="max-[575]:-mt-4 lg:flex lg:gap-4 p-0 m-0">
              <p className="fred-banner-desc text-[15px] md:text-[14px] font-medium text-[#3a3a2a] mb-5 lg:mb-0 items-center italic tracking-wider md:tracking-widest opacity-0 translate-y-7 transition-all duration-500 delay-200">
                Apply to multiple TN colleges with just one simple form.
              </p>
              <a
                href="#"
                className="fred-banner-btn inline-flex items-center px-8 py-3 bg-[#FFE8A5] hover:bg-[#ffd970] text-[#1a1a1a] mb-3 lg:mb-0 font-semibold text-[14px] rounded-[10px] tracking-wide md:tracking-wider whitespace-nowrap transition-colors opacity-0 translate-y-4 duration-700 delay-350"
              >
                Start your Application →
              </a>
            </div>
          </div>

          {/* RIGHT MAP SECTION */}
          <div className="absolute max-[424]:-right-18 max-[424]:top-43 max-[575]:-right-14 max-[575]:top-40 min-[575]:-right-5 min-[575]:-top-6 max-[640]:-top-15 max-[575]:w-[20%] lg:w-[40%] md:w-[20%] min-[575]:w-[20%] flex items-center justify-end overflow-visible z-10 md:mt-0">
            <div className="relative max-[575]:w-90 max-[575]:h-90 min-[575]:w-85 min-[575]:h-85 md:w-80 md:h-80 shrink-0 -mr-20">

              {/* Spinning Circle */}
              <svg
                className="fred-circle-svg absolute top-[43%] left-1/3 -translate-x-1/2 -translate-y-1/2 w-full h-full overflow-hidden animate-[spin_14s_linear_infinite]"
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
                className="fred-map-img absolute top-[43%] left-1/3 -translate-x-1/2 -translate-y-1/2 max-[575]:w-60 min-[574]:w-65 md:w-60 h-auto border z-10"
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
