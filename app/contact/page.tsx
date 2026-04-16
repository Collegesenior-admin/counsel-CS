"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import Header from "../components/Header";
import FAQ from "../components/FAQSection";
import Footer from "../components/Footer";
import EnquiryFormModal from "../components/EnquiryFormModal";
import { useScrollTrigger } from "../hooks/useScrollTrigger";


export default function ContactSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTriggered, hasSubmitted } = useScrollTrigger(0.7);

  useEffect(() => {
    if (isTriggered && !hasSubmitted) {
      setIsModalOpen(true);
    }
  }, [isTriggered, hasSubmitted]);

  return (
    <>
      <div className="max-w-500 mx-auto">

      </div>
      <Header />
      <section className="relative bg-gray-100 py-16 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left Side: Contact Information */}
          <div className="relative z-10">
            <span className="text-blue-600 text-sm font-medium">Home / Contact</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D6EFD] mt-4 leading-tight">
              We Are Always Ready To Help You And Answer Your Questions
            </h2>
            <p className="text-gray-500 mt-4 max-w-md">
              Got a question or just want to chat? Our team is here for you 24/7.
              Drop us a line, and let&apos;s make things happen together!
            </p>

            {/* Background Decorative Icon (Large faded blue icon) */}
            <div className="absolute top-20 left-0 -z-10 opacity-10 pointer-events-none">
              <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
              </svg>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-4">
              {/* Phone */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Phone</h3>
                <p className="text-gray-600 font-medium">+91 93456 23381</p>
                <p className="text-gray-600 font-medium">+91 93456 23381</p>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Address</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  3/476, Valayapathi Salai, JJ Nagar,<br />
                  Street, Mogappair, Chennai, Tamil<br />
                  Nadu 600037
                </p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Email</h3>
                <p className="text-gray-600 font-medium">Team@Collegesenior.In</p>
              </div>

              {/* Social Network */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Social Network</h3>
                <div className="flex space-x-4">
                  {/* Icons would go here */}
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form Card */}
          <div className="bg-[#0D6EFD] rounded-[30px] p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-8">Get In Touch</h2>

            <form className="space-y-8">
              {/* Name Input */}
              <div className="relative border-b border-blue-300 pb-2">
                <label className="block text-white font-bold sm:text-sm md:text-lg mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Your Name Here"
                  className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm"
                />
              </div>

              {/* Email Input */}
              <div className="relative border-b border-blue-300 pb-2">
                <label className="block text-white font-bold sm:text-sm md:text-lg mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Your Mail ID Here"
                  className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm"
                />
              </div>

              {/* Message Input */}
              <div className="relative border-b border-blue-300 pb-2">
                <label className="block text-white font-bold sm:text-sm md:text-lg mb-1">Message</label>
                <textarea
                  placeholder="Your Message Here"
                  rows={1}
                  className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white text-[#0D6EFD] font-bold py-4 rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                >
                  Talk to an Expert
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
      <FAQ />
      <Footer />
      <EnquiryFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        sourcePage="Contact Page"
      />
    </>
  );
};

