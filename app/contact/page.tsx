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
      <section className="relative bg-white py-8 px-6 md:px-10 overflow-hidden">
        <div className="max-w-340 mx-auto grid grid-cols-1 lg:flex gap-8 items-start">

          {/* Left Side: Contact Information */}
          <div className="relative z-10 lg:w-[60%]">
            <span className="text-blue-600 text-sm font-medium">Home / Contact</span>
            <h2 className="text-2xl md:text-2xl font-bold text-[#0D6EFD] mt-4 lg:w-150 leading-tight">
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

            <div className="mt-12 grid grid-cols-2 md:grid-cols-2 gap-y-10 gap-x-8 ">
              {/* Phone */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone</h3>
                <p className="text-gray-600 font-medium">+91 93456 23381</p>
                <p className="text-gray-600 font-medium">+91 93456 23381</p>
              </div>

              {/* Email */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email</h3>
                <p className="text-gray-600 font-medium">Team@Collegesenior.In</p>
              </div>
              {/* Address */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  3/476, Valayapathi Salai, JJ Nagar,
                  Street, Mogappair, Chennai, Tamil
                  Nadu 600037
                </p>
              </div>


              {/* Social Network */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Social Network</h3>
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
          <div className="bg-[#0D6EFD] lg:w-[40%] min-[450]:w-100 md:w-140 mx-auto rounded-[10px] p-8 md:p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-8">Get In Touch</h2>

            <form className="space-y-8">
              {/* Name Input */}
              <div className="flex gap-4 w-full mb-10">
                <div className="relative border-b border-blue-300 w-full">
                  {/* <label className="block text-white font-semibold sm:text-sm md:text-md mb-3">Name</label> */}
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm"
                  />
                </div>

                {/* Email Input */}

                <div className="relative border-b border-blue-300 w-full">
                  {/* <label className="block text-white font-semibold sm:text-sm md:text-md mb-3">Email</label> */}
                  <input
                    type="email"
                    placeholder="Eamil"
                    className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm"
                  />
                </div>
              </div>


              <div className="relative border-b border-blue-300 mb-10">
                {/* <label className="block text-white font-semibold sm:text-sm md:text-md mb-3">Name</label> */}
                <input
                  type="text"
                  placeholder="City"
                  className="w-full bg-transparent text-blue-100 placeholder-blue-200 outline-none text-sm"
                />
              </div>


              {/* Message Input */}
              <div className="relative mb-0">
                {/* <label className="block text-white font-semibold sm:text-sm md:text-md mb-3">Message</label> */}
                <textarea
                  placeholder="Message"
                  rows={1}
                  className="w-full bg-transparent border rounded-md h-30 mb-3 p-2 border-blue-300 text-blue-100 placeholder-blue-200 outline-none text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white text-[#0D6EFD] font-semibold py-2.5 rounded-md hover:bg-blue-50 transition-colors duration-300 shadow-lg"
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

