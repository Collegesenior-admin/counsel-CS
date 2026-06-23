'use client';

import { useEffect, useRef, useState } from 'react';

const logos = [
  'https://scriptens.com/wp-content/uploads/2026/05/TWOLogo-1.png',
  'https://scriptens.com/wp-content/uploads/2026/05/Group-16210.png',
  'https://scriptens.com/wp-content/uploads/2026/05/image-2736.png',
  'https://scriptens.com/wp-content/uploads/2026/05/image-2737.png',
  'https://scriptens.com/wp-content/uploads/2026/05/Group-16221.png',
  'https://scriptens.com/wp-content/uploads/2026/05/Group-16213.png',
  'https://scriptens.com/wp-content/uploads/2026/05/AVIT_bluelogo_28bfac2511-2.png',
];

export default function TrustedUniversitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-387 mx-auto px-4 py-5 md:px-6 md:py-12 font-poppins"
    >
      <div className="grid grid-cols-1 md:grid-cols-[min-content_1fr] items-center gap-10">

        {/* LEFT */}
        <div
          className={`transition-all duration-700 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <h2 className="text-[26px] md:text-[22px] lg:text-[32px] text-center md:text-left font-semibold text-black leading-tight tracking-wider whitespace-nowrap">
            Trusted by <br />
            Reputable Universities
          </h2>
        </div>

        {/* RIGHT */}
        <div
          className={`relative overflow-hidden transition-all duration-700 delay-200 ${
            revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {/* fade */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* TRACK */}
          <div
            className={`flex w-max items-center animate-trusted-marquee ${
              paused ? 'pause-animation' : ''
            }`}
          >

            {/* SET 1 */}
            <div className="flex items-center gap-12 shrink-0">
              {logos.map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt="logo"
                  onMouseEnter={() => {
                    setPaused(true);
                    setActiveIndex(i);
                  }}
                  onMouseLeave={() => {
                    setPaused(false);
                    setActiveIndex(null);
                  }}
                  className={`h-10 w-auto object-contain transition-all duration-300
                    ${
                      activeIndex === null
                        ? 'opacity-100 grayscale-0'
                        : activeIndex === i
                        ? 'opacity-100 grayscale-0'
                        : 'opacity-25 grayscale'
                    }
                  `}
                />
              ))}
            </div>

            {/* SET 2 (duplicate) */}
            <div className="flex items-center gap-12 ml-12 shrink-0" aria-hidden="true">
              {logos.map((logo, i) => (
                <img
                  key={`dup-${i}`}
                  src={logo}
                  alt="logo"
                   onMouseEnter={() => {
                    setPaused(true);
                    setActiveIndex(i);
                  }}
                  onMouseLeave={() => {
                    setPaused(false);
                    setActiveIndex(null);
                  }}
                  className={`h-10 w-auto object-contain transition-all duration-300
                    ${
                      activeIndex === null
                        ? 'opacity-100 grayscale-0'
                        : activeIndex === i
                        ? 'opacity-100 grayscale-0'
                        : 'opacity-25 grayscale'
                    }
                  `}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
