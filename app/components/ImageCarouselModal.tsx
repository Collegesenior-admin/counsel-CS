'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';


interface ImageCarouselModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: any;
  collegeName: string;
  initialIndex?: number;
}

export default function ImageCarouselModal({
  isOpen,
  onClose,
  images,
  collegeName,
  initialIndex = 0
}: ImageCarouselModalProps) {

  // Helper to safely extract image URLs from JSON or array
const extractImagesFromJsonb = (images: any): string[] => {
  try {
    if (!images) return [];
    
    // If it's already an array of strings
    if (Array.isArray(images) && images.every(item => typeof item === 'string')) {
      return images;
    }
    
    // If it's an array of objects like [{"image1":"url"},{"image2":"url"}]
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
    
    // If it's a string, try to parse it
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

  const imageUrls = (extractImagesFromJsonb(images) || []).filter(
    (url: string) => url && url.trim() !== ""
  );

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    if (!imageUrls.length) return;
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    if (!imageUrls.length) return;
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, imageUrls.length]);

  if (!isOpen || imageUrls.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      {/* Click outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative z-50 bg-white rounded-xl shadow-xl w-[90%] max-w-2xl p-4 animate-scaleIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {collegeName}
          </h3>

          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Image Section */}
        <div className="relative flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">

          {/* Prev */}
          {imageUrls.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Image */}
          <img
            key={currentIndex}
            src={imageUrls[currentIndex]}
            alt={`${collegeName}-${currentIndex}`}
            className="max-h-87.5 w-full object-contain transition-all duration-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://via.placeholder.com/600x400?text=No+Image';
            }}
          />

          {/* Next */}
          {imageUrls.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-2 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">

          <span>
            {currentIndex + 1} / {imageUrls.length}
          </span>

          {/* Thumbnails */}
          {imageUrls.length > 1 && (
            <div className="flex gap-1 overflow-x-auto max-w-[60%]">

              {imageUrls.map((url: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-10 h-10 rounded overflow-hidden border ${
                    index === currentIndex
                      ? 'border-black'
                      : 'border-transparent opacity-60'
                  }`}
                >
                  <img
                    src={url}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
