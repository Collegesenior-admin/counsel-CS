'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TableOfContentsProps {
  sections: string[];
  collegeName: string;
  currentCity?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, collegeName, currentCity }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const displayLimit = 5;
  const showViewMore = sections.length > displayLimit;
  const displayedSections = isExpanded ? sections : sections.slice(0, displayLimit);

  const handleClick = (section: string) => {
    // Map section names to actual IDs in the DOM
    const sectionToIdMap: Record<string, string> = {
      // Common sections
      [`Top Courses Offered at ${collegeName}`]: 'top-courses-offered-at-college',
      [`More Colleges in ${currentCity || 'City'}`]: 'more-colleges-in-city',
      
      // Overview specific
      [`About ${collegeName}`]: 'about-college',
      
      // Admission specific
      [`${collegeName} Admission Overview`]: 'admission-overview',
      'Step-by-Step Admission Process 2026': 'step-by-step-admission-process-2026',
      'Admission FAQs': 'admission-faqs',
      
      // Placements specific
      [`${collegeName} Placement Details`]: 'placement-details',
      'Placement Statistics': 'placement-statistics',
      'Top Recruiters': 'top-recruiters',
      'Placement Process': 'placement-process',
      'Placement FAQs': 'placement-faqs',
      
      // Cutoffs specific
      [`${collegeName} Cutoff Trends`]: 'cutoff-trends',
      'Cutoff Details': 'cutoff-details',
      'Cutoff FAQs': 'cutoff-faqs',
      
      // Scholarship specific
      [`${collegeName} Scholarship Details`]: 'scholarship-details',
      'Scholarship FAQs': 'scholarship-faqs',
      
      // Ranking specific
      [`${collegeName} Ranking Details`]: 'ranking-details',
      
      // Campus specific
      [`${collegeName} Campus Life`]: 'campus-life',
      'Campus Facilities': 'campus-facilities',
      'Campus FAQs': 'campus-faqs',
      
      // News specific
      [`${collegeName} Latest News & Updates`]: 'latest-news-updates'
    };
    
    // Get the actual ID from the map, or fall back to generated ID
    const actualId = sectionToIdMap[section] || section.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '');
    
    const element = document.getElementById(actualId);
    if (element) {
      const headerHeight = 80; // Header height
      const navHeight = 60; // Sticky nav height
      const padding = 20; // Extra padding
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - headerHeight - navHeight - padding;
      
      window.scrollTo({ 
        top: Math.max(0, targetPosition), 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {displayedSections.map((section, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(section)}
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline transition-colors flex items-start gap-2 text-left w-full"
            >
              <span className="text-blue-600 mt-1">•</span>
              <span>{section}</span>
            </button>
          </li>
        ))}
      </ul>
      {showViewMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              <span>Collapse</span>
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              <span>View More ({sections.length - displayLimit})</span>
            </>
          )}
        </button>
      )}
    </section>
  );
};

export default TableOfContents;
