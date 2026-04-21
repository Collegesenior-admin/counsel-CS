'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  { name: 'Apply Online' },
  { name: 'Personal Counseling' },
  { name: 'Shortlisting & Applications' },
  { name: 'Admission Completion' },
];

export default function StepWidget() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-315 mx-auto p-3 lg:py-5 lg:px-5 text-center">
      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-lg md:text-2xl lg:text-2xl font-bold text-gray-800 mb-2">
          Choosing The Right College Can Be Confusing
        </h2>
        <p className="text-gray-500 text-sm md:text-lg">
          We&apos;re here to guide you at every step of your college journey.
        </p>
      </div>

      {/* Steps Container */}
      <div className="relative">
        {/* Mobile Central Line (Only visible on small screens) */}
        <div className="absolute left-1/2 top-10 bottom-10 w-0 border-l-2 border-dotted border-blue-300 opacity-80 transform -translate-x-1/2 md:hidden sm:hidden z-10" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-6 lg:gap-8 relative">
          {steps.map((step, index) => {
            const isActive = index <= activeStep;

            return (
              <div
                key={index}
                className={`relative flex items-center w-full z-30
                  /* Mobile ZigZag logic */
                  ${index % 2 === 0 ? 'justify-start' : 'justify-end'} 
                  sm:justify-center`}
              >
                {/* Step Card */}
                <div
                  className={`
                    relative z-10 flex items-center gap-3 p-2 py-3 md:px-5 md:py-4 rounded-lg border transition-all duration-500 w-[86%] sm:w-full md:w-90
                    ${isActive
                      ? 'bg-blue-100 border-blue-200'
                      : 'bg-white border-blue-100 opacity-90'}
                  `}
                >
                  <CheckCircle2
                    size={24}
                    className={`transition-colors duration-500 ${isActive ? 'text-[#0d6efd]' : 'text-blue-300'}`}
                  />
                  <span className={`text-md font-bold transition-colors duration-500 ${isActive ? 'text-[#0d6efd]' : 'text-blue-300'}`}>
                    {step.name}
                  </span>
                </div>

                {/* Desktop/Tablet Horizontal Connectors */}
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-8 top-1/2 w-8 border-t-2 border-dotted border-blue-300 transform -translate-y-1/2" />
                )}

                {/* --- TABLET CONNECTORS (2x2 Grid) --- */}
                {/* Horizontal line between 1->2 and 3->4 */}
                {(index === 0 || index === 2) && (
                  <div className="hidden sm:block lg:hidden absolute -right-20 top-1/2 w-35 border-t-2 border-dotted border-blue-300 transform -translate-y-1/2" />
                )}

                {/* Vertical line between Row 1 and Row 2 (Card 2) */}
                {index === 1 && (
                  <div className="hidden sm:block lg:hidden absolute right-[50%] translate-x-4 
    -bottom-8 h-8 border-r-2 border-dotted border-blue-300"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
