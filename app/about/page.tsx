"use client";

import { useState, useEffect } from "react";
// import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EnquiryFormModal from "../components/EnquiryFormModal";
import { useScrollTrigger } from "../hooks/useScrollTrigger";



type Stat = {
  number: string;
  labelTop: string;
  title: string;
  desc: string;
};

const stats: Stat[] = [
  {
    number: "98%",
    labelTop: "Success Rate",
    title: "Success Rate",
    desc: "Our students secure admission to their top-choice colleges",
  },
  {
    number: "04+",
    labelTop: "Years of Expertise",
    title: "Years of Expertise",
    desc: "Guiding thousands of families through the Indian and international admission landscape",
  },
  {
    number: "100+",
    labelTop: "Colleges Unlocked",
    title: "Dream Colleges Unlocked",
    desc: "From Anna University, NIT Trichy, and top private colleges to SRM, VIT, Amrita, SASTRA, and premier",
  },
  {
    number: "1.4k+",
    labelTop: "Students Served",
    title: "Parents & Students Served",
    desc: "Trusted nationwide for honest, results-driven counselling",
  },
];
export default function HomePage() {
  const [tab, setTab] = useState("students");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTriggered, hasSubmitted } = useScrollTrigger(0.7);

  useEffect(() => {
    if (isTriggered && !hasSubmitted) {
      setIsModalOpen(true);
    }
  }, [isTriggered, hasSubmitted]);

  return (
    <>
      <div className="max-w-387 mx-auto">
        <Header />

        <section className="m-3">
          <div className="relative max-w-355 mx-auto">

            <p className="text-md text-blue-700 font-medium opacity-80 tracking-wider ml-4">Home / About</p>
            <div className="flex flex-wrap justify-between gap-5 mb-10 p-3">
              <h2 className="flex-1 min-w-75 text-blue-700 leading-tight tracking-widest font-semibold text-[22px] md:text-2xl lg:text-4xl">
                Your Reliable Partner for College
                Admissions Guidance
              </h2>
              <p className="flex-1 min-w-75 max-w-150 text-justify items-end text-md text-[#777] mt-1">
                At CollegeSenior, we re your trusted partner in the college
                admissions journey. We truly understand the hopes and careful
                planning of students and parents across Tamil Nadu, and we re here
                to guide you with clarity, confidence, and complete support every
                step of the way.            </p>
            </div>
            <div className="h-80 md:h-135 bg-gray-200 rounded-2xl m-4 mb-8">
              {/* About image */}
            </div>
          </div>
        </section>

        <section className="relative h-auto min-[1345]:h-160 md:p-5 lg:p-8 m-5 bg-primary rounded-xl text-white">
          <div className="p-5 max-w-350 mx-auto">
            <h2 className="text-md md:leading-9 md:tracking-tight lg:tracking-wide font-medium text-left w-full md:text-[24px] lg:text-[30px]">Empowering students to build the future they deserve at
              CollegeSenior, we are passionate about empowering
              students and parents to take confident control of the
              college admission journey and turn dreams into reality.</h2>

            <p className="text-[10px] md:text-[12px] lg:text-[16px] text-[#f7f7f7] md:tracking-wide md:leading-5 text-justify w-full mt-6 md:mt-18">At CollegeSenior, we are passionate about empowering students and parents to take confident control of the college admission journey and
              turn dreams into reality. We are dedicated to revolutionizing the way families approach higher education in India, delivering clear,
              personalised guidance that opens doors to the very best colleges.</p>


            <div className="w-auto text-left mt-8 min-[1345]:mt-35">
              <div className="grid-row gap-6 md:grid-cols-2 p-1">
                <div className="w-full flex flex-wrap gap-16 justify-between">

                  {stats.map((stat, i) => (
                    <div key={i} className="flex-1 shrink-0 w-65 min-w-58">
                      <div className="relative inline-block mb-2 w-full">
                        <span className="flex-1 text-[48px] w-2/5 md:text-[4rem] font-medium leading-none">
                          {stat.number}
                        </span>
                        <span className="flex-1 items-start text-[8px]">
                          {stat.labelTop}
                        </span>

                      </div>
                      <p className="text-sm md:text-md leading-5tracking-[1px] text-left font-normal">
                        <span className="font-medium">{stat.title}</span> - {stat.desc}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Counselling Team Section */}
        <section className="py-6 md:py-10 px-5">
          <div className="max-w-350 mx-auto">

            <div className="text-center sm:text-left sm:flex justify-between gap-5 mb-10">
              <h2 className="flex-1 max-w-180 lg:text-3xl md:text-[22px] text-[20px] text-[#424242] font-semibold mb-4 tracking-widest">
                Get your counselling from our experienced team
              </h2>
              <p className="flex-1 max-w-165 text-justify text-sm text-[#777] mt-1 tracking-wider">
                Our counselors, with years of experience in education and admissions, have helped hundreds of students secure seats in top colleges. Personalized guidance you can trust.
              </p>
            </div>


            <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory max-w-390 w-full justify-between pb-4">
              {team.map((member, i) => (
                <div key={i} className="shrink-0 snap-start">
                  <ProfileCard {...member} />
                </div>
              ))}

              {/* CTA Card */}
              <div
                className="shrink-0 snap-start bg-linear-to-br from-blue-500 via-blue-700 to-blue-800 text-white rounded-xl border p-5 flex flex-col justify-center relative max-h-102"
                style={{
                  width: "clamp(290px, 90vw, 330px)", // responsive width
                  clipPath: `polygon(
        0% 0%,
        calc(100% - 70px) 0%,
        calc(100% - 70px) 38px,
        calc(100% - 35px) 38px,
        calc(100% - 35px) 75px,
        100% 75px,
        100% 100%,
        0% 100%
      )`,
                }}
              >
                <div className="text-[18px] font-medium my-auto mb-4 leading-snug">
                  Do you have a quick question or are you feeling overburdened?
                </div>
                <div className="text-sm opacity-90 mb-auto leading-snug tracking-wider text-[#f5f5f5]">
                  Get individualized advice from one of our knowledgeable counselors right away.
                </div>
                <button className="mt-5 bg-white text-[#1a56db] font-semibold tracking-wider text-sm py-3 rounded-lg hover:bg-gray-100 transition">
                  Talk to an Expert
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Our Offering Section */}
        < section className=" text-[#333] py-6 md:py-16 px-5" >
          <div className="max-w-360  mx-auto">

            <div className="text-center mb-10">
              <div className="text-[#1a56db] font-semibold text-md md:text-[23px] tracking-widest mb-4">
                - Our Offering -
              </div>
              <h2 className="text-[20px] md:text-[32px] font-semibold text-[#444] lg:tracking-widest lg:leading-11.25 max-w-175 mx-auto">
                Complete Support Across the Entire Admission Ecosystem
              </h2>
            </div>

            <div className="flex justify-center items-center gap-4 my-8 md:flex-row mb-12">
              <span className="font-semibold text-[#1a56db] text-lg">For</span>
              <div className="bg-[#1a56db] rounded-full p-1 flex shadow-lg">
                <button
                  onClick={() => setTab("students")}
                  className={`px-8 py-2 rounded-full font-medium transition ${tab === "students" ? "bg-white text-[#1a56db] shadow " : "text-white"
                    }`}
                >
                  Students
                </button>
                <button
                  onClick={() => setTab("colleges")}
                  className={`px-8 py-2 rounded-full font-medium transition ${tab === "colleges" ? "bg-white text-[#1a56db] shadow" : "text-white"
                    }`}
                >
                  Colleges
                </button>
              </div>
            </div>

            {tab === "students" && (
              <div className="flex gap-15 min-[1350px]:justify-center overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4">
                {students.map((item, i) => (
                  <div key={i} className="shrink-0 snap-start">
                    <OfferingCard index={i} {...item} />
                  </div>
                ))}
              </div>
            )}

            {tab === "colleges" && (
              <div className="flex gap-15 min-[1010px]:justify-center overflow-x-auto scroll-smooth snap-x snap-mandatory w-full pb-4">
                {colleges.map((item, i) => (
                  <div key={i} className="shrink-0 snap-start">
                    <OfferingCard index={i} {...item} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </section >
        <section className="bg-white py-3 md:py-16 w-full font-poppins">
          <div className="max-w-355 ml-3 md:ml-21">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-8">
              What Our Happy Students Say...
            </h2>

            {/* Cards Container */}
            <div className="flex gap-5 overflow-x-scroll pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Card 1 */}
              <div className="shrink-0 w-75 sm:w-87.5 md:w-100 min-h-95 rounded-xl p-5 md:p-8 bg-[#235EE7] text-white flex flex-col">
                <div className="mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="30"
                    viewBox="0 0 36 30"
                    fill="none"
                  >
                    <path
                      d="M0 16.425C0 8.49375 5.375 1.9125 12.875 0L15.375 4.5C10.125 6.4125 7.5 10.4625 7.5 14.0625V15H15V30H0V16.425ZM21 16.425C21 8.49375 26.375 1.9125 33.875 0L36.375 4.5C31.125 6.4125 28.5 10.4625 28.5 14.0625V15H36V30H21V16.425Z"
                      fill="#FFD700"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-sm md:text-base leading-relaxed">
                    Geetha provides a lot of information about college and courses
                    that will help me move to the next step in my career. Thank you,
                    mam, her way of speaking is very nice and friendly.
                  </p>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-1">Priya Dharshini</h4>
                    <p className="text-sm opacity-90">Student at Crescent University</p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="shrink-0 w-75 sm:w-87.5 md:w-100 min-h-95 rounded-xl p-5 md:p-8 bg-[#235EE7] text-white flex flex-col">
                <div className="mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="30"
                    viewBox="0 0 36 30"
                    fill="none"
                  >
                    <path
                      d="M0 16.425C0 8.49375 5.375 1.9125 12.875 0L15.375 4.5C10.125 6.4125 7.5 10.4625 7.5 14.0625V15H15V30H0V16.425ZM21 16.425C21 8.49375 26.375 1.9125 33.875 0L36.375 4.5C31.125 6.4125 28.5 10.4625 28.5 14.0625V15H36V30H21V16.425Z"
                      fill="#FFD700"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-sm md:text-base leading-relaxed">
                    Geetha provides a lot of information about college and courses
                    that will help me move to the next step in my career. Thank you,
                    mam, her way of speaking is very nice and friendly.
                  </p>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-1">Sharmitha Naren</h4>
                    <p className="text-sm opacity-90">Student at SRM Eshwari</p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="shrink-0 w-75 md:w-100 min-h-95 rounded-xl p-5 md:p-8 bg-[#235EE7] text-white flex flex-col">
                <div className="mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="30"
                    viewBox="0 0 36 30"
                    fill="none"
                  >
                    <path
                      d="M0 16.425C0 8.49375 5.375 1.9125 12.875 0L15.375 4.5C10.125 6.4125 7.5 10.4625 7.5 14.0625V15H15V30H0V16.425ZM21 16.425C21 8.49375 26.375 1.9125 33.875 0L36.375 4.5C31.125 6.4125 28.5 10.4625 28.5 14.0625V15H36V30H21V16.425Z"
                      fill="#FFD700"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between h-full">
                  <p className="text-sm md:text-base leading-relaxed">
                    Geetha provides a lot of information about college and courses
                    that will help me move to the next step in my career. Thank you,
                    mam, her way of speaking is very nice and friendly. I was confused
                    at that time and Tasneem Banu mam helped me.
                  </p>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-1">Aarthi</h4>
                    <p className="text-sm opacity-90">Student at SRM University</p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="shrink-0 w-75 sm:w-87.5 md:w-100 min-h-95 rounded-xl p-5 md:p-8 bg-[#235EE7] text-white flex flex-col">
                <div className="mb-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="30"
                    viewBox="0 0 36 30"
                    fill="none"
                  >
                    <path
                      d="M0 16.425C0 8.49375 5.375 1.9125 12.875 0L15.375 4.5C10.125 6.4125 7.5 10.4625 7.5 14.0625V15H15V30H0V16.425ZM21 16.425C21 8.49375 26.375 1.9125 33.875 0L36.375 4.5C31.125 6.4125 28.5 10.4625 28.5 14.0625V15H36V30H21V16.425Z"
                      fill="#FFD700"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between h-full">

                  <p className="text-sm md:text-base leading-relaxed">
                    Geetha provides a lot of information about college and courses
                    that will help me move to the next step in my career. Thank you,
                    mam, her way of speaking is very nice and friendly.
                  </p>
                  <div className="mt-6">
                    <h4 className="text-lg font-bold mb-1">Priya Dharshini</h4>
                    <p className="text-sm opacity-90">Student at Crescent University</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourcePage="About Page"
      />
    </>
  );
}

/* Profile Card */
function ProfileCard({ name, role }: { name: string; role: string; img: string }) {
  return (
    <div className="w-80 sm:w-80 md:w-82 shrink-0 flex flex-col">
      <div className="h-102 w-full rounded-xl overflow-hidden mb-4 bg-gray-300 shadow-sm">
        {/* <Image src={img} alt={name} width={400} height={500} className="w-full h-full object-cover" /> */}
      </div>
      <div className="flex justify-between">
        <div>
          <div className="text-[#1a56db] font-bold text-lg">{name}</div>
          <div className="text-sm font-semibold text-[#777]">{role}</div>
        </div>
      </div>
    </div>
  );
}

/* Offering Card */
function OfferingCard({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <div className="w-60 sm:w-65 md:w-70 shrink-0 flex flex-col">
      <div className="flex items-center mb-4">
        <span className="text-[#1a56db] font-semibold mr-2">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        <div className="flex-1 h-0.5 bg-[#aebbf0]" />
      </div>
      <h3 className="text-xl font-semibold text-center mb-3 min-h-12">
        {title}
      </h3>
      <p className="text-sm text-center text-[#777]">
        {desc}
      </p>
    </div>
  );
}

/* Data */
const team = [
  { name: "Sridhar V", role: "Founder and Mentor", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80" },
  { name: "Maya Ganesh", role: "Senior Consultant", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" },
  { name: "Nithya Ravi", role: "Lead Counsellor", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80" },
];

const students = [
  { title: "College Intelligence", desc: "Get complete insights into universities, application tracking, resources and everything you need to make informed decisions." },
  { title: "Unified Application", desc: "Streamline your college applications by submitting to multiple partner institutions through one comprehensive platform saving you time and effort." },
  { title: "Personalized Consulting", desc: "Eliminate uncertainty with tailored one-on-one counseling sessions that help you discover the perfect academic path aligned with your goals and interests." },
  { title: "Admission Success", desc: "Navigate your entire college journey with comprehensive support from university research and shortlisting through successful enrollment and fee processing." },
  // { title: "Admission Success", desc: "Navigate your entire college journey with comprehensive support from university research and shortlisting through successful enrollment and fee processing." },
];

const colleges = [
  { title: "Digital Student Acquisition", desc: "Targeted digital enrollment strategies." },
  { title: "Brand & Quality Enhancement", desc: "Improve institutional trust and reach." },
  { title: "Strategic Growth Management", desc: "Optimize operations and performance." },
];





