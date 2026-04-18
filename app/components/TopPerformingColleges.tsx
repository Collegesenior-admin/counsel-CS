'use client';

import React from 'react';

export default function TopPerformingColleges() {
  return (
    <section className="bg-gray-100 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
          <div>
            <p className="text-gray-400 font-semibold text-sm md:text-lg text-center sm:text-center md:text-left lg:text-left tracking-widest">
              Best Colleges in town
            </p>
            <h2 className="text-center sm:text-center md:text-left lg:text-left text-2xl md:text-4xl font-medium text-[#2D5BFF]">
              Top Performing Colleges
            </h2>
          </div>

          <div className="md:w-3/5">
            <p className="text-gray-500 text-center sm:text-center md:text-left lg:text-left text-sm leading-relaxed">
              Our counselors, with years of experience in education and admissions,
              have helped hundreds of students secure seats in top colleges.
              Personalized guidance you can trust.
            </p>
          </div>
        </div>

        {/* Main Content Wrapper - Changed to flex-col-reverse for mobile */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 sm:bg-white bg-white md:bg-white lg:bg-transparent rounded-2xl p-4 md:p-4">

          {/* Main Card (Content) */}
          <div className="flex-1 bg-white rounded-2xl p-3 md:p-8 shadow-sm border border-gray-100">
            {/* Logo and Tags - Hidden tags on very small mobile to match your HTML version */}
            <div className="flex justify-between items-center gap-3 mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border shadow-sm bg-gray-200 flex items-center justify-center text-[10px] md:text-xs">
                Logo
              </div>

              <div className="hidden sm:flex gap-2">
                <span className="bg-[#FFF3EC] text-[#D97706] px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase">
                  Deemed To Be A University
                </span>
                <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase">
                  Multiple Programs Offered
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-3xl font-bold text-[#0F172A] mb-1">
              Sri Muthukumaran Institute of Technology
            </h3>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-2">
              <p className="text-gray-500 font-medium text-sm md:text-base">
                Maduravoyal, Chennai
              </p>

              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-bold text-sm md:text-base">4.9</span>
                <span className="text-gray-400 text-xs md:text-sm">(1k reviews)</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
              <span className="bg-[#E8EFFF] text-[#2D5BFF] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold border border-[#2D5BFF]/10">
                NAAC A++
              </span>
              <span className="bg-[#E7F9EE] text-[#059669] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-bold border border-[#059669]/10">
                #1 NIRF 2023
              </span>
            </div>

            {/* Info Grid */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 text-[#2D5BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                <span className="text-xs md:text-sm font-medium">4 years</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 text-[#2D5BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 13L2 9l4-6z" /></svg>
                <span className="text-xs md:text-sm font-medium">6.5 L (Avg)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4 text-[#2D5BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                <span className="text-xs md:text-sm font-medium">8 LPA (Avg Salary)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
              An MBA in Marketing is a postgraduate degree focusing on marketing strategies, brand management, and
              consumer behavior, equipping students with skills for roles like Brand Manager, Sales Manager, or Market
              Research Analyst...
              <span className="text-[#2D5BFF] font-bold cursor-pointer">
                Read more
              </span>
            </p>
            <hr className="mb-4 md:mb-6 opacity-50" />
            <p className="text-[10px] md:text-xs text-gray-400 mb-4 font-medium">
              Know more about{' '}
              <span className="text-[#2D5BFF] cursor-pointer">
                Courses & Fees, Admissions, Placements, Facilities, Reviews
              </span>
            </p>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-bold text-[#2D5BFF] mb-2 uppercase">Top Courses</p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-red-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">+2</div>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none border-2 border-[#2D5BFF] text-[#2D5BFF] font-bold px-4 md:px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors text-xs md:text-sm">
                  Apply now
                </button>
                <button className="flex-1 sm:flex-none bg-[#4F46E5] text-white font-bold px-4 md:px-6 py-2 rounded-lg shadow-md hover:bg-[#4338CA] transition-colors text-xs md:text-sm">
                  View More
                </button>
              </div>
            </div>
          </div>

          {/* Right Gallery Section (Appears TOP on mobile due to flex-col-reverse) */}
          <div className="w-full lg:w-96 flex flex-col gap-4">
            <div className="relative h-70 md:h-100 lg:h-100 rounded-2xl overflow-hidden shadow-lg group">
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                Campus Image
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                <h4 className="text-white font-bold text-center text-sm md:text-base">
                  Sri Muthukumaran Institute of Technology
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-14 md:h-20 bg-gray-200 rounded-lg cursor-pointer hover:border-blue-500 border-2 border-transparent transition-all flex items-center justify-center text-[10px] text-gray-500">
                  Img {i}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-end gap-3 my-3 mr-3">
          <button className="w-18 h-10 flex items-center justify-center border-2 border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6" /></svg>
          </button>
          <button className="w-18 h-10 flex items-center justify-center border-2 border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
