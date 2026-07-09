'use client';
import { useState, useEffect } from 'react';
import { ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer'

interface ResultData {
  cutoff: number;
  rank: string;
  tier: string;
}

// College Banner Images (Replace with your actual images)
const banners = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207767f024d?w=1200&h=400&fit=crop",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop",
];

export default function TNEACalculator() {
  const [step, setStep] = useState(1);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [marks, setMarks] = useState({ maths: '', physics: '', chemistry: '' });
  const [student, setStudent] = useState({ name: '', phone: '', email: '' });
  const [preferences, setPreferences] = useState({ branch: '', location: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [result, setResult] = useState<ResultData>({
    cutoff: 190,
    rank: '3001-8000',
    tier: 'Top Government Colleges (e.g., CEG, MIT, PSG)',
  });

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  const handleMarks = (field: string, value: string) => {
    setMarks((prev) => ({ ...prev, [field]: value }));
  };

  const handleStudent = (field: string, value: string) => {
    setStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferences = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (
      marks.maths.trim() === '' ||
      marks.physics.trim() === '' ||
      marks.chemistry.trim() === ''
    ) {
      alert('Please enter all required marks');
      return;
    }

    setStep(2);
  };

  const calculateCutoff = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!student.name.trim()) {
      alert("Please Enter Student Name");
      return;
    }

    if (!/^\d{10}$/.test(student.phone)) {
      alert("Please Enter valid 10 digit Phone Number");
      return;
    }

    if (!emailRegex.test(student.email)) {
      alert("Please Enter valid email");
      return;
    }
    const maths = Number(marks.maths);
    const physics = Number(marks.physics);
    const chemistry = Number(marks.chemistry);

    if (marks.maths === '' || marks.physics === '' || marks.chemistry === '') {
      alert('Please Enter all Marks');
      return;
    }

    const cutoff = maths + physics / 2 + chemistry / 2;

    let rank = '30000+';
    let tier = 'Private Colleges';

    if (cutoff >= 190) {
      rank = '1-5000';
      tier = 'Top Government Colleges (e.g., CEG, MIT, PSG)';
    } else if (cutoff >= 175) {
      rank = '5001-15000';
      tier = 'Good Engineering Colleges';
    } else if (cutoff >= 160) {
      rank = '15001-30000';
      tier = 'Average Engineering Colleges';
    }

    const calculatedResult = {
      cutoff: Number(cutoff.toFixed(2)),
      rank,
      tier,
    };

    setResult(calculatedResult);

    // Send email with calculator results
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: student.name,
          phone: student.phone,
          email: student.email,
          marks,
          result: calculatedResult,
          preferences
        })
      });

      if (response.ok) {
        alert('Calculator results sent successfully! Check your email for detailed analysis.');
      } else {
        alert('Results calculated but email sending failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Results calculated but email sending failed. Please contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <Header />

      <div className="max-w-350 mx-auto p-4 md:px-6">

        {/* College Banners */}
        {/* ==================== COLLEGE BANNERS CAROUSEL ==================== */}
        <div className="relative bg-white py-8">
          <div className="relative h-60 rounded-2xl overflow-hidden shadow-md">
            {/* Banner Image */}
            <img
              src={banners[currentBanner]}
              alt={`College Banner ${currentBanner + 1}`}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gray-200" />

            {/* Navigation Arrows */}
            <button
              onClick={prevBanner}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToBanner(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentBanner === index ? 'bg-white scale-125' : 'bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="py-10">
          <h2 className="text-[28px] md:text-[55px] font-semibold text-[#1f2d5a]">TNEA Cutoff Calculator</h2>
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Left Form Section */}
            <div className="lg:col-span-8">

              {/* Header Title & Buttons */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between md:gap-6 mt-2 mb-6">
                <div className="w-full md:w-3/5">
                  <p className=" text-gray-400 font-medium text-md tracking-wider italic">
                    Calculate Your TNEA Cutoff Marks And Estimate Your Rank For Engineering Admissions In Tamil Nadu.
                  </p>
                </div>

                <div className="flex gap-3 mt-6 lg:mt-0 lg:w-2/5">
                  <button className="bg-blue-50 text-primary px-8 py-2 rounded-xl font-semibold">TNEA 2026</button>
                  <button className="border border-gray-300 px-8 py-2 rounded-xl font-semibold text-gray-400">Admissions</button>
                </div>
              </div>

              {/* ==================== STEP 1 ==================== */}
              {step === 1 && (
                <div className="bg-white border border-gray-100 rounded-lg p-4 md:p-6 shadow-lg">
                  <div className="mb-8">
                    <p className="text-blue-600 font-bold">Step 1/2</p>
                    <h2 className="text-blue-600 font-bold">Enter Your Marks</h2>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    <InputField label="Mathematics (out of 100)" placeholder="e.g. 90" value={marks.maths} onChange={(v) => handleMarks('maths', v)} type="number" />
                    <InputField label="Physics (out of 100)" placeholder="e.g. 90" value={marks.physics} onChange={(v) => handleMarks('physics', v)} type="number" />
                    <InputField label="Chemistry (out of 100)" placeholder="e.g. 90" value={marks.chemistry} onChange={(v) => handleMarks('chemistry', v)} type="number" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <SelectField label="Which branch do you want most?" placeholder="e.g. cse → ai & ds → ece → mech" value={preferences.branch} onChange={(v) => handlePreferences('branch', v)} />
                    <SelectField label="Any preferred district/location? (optional)" placeholder="e.g. chennai, kanchipuram, cuddalore,..." value={preferences.location} onChange={(v) => handlePreferences('location', v)} />
                  </div>

                  <div className="flex justify-center md:justify-end mt-10">
                    <button
                      onClick={validateStep1}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-30 py-2 rounded-lg text-lg"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* ==================== STEP 2 ==================== */}
              {step === 2 && (
                <div className="bg-white border border-gray-100 rounded-lg p-2 md:p-6 shadow-lg">
                  <div className="mb-8">
                    <p className="text-blue-600 font-bold">Step 2/2</p>
                    <h2 className="text-blue-600 font-bold">Enter Your Information</h2>
                    <p className="font-semibold text-gray-600 mt-3">
                      To get the Accurate Results just enter your name and phone number, this helps to understand better and deliver better results
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <InputField label='' placeholder="Enter Student Name" value={student.name} onChange={(v) => handleStudent('name', v)} type="text" />
                    <div className='w-full flex items-center gap-1.5 md:gap-3'>
                      <span className='text-primary'>+91</span>
                      <div className='flex-1 w-full'>
                        <InputField label="" placeholder="Parent/Student Contact Number" value={student.phone} onChange={(v) => handleStudent('phone', v)} type="tel" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <InputField label="" placeholder="Student/Parent Email" value={student.email} onChange={(v) => handleStudent('email', v)} type="text" />
                  </div>

                  <div className="flex justify-center md:justify-end mt-10 gap-4 mb-5">
                    <button
                      onClick={() => setStep(1)}
                      className="border border-gray-300 text-gray-700 font-semibold px-4 py-1.5 md:px-25 md:py-2 rounded-lg text-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={calculateCutoff}
                      disabled={isSubmitting}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-4 py-1.5 md:px-20 md:py-2 rounded-lg text-lg flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        'Calculate Cutoff'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Results Sidebar */}
            <div className="lg:col-span-4">
              <div className="bg-[#1565f7] text-white rounded-xl p-6 mt-8 md:mt-20 sticky top-25">
                <h3 className="text-xl font-bold mb-3">Your Results</h3>
                <p className="opacity-90 text-xs leading-relaxed mb-6">
                  This is an estimated prediction based on previous year data. Actual ranks may vary based on the number of applicants and difficulty level of the exam.
                </p>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Your Cutoff</p>
                  <p className="text-4xl tracking-wider font-bold border-b border-blue-400 pb-2">{result.cutoff}/200</p>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Estimated Rank Range</p>
                  <p className="text-4xl tracking-wider font-semibold border-b border-blue-400 pb-2">{result.rank}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold mb-2">College Tier</p>
                  <p className="text-md font-semibold border-b border-blue-400 pb-2">{result.tier}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Colleges Section */}
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-4">Search Colleges And Counseling Codes</h3>
            <div className="flex items-center px-4 rounded-lg max-w-md mb-6 border border-gray-300">
              <Search className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="search code or college name"
                className="w-full py-3 focus:outline-none"
              />
            </div>

            <div className="bg-white rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400 bg-gray-50">
                    <th className="text-left py-4 px-3 font-semibold">College Code</th>
                    <th className="text-left py-4 px-3 font-semibold">College Name</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className='border-b border-gray-400'>
                    <td className="px-3 py-3">1013</td>
                    <td className="px-3 py-3">University College Of Engineering Villupuram - Villupuram (Dist)</td>
                  </tr>
                  <tr className='border-b border-gray-400'>
                    <td className="px-3 py-3">1026</td>
                    <td className="px-3 py-3">University College Of Engineering - Kanchipuram</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/* Reusable Components */
function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full border-b-2 border-blue-300 pb-3 outline-none
          focus:border-blue-600 text-lg
          [appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
        "
      />
    </div>
  );
}

function SelectField({ label, placeholder, value, onChange }: { label: string; placeholder: string; value?: string; onChange?: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full border-b-2 border-blue-300 pb-3 outline-none focus:border-blue-600 text-lg"
        />
        <ChevronDown className="absolute right-2 top-4 text-gray-400" size={20} />
      </div>
    </div>
  );
}
