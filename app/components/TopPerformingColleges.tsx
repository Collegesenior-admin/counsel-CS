'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin, Mail, Globe } from 'lucide-react';

type CollegeType = {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  ownership: string;
  naac_grade: string | null;
  nirf_ranking: number | null;
  established: number;
  website: string;
  email: string;
  logo_url: string;
  image_urls: any;
  description: string;
};

interface TopPerformingCollegesProps {
  colleges: CollegeType[];
}

export default function TopPerformingColleges({ colleges }: TopPerformingCollegesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For mobile image carousel

  // Safe image extractor
  const extractImagesFromJsonb = (images: any): string[] => {
    try {
      if (!images) return [];

      if (Array.isArray(images) && images.every(item => typeof item === 'string')) {
        return images;
      }

      if (Array.isArray(images)) {
        return images.map((item: any) => {
          if (typeof item === 'string') return item;
          if (typeof item === 'object' && item !== null) {
            const key = Object.keys(item)[0];
            return item[key];
          }
          return '';
        }).filter(Boolean);
      }

      if (typeof images === 'string') {
        const parsed = JSON.parse(images);
        return extractImagesFromJsonb(parsed);
      }

      return [];
    } catch (error) {
      console.error('Error extracting images:', error);
      return [];
    }
  };

  const getMainImage = (images: string[]) => {
    return images && images.length > 0 ? images[0] : "https://via.placeholder.com/400x300";
  };

  const getThumbnailImages = (images: string[], count: number) => {
    if (!images || images.length <= 1) return [];
    return images.slice(1, count + 1);
  };

  const nextCollege = () => {
    setCurrentIndex((prev) => (prev + 1) % colleges.length);
    setCurrentImageIndex(0); // Reset image carousel when changing college
  };

  const prevCollege = () => {
    setCurrentIndex((prev) => (prev - 1 + colleges.length) % colleges.length);
    setCurrentImageIndex(0); // Reset image carousel when changing college
  };

  // Mobile image carousel functions
  const nextImage = () => {
    const currentCollege = colleges[currentIndex];
    const validImages = extractImagesFromJsonb(currentCollege.image_urls);
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }
  };

  const prevImage = () => {
    const currentCollege = colleges[currentIndex];
    const validImages = extractImagesFromJsonb(currentCollege.image_urls);
    if (validImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    }
  };

  if (!colleges || colleges.length === 0) {
    return (
      <section className="bg-gray-100 md:p-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-gray-500">No top performing colleges available at the moment.</p>
        </div>
      </section>
    );
  }

  const currentCollege = colleges[currentIndex];
  const validImages = extractImagesFromJsonb(currentCollege.image_urls);

  return (
    <section className="bg-gray-100 md:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
          <div className='md:w-2/5 text-center'>
            <p className="text-gray-400 font-semibold text-sm md:text-lg text-center sm:text-center md:text-left lg:text-left tracking-widest">
              Best Colleges in town
            </p>
            <h2 className="text-center sm:text-center md:text-left lg:text-left text-2xl md:text-4xl font-medium text-[#2D5BFF]">
              Top Performing Colleges
            </h2>
          </div>

          <div className="md:w-3/5 ml-4">
            <p className="text-gray-500 text-center sm:text-center md:text-left lg:text-left text-sm leading-relaxed">
              Discover the highest-ranked colleges in Tamil Nadu based on NIRF rankings.
              These institutions offer excellent academic programs and outstanding placement records.
            </p>
          </div>
        </div>

        {/* Main Content - Using College Listing Card Structure */}
        <div className='h-205 md:h-133 lg:h-115 my-auto'>
          <div className="sm:w-[80%] sm:mx-auto sm:my-auto md:w-full lg:w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4 mb-3 flex flex-col md:flex-row lg:flex-row gap-2 md:gap-6">
            {/* Left Side: Image Gallery Section */}
            <div className="relative mx-auto w-full md:w-75 lg:w-75 shrink-0">
              {/* Main Image Container */}
              <div className="relative h-64 min-h-[80%] flex items-center rounded-xl overflow-hidden mb-3 bg-gray-200 shadow-lg">
                {/* Desktop: Single main image */}
                <div className="hidden md:block w-full h-full">
                  <img
                    src={getMainImage(validImages)}
                    className="w-full h-full object-cover"
                    alt={currentCollege.name}
                  />
                </div>

                {/* Mobile: Image carousel */}
                <div className="md:hidden w-full h-full relative">
                  <img
                    src={validImages[currentImageIndex] || getMainImage(validImages)}
                    className="w-full h-full object-cover"
                    alt={`${currentCollege.name} - Image ${currentImageIndex + 1}`}
                  />
                  
                  {/* Mobile Image Navigation - Only show if more than 1 image */}
                  {validImages.length > 1 && (
                    <>
                      {/* Previous Image Button */}
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      
                      {/* Next Image Button */}
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
                      >
                        <ChevronRight size={16} />
                      </button>
                      
                      {/* Image Dots Indicator */}
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {validImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Image Counter */}
                      <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs z-10">
                        {currentImageIndex + 1} / {validImages.length}
                      </div>
                    </>
                  )}
                </div>

                {/* College Name Overlay */}
                {/* <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                  <h4 className="text-white font-bold text-sm leading-tight">
                    {currentCollege.name}
                  </h4>
                </div> */}
              </div>

              {/* Thumbnails - Hidden on mobile, shown on desktop */}
              <div className="hidden md:grid md:grid-cols-4 gap-2 min-h-[20%]">
                {getThumbnailImages(validImages, 3).map((imageUrl: string, i: number) => (
                  <div key={i} className="h-15 rounded-lg overflow-hidden">
                    <img src={imageUrl} className="w-full h-full object-cover opacity-80" alt={`thumb-${i}`} />
                  </div>
                ))}
                {/* Fill remaining slots with placeholder if needed */}
                {Array.from({ length: Math.max(0, 2 - getThumbnailImages(validImages, 3).length) }).map((_, i) => (
                  <div key={`placeholder-${i}`} className="h-15 rounded-lg overflow-hidden bg-gray-200">
                    <img src="https://via.placeholder.com/400x300" className="w-full h-full object-cover opacity-80" alt="placeholder" />
                  </div>
                ))}
                <div className="h-15 rounded-lg bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold">
                  +more
                </div>
              </div>
            </div>

            {/* Right Side: Content Section */}
            <div className="relative flex-1 bg-white rounded-2xl p-0 md:p-0">
              {/* Logo and Tags */}
              <div className="flex justify-between items-center gap-3 mb-2">
                <div className="relative w-10 h-10 md:w-15 md:h-15 rounded-full shadow-sm bg-gray-200 flex items-center justify-center text-[10px] md:text-xs">
                  <Image
                    src={currentCollege.logo_url || "/placeholder-logo.svg"}
                    width={60}
                    height={60}
                    alt="Logo"
                    className='rounded-full'
                  />
                </div>

                <div className="hidden sm:flex gap-2">
                  <span className="bg-[#FFF3EC] text-[#D97706] px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase">
                    {currentCollege.ownership || 'Private'}
                  </span>
                  <span className="bg-[#E8F5E9] text-[#2E7D32] px-2 md:px-3 py-1 rounded-md text-[10px] md:text-xs font-bold uppercase">
                    Multiple Programs Offered
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="flex-1 text-lg md:text-2xl font-medium text-[#0F172A] mb-1">
                {currentCollege.name}
              </h3>

              <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 md:mb-3 gap-2">
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  {currentCollege.city}
                </p>

                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold text-sm md:text-base">4.9</span>
                  <span className="text-gray-400 text-xs md:text-sm">(1k reviews)</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex gap-2 md:gap-3 mb-2 md:mb-2">
                <span className="bg-[#E8EFFF] text-[#2D5BFF] px-3 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-xs font-medium border border-[#2D5BFF]/10">
                  NAAC {currentCollege.naac_grade || 'A++'}
                </span>
                {currentCollege.nirf_ranking && (
                  <span className="bg-[#E7F9EE] text-[#059669] px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-xs font-medium border border-[#059669]/10">
                    #{currentCollege.nirf_ranking} NIRF 2024
                  </span>
                )}
              </div>

              {/* Info Grid */}
              <div className="flex flex-wrap gap-1 md:gap-3 mb-4 md:mb-3">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className='w-4 h-4 text-blue-300' />
                  <span className="text-xs md:text-sm md:font-medium">{currentCollege.city || 'Tamil Nadu'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Globe className='w-4 h-4 text-blue-300' />
                  <span className="text-xs md:text-sm md:font-medium">{currentCollege.website}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Mail className='w-4 h-4 text-blue-300' />
                  <span className="text-xs md:text-sm md:font-medium">{currentCollege.email || currentCollege.slug}</span>
                </div>
              </div>

              {/* Description */}
              <p className="max-h-15 text-gray-600 text-xs md:text-sm mb-4 md:mb-3 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {currentCollege.description || "This top-performing college offers excellent academic programs with outstanding faculty and modern infrastructure, providing students with comprehensive education and excellent placement opportunities."}
              </p>
              <hr className="mb-4 md:mb-6 opacity-50" />
              <p className="text-[11px] md:text-xs text-gray-400 mb-4 font-medium">
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
                  <Link href={`/colleges/${currentCollege.slug}`} className="flex-1 sm:flex-none">
                    <button className="w-full bg-[#4F46E5] text-white font-bold px-4 md:px-6 py-2 rounded-lg shadow-md hover:bg-[#4338CA] transition-colors text-xs md:text-sm">
                      View More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-between items-center my-4 mx-3">
          <div className="text-sm text-gray-500">
            Showing {currentIndex + 1} of {colleges.length} top colleges
          </div>
          <div className="flex gap-3">
            <button
              onClick={prevCollege}
              className="w-16 h-10 flex items-center justify-center border-2 border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
              disabled={colleges.length <= 1}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextCollege}
              className="w-16 h-10 flex items-center justify-center border-2 border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-50"
              disabled={colleges.length <= 1}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 my-4">
          {colleges.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
