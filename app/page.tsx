import Link from 'next/link'
// import { ChevronLeft } from 'lucide-react'  
import Image from 'next/image'
import type { Metadata } from 'next'
import Header from './components/Header'
import Steps from './components/Steps'
import StreamsCard from './components/StreamsCard'
import WhyChooseUs from './components/whychoose'
import FeaturesColleges from './components/FeaturesColleges'
import TopPerformingColleges from './components/TopPerformingColleges'
import CityGrid from './components/CityGrid';
import FAQSection from './components/FAQSection'
import Footer from './components/Footer'
import HomePageClient from './HomePageClient'
import { prisma } from '@/lib/prisma'
import TrustedUniversitiesSection from './components/TrustedUniversity'
import MapSection from './components/Map';

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
  // Fetch top performing colleges based on NIRF ranking
  const topColleges = await prisma.colleges.findMany({
    where: {
      nirf_ranking: {
        not: null,
        gt: 0
      }
    },
    orderBy: {
      nirf_ranking: 'asc' // Lower rank number = better ranking
    },
    take: 10, // Get top 10 colleges
    select: {
      id: true,
      name: true,
      slug: true,
      city: true,
      state: true,
      ownership: true,
      naac_grade: true,
      nirf_ranking: true,
      established: true,
      website: true,
      email: true,
      logo_url: true,
      image_urls: true,
      description: true
    }
  });

  return (
    <HomePageClient>
      <div className="min-h-screen w-full md:w-full">

        {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="max-w-387 mx-auto relative bg-[#0d68f2] text-white flex flex-col md:flex-row md:items-center overflow-hidden">
          <div className="relative md:w-1/2 p-4 pb-0 sm:p-4 sm:pb-0 md:pl-8 lg:pl-10 md:p-1">
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
              <div className="mt-6 min-[884]:mt-9 flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-6 grayscale opacity-70 max-[770px]:hidden min-[1400px]:mt-10 ">
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
              className="absolute top-55 -left-45 border md:w-120 max-[768px]:hidden" />
          </div>
          <div className="md:w-1/2 3xl:justify-end flex tablet:justify-bottom md:content-end relative md:p-0">
            <Image src="/Hero.webp"
              alt="hero image"
              width={1000}
              height={200}
              className="min-w-lg w-full h-full object-bottom-right" />
          </div>
        </section>

        {/* Marquee infinite loop */}
        <section className="w-full max-w-387 mx-auto overflow-hidden bg-[#001236] py-3">
          <div className="marquee-track flex w-max items-center">

            <div className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-white">
              <span className="mx-6">🔥 Admissions open for Fall intake! Book your free consultation today.</span>
              <span>✦</span>
              <span className="mx-6">🎓 95% Success Rate in Top 50 Universities worldwide.</span>
              <span>✦</span>
              <span className="mx-6">🌍 Guiding students from over 40+ countries.</span>
              <span>✦</span>
              <span className="mx-6">💡 Over $2M+ scholarships secured.</span>
              <span>✦</span>
              <span className="mx-6">⭐ Expert guidance from former Ivy League Admissions Officers. </span>
              <span>✦</span>
            </div>

            <div aria-hidden="true" className="flex shrink-0 items-center whitespace-nowrap text-[13px] font-medium text-white">
              <span className="mx-6">🔥 Admissions open for Fall intake! Book your free consultation today.</span>
              <span>✦</span>
              <span className="mx-6">🎓 95% Success Rate in Top 50 Universities worldwide.</span>
              <span>✦</span>
              <span className="mx-6">🌍 Guiding students from over 40+ countries.</span>
              <span>✦</span>
              <span className="mx-6">💡 Over $2M+ scholarships secured.</span>
              <span>✦</span>
              <span className="mx-6">⭐ Ivy League Admissions Officers.</span>
              <span>✦</span>
            </div>

          </div>
        </section>


        <TrustedUniversitiesSection />

        <MapSection />



        {/* Process Section */}
       
          <Steps />
    

        {/* TNEA Calculator */}
        <section className="max-w-387 mx-auto bg-white">
          <div className='max-w-7xl mx-auto px-5 py-8 grid md:grid-cols-2 gap-6 items-center'>

            {/* LEFT SIDE */}
            <div>
              <h2 className="text-[25px] lg:text-center font-medium md:text-left mb-3">
                TNEA Cutoff Calculator</h2>
              <p className="text-gray-500 text-sm lg:text-center md:text-left mb-6">
                Calculate Your TNEA Cutoff Marks And Estimate Your Rank For
                Engineering Admissions In Tamil Nadu.</p>
              <div className="space-y-5">
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 ">
                      Mathematics Score (out of 100)</label>
                    <input
                      type="number"
                      placeholder="e.g. 90"
                      id="math"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 ">
                      Physics Score (out of 100)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 90"
                      id="physics"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 ">
                      Chemistry Score (out of 100)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 90"
                      id="chemistry"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className='flex justify-center items-end'>

                    <Link href="/calculator" className='bg-[#0B1A33] text-white text-center w-full px-6 py-3.5 rounded-lg hover:opacity-90 transition'>
                      <button
                        className=""
                      >
                        Calculate Cutoff
                      </button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full">
              <div className="w-full max-w-130 mx-auto h-auto bg-[#FFD14B] text-black rounded-2xl p-4 md:p-5 shadow-xl relative overflow-hidden">
                {/* Background Image */}
                <Image
                  src="/calculator.svg"
                  alt="Calculator background"
                  fill
                  className="object-cover rounded-2xl"
                />
                {/* Content */}
                <div className="relative z-10">
                  <p className="text-lg font-semibold tracking-wide mb-1">
                    Your Projected Cutoff
                  </p>
                  <p className="text-sm mb-4">Based On 2025 Academic Parameters</p>
                  <div className='md:flex justify-evenly items-center gap-5'>
                    <h3
                      id="cutoff"
                      className="text-6xl font-bold md:mb-4 text-white line-through shrink-0"
                    >198.50</h3>
                    <p className="text-xl md:text-lg lg:text-2xl font-semibold mb-4">
                      Know Your Exact Cutoff</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-medium">College Tier</p>
                    <p className="font-medium text-white">
                      Top Government Colleges (E.G., CEG, MIT, PSG)
                    </p>
                  </div>

                  <div className='md:flex justify-between items-center bg-yellow-200/60 p-3 rounded-xl'>
                    <p className="text-sm font-medium">
                      Estimated Rank Range
                    </p>
                    <p className="text-4xl font-medium text-white line-through shrink-0">

                      3001-8000

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Stream Section */}
        <StreamsCard />

        {/* why choose college senior */}
        <WhyChooseUs />


        {/* Featured colleges */}
        {/* <FeaturesColleges /> */}

        {/* Top Performing Colleges */}
        <TopPerformingColleges />

        {/* Paper  */}
        <section className="max-w-387 mx-auto md:px-6 mb-4 md:mb-6 lg:px-8 overflow-hidden">
          <div className="relative bg-primary md:rounded-xl overflow-hidden">

            <div className="flex flex-col min-[845]:flex-row items-center justify-between px-3 pt-3 max-[845]:pt-8 md:px-8 lg:pt-0">

              {/* LEFT CONTENT */}
              <div className="max-w-full text-left">
                <h2 className="text-white font-medium sm:text-base flex items-center leading-5.5 mb-6">
                  Apply to your preferred colleges across Tamil Nadu with just one application.
                  Our trusted unified platform lets you connect to multiple institutions quickly
                  and effortlessly via a single simple form, helping you confidently secure
                  the right college.
                </h2>

                <button className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#0057ff] transition hover:scale-105">
                  Request for a Callback
                </button>
              </div>

              {/* RIGHT ILLUSTRATION */}
              <div className="relative w-auto max-w-sm sm:max-w-lg flex justify-end lg:justify-end">

                {/* Glow Circle */}
                <div className="absolute w-84 h-84 sm:w-84 sm:h-84 bg-white/40 rounded-full blur-3xl"></div>

                {/* Papers Container */}
                <div className="relative w-82 h-55">

                  {/* Back Paper */}
                  <img
                    src="/paperbg.svg"
                    alt="background paper"
                    className="absolute top-0 left-[35%] min-[845]:top-3 min-[845]:left-[20%] bottom-0 w-full h-full max-[845]:scale-120 object-contain opacity-90"
                  />

                  {/* Front Paper */}
                  <img
                    src="/paper.png"
                    alt="main paper"
                    className="absolute top-0 left-[30%] min-[845]:top-1 min-[845]:left-[15%] w-full h-full max-[845]:scale-120 object-contain"
                  />

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <CityGrid /> */}


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
