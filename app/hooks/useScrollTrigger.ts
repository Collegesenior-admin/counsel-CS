'use client';
import { useState, useEffect } from 'react';

// Global state to track if enquiry form has been submitted
let hasSubmittedEnquiry = false;

// Function to mark enquiry as submitted
export const markEnquirySubmitted = () => {
  hasSubmittedEnquiry = true;
  // Store in sessionStorage to persist across page navigations
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('enquirySubmitted', 'true');
  }
};

// Function to check if enquiry was submitted
export const hasEnquiryBeenSubmitted = () => {
  if (typeof window !== 'undefined') {
    const sessionSubmitted = sessionStorage.getItem('enquirySubmitted') === 'true';
    return hasSubmittedEnquiry || sessionSubmitted;
  }
  return hasSubmittedEnquiry;
};

// Function to reset enquiry status (for testing or manual reset)
export const resetEnquiryStatus = () => {
  hasSubmittedEnquiry = false;
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('enquirySubmitted');
  }
};

export function useScrollTrigger(threshold: number = 0.7) {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    // Don't trigger if enquiry has already been submitted
    if (hasEnquiryBeenSubmitted()) {
      return;
    }

    const handleScroll = () => {
      // Check again on each scroll in case it was submitted in another tab/component
      if (hasEnquiryBeenSubmitted()) {
        return;
      }

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollTop / documentHeight;

      if (scrollPercentage >= threshold && !isTriggered) {
        setIsTriggered(true);
      }
    };

    // Check session storage on mount
    if (typeof window !== 'undefined') {
      const sessionSubmitted = sessionStorage.getItem('enquirySubmitted') === 'true';
      if (sessionSubmitted) {
        hasSubmittedEnquiry = true;
        return;
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, isTriggered]);

  return { isTriggered, hasSubmitted: hasEnquiryBeenSubmitted() };
}
