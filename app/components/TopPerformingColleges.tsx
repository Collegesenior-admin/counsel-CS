'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const colleges = [
  {
    image: 'https://scriptens.com/wp-content/uploads/2026/05/image-2733.png',
    logo: 'https://scriptens.com/wp-content/uploads/2026/05/Frame-1000005712.png',
    name: 'SIMATS Engineering',
    location: 'Chennai- 602105, Tamilnadu',
    badge: 'Est. 1986 • 16,000+ Students',
    meta: ['NAAC A', '#1 NIRF 2024', 'Deemed University'],
  },
  {
    image: 'https://scriptens.com/wp-content/uploads/2026/05/unnamed-1.webp',
    logo: 'https://scriptens.com/wp-content/uploads/2026/05/Frame-10000057126565.png',
    name: 'Prathyusha Engineering College',
    location: 'Tiruvallur- 602001, Tamilnadu',
    badge: 'Est. 1972 • 12,000+ Students',
    meta: ['NAAC A+', '#3 NIRF 2024', 'Autonomous'],
  },
  {
    image: 'https://scriptens.com/wp-content/uploads/2026/05/carousel-2.avif',
    logo: 'https://scriptens.com/wp-content/uploads/2026/05/Frame-1000005712jnk.png',
    name: 'Vel Tech University',
    location: 'Avadi- 600062, Tamilnadu',
    badge: 'Est. 1990 • 8,000+ Students',
    meta: ['NAAC B+', '#7 NIRF 2024', 'Government'],
  },
];

export default function FredColleges() {
  const sectionRef = useRef<HTMLElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [current, setCurrent] = useState(0);

  const isMobile =
    typeof window !== 'undefined' && window.innerWidth <= 991;  
  useEffect(() => {
    const observer = new IntersectionObserver(
      
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setRevealed(true);
          observer.disconnect();
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const perView =
    typeof window !== 'undefined' && window.innerWidth <= 600 ? 1 : 2;

  const next = () => {
    if (current < colleges.length - perView) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="max-w-387 mx-auto px-10 py-15 max-[991px]:px-6 max-[700px]:px-4 max-[700px]:py-12 font-[Poppins]"
    >
      {/* TITLE */}
      <div
        className={`flex gap-12 items-start mb-12 transition-all duration-700 ${revealed
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
          } max-[991px]:flex-col max-[991px]:items-center max-[991px]:text-center max-[991px]:gap-4 max-[700px]:mb-6`}
      >
        {/* LEFT */}
        <div className="basis-1/2 w-full">
          <h2 className="text-[48px] leading-[1.2] font-semibold text-[#111] mb-4 max-[991px]:text-[32px] max-[700px]:text-[28px]">
            Top-Ranked Performing{' '}
            <span className="text-[#0D68F1]">Colleges</span>
          </h2>

          <div className="w-15 h-0.75 bg-[#0D68F1] rounded-xs max-[991px]:mx-auto" />
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex flex-col gap-2.5 pt-2 items-end max-[991px]:items-center max-[991px]:pt-0">
          <p className="text-[15px] italic font-medium text-[#666] leading-[1.8] max-[991px]:text-[14px] max-[700px]:text-[13px]">
            Discover the highest-ranked colleges in Tamil Nadu based on NIRF
            rankings. These institutions offer excellent academic programs and
            outstanding placement records.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 hover:gap-2.5 transition-all duration-300 text-[15px] font-semibold text-[#0D68F1]"
          >
            Start Exploring All Colleges

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="grid grid-cols-3 gap-6 max-[1200px]:grid-cols-2 max-[991px]:hidden">
        {colleges.map((college, i) => (
          <CollegeCard
            key={i}
            college={college}
            revealed={revealed}
            delay={i}
          />
        ))}
      </div>

      {/* SLIDER */}
      <div className="hidden max-[991px]:block overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: isMobile
              ? `translateX(calc(${current * -100}% - ${current * 16}px))`
              : `translateX(calc(${current * -50}% - ${current * 8}px))`,
          }}
        >
          {colleges.map((college, i) => (
            <div
              key={i}
              className="shrink-0 w-full min-[601px]:w-[calc(50%-8px)]"
            >
              <CollegeCard college={college} slider />
            </div>
          ))}
        </div>

        {/* NAV */}
        <div className="flex justify-end gap-2.5 mt-5">
          <button
            onClick={prev}
            className={`w-11 h-11 rounded-full border-[1.5px] border-[#ddd] bg-white flex items-center justify-center transition-all ${current === 0
              ? 'opacity-30 pointer-events-none'
              : 'hover:bg-[#f0f0f0] hover:border-[#bbb]'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            onClick={next}
            className={`w-11 h-11 rounded-full border-[1.5px] border-[#ddd] bg-white flex items-center justify-center transition-all ${current >= colleges.length - perView
              ? 'opacity-30 pointer-events-none'
              : 'hover:bg-[#f0f0f0] hover:border-[#bbb]'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function CollegeCard({
  college,
  revealed,
  delay = 0,
  slider = false,
}: {
  college: {
    image: string;
    logo: string;
    name: string;
    location: string;
    badge: string;
    meta: string[];
  };
  revealed?: boolean;
  delay?: number;
  slider?: boolean;
}) {
  return (
    <a
      href="#"
      className={`group block text-inherit no-underline transition-all duration-700 ${revealed || slider
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-6'
        }`}
      style={{
        transitionDelay: `${delay * 120}ms`,
      }}
    >
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-lg bg-[#e8e8e8] aspect-4/3 max-[600px]:aspect-square">
        <Image
          src={college.image}
          alt={college.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-[rgba(10,20,40,0.88)] via-[rgba(10,20,40,0.45)] to-transparent p-4 flex flex-col justify-between transition-opacity duration-300 ${slider ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
        >
          {/* TOP */}
          <div
            className={`transition-all duration-300 ${slider
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0'
              }`}
          >
            <button className="inline-flex items-center gap-2 px-5 py-2 text-[13px] text-white rounded-[80px] border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFC720"
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>

              {college.badge}
            </button>
          </div>

          {/* BOTTOM */}
          <div
            className={`flex items-end justify-between gap-3 transition-all duration-300 delay-100 ${slider
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0'
              }`}
          >
            <div className="flex-1 flex flex-col gap-0.75">
              <div className="flex flex-wrap items-center gap-2 text-white text-[13px] font-medium max-[991px]:text-[14px] max-[700px]:text-[15px]">
                {college.meta.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span>{item}</span>

                    {i !== college.meta.length - 1 && (
                      <span className="text-[rgba(255,255,255,0.4)]">|</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-0.75 mt-1.5">
                <span className="text-[11px] uppercase tracking-[0.06em] text-[rgba(255,255,255,0.7)] font-medium">
                  Know more about
                </span>

                <span className="text-[13px] text-[#5ba3ff] leading-[1.4] font-medium">
                  Courses & Fees, Admissions, Placements, Facilities, Reviews
                </span>
              </div>
            </div>

            {/* ARROWS */}
            <div className="flex items-center shrink-0">
              <span className="fc-chevron">›</span>
              <span className="fc-chevron">›</span>
              <span className="fc-chevron">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex items-start gap-3 pt-3.5">
        <div className="w-10 h-10 rounded-full bg-white overflow-hidden shrink-0 flex items-center justify-center">
          <Image
            src={college.logo}
            alt={college.name}
            width={40}
            height={40}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-[17px] font-semibold text-[#111] leading-[1.3]">
            {college.name}
          </span>

          <span className="text-[13px] italic font-medium text-[#2F80ED] leading-[1.3]">
            {college.location}
          </span>
        </div>
      </div>

      <style jsx>{`
        .fc-chevron {
          font-size: 28px;
          font-weight: 300;
          color: #fff;
          opacity: 0;
          animation: fcChevronChase 1.2s infinite;
          line-height: 1;
        }

        .fc-chevron:nth-child(1) {
          animation-delay: 0s;
        }

        .fc-chevron:nth-child(2) {
          animation-delay: 0.2s;
        }

        .fc-chevron:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes fcChevronChase {
          0% {
            opacity: 0.15;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </a>
  );
}
