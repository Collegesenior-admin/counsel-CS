'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface StreamCard {
  id: string;
  count: string;
  title: string;
  description: string;
  stream: string;
}

const streams: StreamCard[] = [
  { id: '01', count: '45+ courses', title: 'Engineering & Technology', description: 'Build The Future With Machines, Code, And Innovation. We Help You Choose Your Best-Fit Path.', stream: 'Engineering' },
  { id: '02', count: '78+ courses', title: 'Arts & Sciences', description: 'From Literature To Life Sciences, Explore Where Curiosity Meets Critical Thinking With Clarity.', stream: 'Science' },
  { id: '03', count: '17+ courses', title: 'Medical Courses', description: 'A Life In Scrubs Starts Here. We Help You Understand Courses That Lead To Becoming A Doctor.', stream: 'Medical' },
  { id: '04', count: '29+ courses', title: 'Allied Health Sciences', description: 'Behind Every Doctor Is A Skilled Health Expert. Discover Vital Careers Beyond MBBS.', stream: 'Science' },
  { id: '05', count: '30+ courses', title: 'Business & Management', description: 'Master the art of leadership and strategy in the corporate world.', stream: 'Management' },
  { id: '06', count: '12+ courses', title: 'Law & Legal Studies', description: 'Advocate for justice with a strong foundation in legal frameworks.', stream: 'Commerce' },
  { id: '07', count: '25+ courses', title: 'Architecture & Design', description: 'Shape the world with creativity, from buildings to digital interfaces.', stream: 'Engineering' },
  { id: '08', count: '15+ courses', title: 'Agriculture', description: 'Innovate in farming and sustainability for a greener future.', stream: 'Science' },
];

export default function StreamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative max-w-365 mx-auto h-auto p-3 md:p-8 m-5 bg-primary lg:rounded-lg text-center text-white overflow-hidden">
      
      {/* Background Decal Image */}
      <div className="z-0">
        <Image 
          src="/logoblue.svg" 
          alt="Decoration" 
          width={600} 
          height={600} 
          className="absolute -right-2 -bottom-1 z-10 rotate-0"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
       <p className="text-sm md:text-md mb-2 mt-4 tracking-wider">Top courses for better future</p>

        <h2 className="text-xl font-semibold md:text-4xl mb-2 tracking-wider">Explore Courses By Stream</h2>

        <p className="text-xs m-2 mb-5 md:m-4">
          Here’s why thousands of students and parents trust CollegeSenior for a
          stress-free admission <br />
          journey with expert guidance, personal attention, and reliable support.
        </p>

        {/* Search Bar */}
        <div className="mt-3 md:mt-10 max-w-4xl mx-auto relative">
          <div className="flex items-center bg-white rounded-lg p-2.5 md:px-5 md:py-4">
            <Search className="text-[#0B69F2] w-6 h-6 mr-2" />
            <input 
              type="text" 
              placeholder="Search for courses, colleges, or exams"
              className="w-full bg-transparent outline-none text-gray-500 placeholder:text-sm placeholder:text-[#0B69F2]/80 font-medium"
            />
          </div>
        </div>

        <div className="mt-4 md:mt-12 mb-6 text-left">
           <p className="text-md md:text-lg font-semibold ">Few Popular Streams</p>
        </div>

        {/* Carousel Container */}
        <div className="flex flex-col lg:flex-row items-end md:gap-6 m-3 md:m-7">
          
          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            className="w-full lg:w-[85%] flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {streams.map((item) => (
              <div 
                key={item.id}
                className="min-w-70 md:min-w-[320px] max-h-55 flex flex-col justify-between rounded-xl transition-all group snap-start"
              >
                <div className='flex justify-between border-b border-white/50 px-1.5 pb-1.5 mb-2.5'>

                <p className="text-sm md:text-md">{item.id}</p>
              <p className="text-sm font-medium">{item.count}</p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-md md:text-lg transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm my-3">
                    {item.description}
                  </p>
                  <Link href={`/courses?stream=${item.stream}`} className="inline-block text-xs font-medium text-yellow-300/90 tracking-wide hover:underline">
                    View More &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex lg:flex-row gap-3 w-20% md:w-20% lg:w-[18%] justify-center md:justify-end lg:justify-end p-2">
            <button 
              onClick={() => scroll('left')}
              className="flex-1 flex items-center md:min-w-20 justify-center w-18 h-11 lg:h-14 border-2 border-white rounded-sm hover:bg-white hover:text-[#0B69F2] transition-all active:scale-95"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="flex-1 flex items-center md:min-w-20 justify-center w-18 h-11 lg:h-14 border-2 border-white rounded-sm hover:bg-white hover:text-[#0B69F2] transition-all active:scale-95"
            >
              <ChevronRight size={28} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
