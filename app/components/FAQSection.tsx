'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'How Do I Know Which Course Or College Is Right For Me?',
      answer:
        'We start by understanding your interests, strengths, and future goals. Then we recommend the best-fit courses and colleges just for you.',
    },
    {
      question: 'What is the TNEA counseling process?',
      answer:
        'TNEA counseling involves document verification, choice filling, seat allotment, and admission confirmation based on your rank and preferences.',
    },
    {
      question: 'What is the TNEA counseling process?',
      answer:
        'TNEA counseling involves document verification, choice filling, seat allotment, and admission confirmation based on your rank and preferences.',
    },
    {
      question: 'What is the TNEA counseling process?',
      answer:
        'TNEA counseling involves document verification, choice filling, seat allotment, and admission confirmation based on your rank and preferences.',
    },

    {
      question: 'How can I calculate my TNEA cutoff marks?',
      answer:
        'Use our TNEA cutoff calculator by entering your Physics, Chemistry, and Mathematics marks to get your normalized cutoff score.',
    },
  ];

  return (
    <section className="bg-gray-100 p-5 md:p-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Side */}
        <div className="lg:w-1/2">
          <p className="text-gray-500 text-md md:text-lg mb-2">
            Some of the questions answered
          </p>

          <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#1A2B49] mb-3 md:mb-8">
            Frequently Asked Questions
          </h2>

          {/* Image */}
          <div className="h-96 rounded-2xl overflow-hidden shadow-md">
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              Student Counseling Image
            </div>
          </div>

          <p className="mt-8 text-gray-500 font-medium leading-relaxed text-md md:text-lg tracking-tight">
            Each student is initially examined, and they are then paired
            with mentors in their specific fields of interest. These
            mentors are knowledgeable and experienced in their
            respective industries.
          </p>
        </div>

        {/* Right Side (FAQs) */}
        <div className="lg:w-1/2 space-y-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white p-2 rounded-xl cursor-pointer"
                onClick={() =>
                  setActiveIndex(isActive ? -1 : index)
                }
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-[#1A2B49] font-medium text-md md:text-lg pr-4">
                    {faq.question}
                  </h3>

                  <div
                    className={`bg-white w-10 h-8 rounded-md flex items-center justify-center shadow-sm text-[#2D5BFF]
                      transition-transform duration-300
                      ${isActive ? 'rotate-180' : ''}
                    `}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300
                    ${isActive ? 'max-h-40 pt-4' : 'max-h-0 pt-0'}
                  `}
                >
                  <p className="text-sm md:text-md text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA */}
          <div className="bg-[#2D5BFF] rounded-xl p-3 md:p-6 text-left text-white mt-4 mb-4 md:mb-0 lg:mb-0 sm:mb-0">
            <h2 className="text-lg md:text-3xl mb-1">Still have questions?</h2>
            <p className="text-blue-100 mb-3 text-sm md:text-md">
              We start by understanding your interests, strengths, and future goals. Then we
              recommend the best-fit courses and colleges just for you.
            </p>

            <div className="text-right">
              <button className="bg-[#FFD25D] text-black font-medium text-sm md:text-md px-6 py-2 md:py-3 md:px-10 rounded-lg hover:bg-[#ffcb47] transition">
                Request for a Callback
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
