import Link from 'next/link'
// import { ChevronLeft } from 'lucide-react'  
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from './components/Header'
import Steps from './components/Steps'
import StreamsCard from './components/StreamsCard'
import FeaturesColleges from './components/FeaturesColleges'
import TopPerformingColleges from './components/TopPerformingColleges'
import CityGrid from './components/CityGrid';
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import HomePageClient from './HomePageClient'

// Type definitions


export const metadata: Metadata = {
  title: 'CollegeSenior main - Expert Guidance for College Admissions in Tamil Nadu',
  description: 'Tamil Nadu\'s most trusted college application platform. Get expert guidance for TNEA admissions, cutoff calculator, and personalized counseling for engineering colleges.',
  keywords: ['college admissions', 'TNEA', 'Tamil Nadu engineering', 'college counseling', 'cutoff calculator'],
  openGraph: {
    title: 'CollegeSenior - Expert College Admission Guidance',
    description: 'Apply to multiple TN colleges with one form. Free counseling and expert guidance.',
  },
}

export default async function HomePage() {

  return (
    <HomePageClient>
    <div className="min-h-screen w-full md:w-full">

      {/* Header */}
      <Header />
      {/* Hero Section */}
      <section className="max-w-387 mx-auto relative bg-[#0d68f2] text-white flex flex-col md:flex-row md:items-center overflow-hidden">
        <div className="relative md:w-1/2 p-4 pb-0 sm:p-4 sm:pb-0 md:pl-10 md:p-1">
          <div className="relative z-10">
            <span className="text-white font-medium px-4 md:px-4  py-2 md:py-2 rounded-3xl bg-blue-500 tracking-widest text-xs sm:text-xs md:text-xs inline-block min-[1400px]:mt-4">
              Think, plan, and track all in one place </span>

            <h1 className='mt-4 md:mt-2'>
              Expert Guidance for a Smooth and Stress-Free College Admissions. </h1>
            <p className="mt-4 md:mt-2 text-base md:text-sm  max-[780px]:hidden min-[1140px]:mt-7">
              Sharpen your path to college with expert advice and tailored insights. Enjoy a hassle-free admissions process and expert career guidance, unique to College Senior. </p>
            <p className="mt-4 md:mt-0 text-base md:text-sm min-[780px]:hidden">Enhance your college journey with professional
              guidance and customized insights.</p>
            <div className="mt-3 flex bg-white  rounded-xl shadow-lg text-gray-800 min-[1140px]:my-8">
              <button className="p-3 text-gray-500 hover:text-blue-600 transition">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input type="text" placeholder="Search for colleges or courses..." className="grow p-3 outline-none placeholder-blue-600" />
            </div>
            <div className="mt-6 md:mt-10 flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 grayscale opacity-70 max-[770px]:hidden min-[1400px]:mt-10 ">
              <span className="text-sm md:text-base">Recognitions:</span>
              <div className="flex flex-wrap space-x-2 md:space-x-4 font-bold italic text-sm md:text-xl">
                <Image src="/Recognition.svg"
                  alt="Hero corner image"
                  width={620}
                  height={600}
                  className="" />
              </div>
            </div>
          </div>
          <Image src="/hero-corner.svg"
            alt="Hero corner image"
            width={600}
            height={600}
            className="absolute top-55 -left-45 border md:w-120 max-[765px]:hidden" />
        </div>
        <div className="md:w-1/2 3xl:justify-end flex tablet:justify-bottom md:content-end relative md:p-0">
          <Image src="/Hero.webp"
            alt="hero image"
            width={1000}
            height={200}
            className="min-w-lg w-full h-full object-bottom-right" />
        </div>
      </section>




      {/* CTA Section */}
      <section className="max-w-387 mx-auto relative flex flex-col w-full bg-[#ffd14b] py-3 px-6 items-center text-center ">

        <div className="relative z-10 max-w-4xl md:justify-end md:text-center">
          <span className="text-gray-600 font-bold text-sm md:text-base block">
            Start your admission journey with confidence.
          </span>
          <h2 className="text-xl md:text-[16px] lg:text-xl font-bold mb-2 tracking-widest">
            Tamil Nadu&apos;s Most Trusted Unified College Application Platform
          </h2>
        </div>

        <div className="relative md:absolute md:-top-9 md:-left-3 flex justify-center">
          <Image
            src="/map.svg"
            alt="Tamil Nadu Map"
            width={670}
            height={650}
            className="w-64 h-64 sm:w-70 sm:h-70 md:w-65 md:h-65 lg:w-70 lg:h-70"
          />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-lg md:text-lg text-gray-500 font-medium">
            Apply to multiple TN colleges with just one simple form.
          </p>
          <button data-application-button className="bg-[#0d68f2] text-white px-5 py-2.5 md:px-15 md:my-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition w-full md:w-auto">
            Start your Application
          </button>
        </div>

      </section>

      {/* Process Section */}
      <section className="max-w-387 mx-auto p-2 mt-2">


        <Steps />

      </section>

      <div className="flex flex-row md:flex-row items-center justify-center space-x-3 sm:space-x-3 md:space-y-0 md:space-x-9 mt-3">
        <span className="bg-blue-200 text-primary p-3 rounded-lg font-bold text-sm md:text-md">TNEA 2026</span>
        <span className="bg-gray-200 p-3 rounded-lg font-bold text-sm md:text-md">Admission</span>
      </div>

      {/* TNEA Calculator */}
      <section className="py-2 md:py-4 px-4 md:px-12 bg-gray-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-widest capitalize mb-2">TNEA Cutoff Calculator</h2>
        <p className="text-gray-500 mb-6 md:mb-8 text-sm font-bold md:text-base">
          Calculate your TNEA cutoff marks and estimate your <br /> rank for engineering admissions in Tamil Nadu.
        </p>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 md:p-4 justify-end ">
              <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="my-4 md:mb-0">
                  <p className="text-[#0d68f2] text-sm md:text-left font-semibold">Step 1/3</p>
                  <h3 className="text-[#0d68f2] text-sm font-semibold">Enter Your Marks</h3>
                </div>
                <Link href="/calculator" className="text-blue-600 text-sm px-4 py-2 rounded-lg hover:underline">
                  Take me to the Calculator
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 m-6 md:mb-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-4 text-sm md:text-left">Mathematics (out of 100)</label>
                  <input
                    type="number"
                    placeholder="e.g. 90"
                    className="w-full border-b-2 border-blue-600 pb-2 outline-none text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-4 text-sm md:text-left">Physics (out of 100)</label>
                  <input
                    type="number"
                    placeholder="e.g. 90"
                    className="w-full border-b-2 border-gray-200 pb-2 outline-none text-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-4 text-sm md:text-left">Chemistry (out of 100)</label>
                  <input
                    type="number"
                    placeholder="e.g. 90"
                    className="w-full border-b-2 border-gray-200 pb-2 outline-none text-gray-600"
                  />
                </div>
              </div>
              <button className="bg-blue-600 text-white font-bold py-3 m-4 sm:m-4 px-12 md:px-24 rounded-lg hover:bg-blue-700 transition text-sm md:text-base">
                Calculate Cutoff
              </button>
            </div>
            <div className="w-auto m-3 lg:w-95 p-6 md:p-8 bg-[#FFD54F] bg-linear-to-b rounded-lg flex flex-col space-y-2">
              <div>
                <h3 className="text-gray-800 font-bold text-left text-lg mb-2">Your Cutoff</h3>
                <div className="border-t border-dashed p-5 border-gray-600 pt-2">
                </div>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold text-left text-md mb-2">Estimated Rank Range</h3>
                <div className="border-t border-dashed p-5 border-gray-600 pt-2">
                </div>
              </div>
              <div>
                <h3 className="text-gray-800 font-bold text-left text-md mb-2">College Tier</h3>
                <div className="border-t border-dashed p-5 border-gray-600 pt-2">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stream Section */}
      <StreamsCard />

      {/* why choose college senior */}
      <section className="max-w-7xl mx-auto m-6 text-center">
        <p className="text-sm text-primary">The CollegeSenior’s Advantage</p>
        <h2 className="text-3xl">Why choose CollegeSenior?</h2>
        <p className="text-sm text-gray-500 m-4">
          Here’s why thousands of students and parents trust CollegeSenior for a
          stress-free admission <br />
          journey with expert guidance, personal attention, and reliable support.
        </p>

        <div className="my-7 p-4 text-left">
          <div className="relative flex gap-6 p-4 overflow-x-auto lg:flex lg:grid-cols-4 lg:overflow-x-scroll scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

            {/* Card 1 */}
            <div className="h-80 w-72 sm:w-80 md:w-80 lg:w-80 shrink-0 sm:shrink-0 md:shrink-0 lg:shrink-0 rounded-lg shadow-md bg-gray-50">
              <svg className="w-10 h-10 text-gray-500 m-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="p-5 text-gray-500 m-1 border-b border-gray-400 text-sm">
                Our guidance is completely free for students and parents.
                You get honest, unbiased advice with no charges or pressure—
                just the help you need to make the right choice.
              </p>
              <p className="text-primary font-medium text-2xl p-5">
                Free Counseling, Always
              </p>
            </div>

            {/* Card 2 */}
            <div className="h-80 w-72 mt-16 sm:w-80 shrink-0 sm:shrink-0 md:shrink-0 lg:shrink-0 rounded-lg shadow-md bg-gray-50 lg:mt-16">
              <svg className="w-10 h-10 text-gray-500 m-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="p-5 text-gray-500 m-1 border-b border-gray-400 text-sm">
                Our guidance is completely free for students and parents.
                You get honest, unbiased advice with no charges or pressure—
                just the help you need to make the right choice.
              </p>
              <p className="text-primary font-medium text-2xl p-5">
                Free Counseling, Always
              </p>
            </div>

            {/* Card 3 */}
            <div className="h-80 w-72 sm:w-80 shrink-0 sm:shrink-0 md:shrink-0 lg:shrink-0 rounded-lg shadow-md bg-gray-50">
              <svg className="w-10 h-10 text-gray-500 m-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="p-5 text-gray-500 m-1 border-b border-gray-400 text-sm">
                Our guidance is completely free for students and parents.
                You get honest, unbiased advice with no charges or pressure—
                just the help you need to make the right choice.
              </p>
              <p className="text-primary font-medium text-2xl p-5">
                Free Counseling, Always
              </p>
            </div>

            {/* Card 4 */}
            <div className="h-80 w-72 mt-16 sm:w-80 shrink-0 sm:shrink-0 md:shrink-0 lg:shrink-0 rounded-lg shadow-md bg-gray-50 lg:mt-16">
              <svg className="w-10 h-10 text-gray-500 m-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="p-5 text-gray-500 m-1 border-b border-gray-400 text-sm">
                Our guidance is completely free for students and parents.
                You get honest, unbiased advice with no charges or pressure—
                just the help you need to make the right choice.
              </p>
              <p className="text-primary font-medium text-2xl p-5">
                Free Counseling, Always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured colleges */}
      <FeaturesColleges />

      {/* Top Performing Colleges */}
      <TopPerformingColleges />

      <CityGrid />


      {/* Frequently Asked Questions */}
      <FAQSection />

      {/* Contact Form */}
      {/* Footer */}
      <Footer />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "CollegeSenior",
            "description": "Tamil Nadu's most trusted college application platform providing expert guidance for TNEA admissions and college counseling.",
            "url": "https://collegesenior.com",
            "serviceType": "College Admission Counseling",
            "areaServed": "Tamil Nadu, India",
            "offers": {
              "@type": "Service",
              "name": "College Admission Guidance",
              "description": "Expert counseling for engineering college admissions in Tamil Nadu"
            }
          })
        }}
      />
    </div>
    </HomePageClient>
  )
}
