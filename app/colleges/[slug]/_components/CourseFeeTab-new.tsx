import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useRouter } from 'next/navigation';
import CourseDetailView from './CourseDetailView-redesigned';

interface Course {
  id: number;
  name: string;
  duration: string;
  course_type?: string | null;
  avg_fees?: string | null;
  stream?: string;
  level?: string;
  description?: string;
  avg_salary?: string;
}

interface CollegeCourseData {
  overview?: string;
  highlights?: string[];
  specializations?: string[];
  admission_process?: Array<{ step: number; title: string; description: string }>;
  eligibility_details?: string;
  selection_criteria?: string;
  fee_structure?: {
    year_1?: string;
    year_2?: string;
    year_3?: string;
    year_4?: string;
    total?: string;
  };
  scholarship_info?: string;
  career_prospects?: {
    job_roles?: string[];
    salary_range?: string;
    top_sectors?: string[];
  };
  skills_gained?: string[];
  infrastructure?: string;
  exam_pattern?: string;
  projects_internships?: string;
  faqs?: Array<{ q: string; a: string }>;
}

interface CourseOffering {
  id: number;
  course: Course;
  eligibility?: string | null;
  total_fees?: string | null;
  collegecourse_data?: CollegeCourseData | null;
}

interface CourseFeeTabProps {
  courseOfferings: CourseOffering[];
  collegeName: string;
  coursePara?: string;
  highlightedCourseId?: number | null;
  faqs?: Array<{ category: string; questions: Array<{ q: string; a: string }> }>;
}

const CourseFeeTab: React.FC<CourseFeeTabProps> = ({
  courseOfferings,
  collegeName,
  coursePara,
  highlightedCourseId,
  faqs
}) => {
  const router = useRouter();
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedDegree, setSelectedDegree] = useState<string>('All');

  const selectedCourse = highlightedCourseId
    ? courseOfferings.find(offering => offering.course.id === highlightedCourseId)
    : null;

  if (selectedCourse) {
    const otherCourses = courseOfferings.filter(offering => offering.course.id !== highlightedCourseId);

    return (
      <CourseDetailView
        selectedCourse={selectedCourse}
        collegeName={collegeName}
        otherCourses={otherCourses}
      />
    );
  }

  const streams = ['All', ...Array.from(new Set(courseOfferings.map(c => c.course.stream).filter(Boolean)))];
  const degrees = ['All', ...Array.from(new Set(courseOfferings.map(c => c.course.level).filter(Boolean)))];

  const filteredCourses = courseOfferings.filter(offering => {
    if (selectedStream !== 'All' && offering.course.stream !== selectedStream) return false;
    if (selectedDegree !== 'All' && offering.course.level !== selectedDegree) return false;
    return true;
  });

  const courseFAQs = faqs?.find(f => f.category.toLowerCase().includes('course'));

  return (
    <div className="space-y-4">
      {/* Table of Contents */}
      <div className="bg-white p-3 lg:p-6 rounded-xl">
        <h3 className="font-bold lg:text-lg mb-3">Table of Contents</h3>
        <ul className="space-y-2 text-sm lg:text-md">
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('courses-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">{collegeName} Courses & Fees Overview</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('courses-table')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">{collegeName} Courses Table</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('fee-structure')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">{collegeName} Fee Structure Overview</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('all-courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">All Courses Offered in {collegeName}</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('course-faqs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">Courses And Fees FAQs</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('popular-courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">Top Courses Offered at {collegeName}</button></li>
          <li className='flex'><span className="text-blue-600 mr-3">•</span> <button onClick={() => document.getElementById('similar-colleges')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="hover:underline hover:text-blue-600 text-left">More Similar Colleges</button></li>
        </ul>
      </div>

      {/* Overview Section */}
      <section id="courses-overview" className="bg-white p-3 lg:p-8 rounded-2xl">
        <h2 className="text-md lg:text-xl font-bold mb-4">{collegeName} Courses & Fees 2026</h2>
        <p className="text-sm lg:text-md text-gray-600 leading-relaxed">{coursePara || `${collegeName} offers a wide range of undergraduate and postgraduate courses across various streams. The college provides quality education with experienced faculty and modern infrastructure.`}</p>
      </section>

      {/* Courses Table */}
      <section id="courses-table" className="bg-white p-3 lg:p-8 rounded-2xl">
        <h3 className="text-md lg:text-lg font-bold mb-4">{collegeName} Courses Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm lg:text-md">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-300">
                <th className="text-left p-3 font-bold">Course Name</th>
                <th className="text-left p-3 font-bold">Duration</th>
                <th className="text-left p-3 font-bold">Type</th>
                <th className="text-right p-3 font-bold">Fees</th>
              </tr>
            </thead>
            <tbody>
              {courseOfferings.slice(0, 10).map((offering) => (
                <tr key={offering.id} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50">
                  <td className="p-3 font-medium text-gray-800"><p className='w-50'>{offering.course.name}</p></td>
                  <td className="p-3 text-gray-600">{offering.course.duration}</td>
                  <td className="p-3 text-gray-600 text-sm">{offering.course.course_type || 'N/A'}</td>
                  <td className="p-3 text-right font-bold text-blue-600">{offering.total_fees || 'TBA'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fee Structure Overview */}
      <section id="fee-structure" className="bg-white p-3 lg:p-8 rounded-2xl">
        <h3 className="text-md lg:text-xl font-bold mb-4">{collegeName} Fee Structure Overview</h3>
        <p className="text-sm lg:text-md text-gray-600 mb-6 leading-relaxed">
          The fee structure at {collegeName} varies based on the course and program. Below is a general overview of the annual fees.
        </p>
        <div className="overflow-x-auto rounded-xl border border-gray-300">
          <table className="w-full border-collapse text-sm lg:text-md">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-300">
                <th className="text-left px-4 py-3 text-sm font-bold">Program Level</th>
                <th className="text-left px-4 py-3 text-sm font-bold">Average Annual Fees</th>
                <th className="text-left px-4 py-3 text-sm font-bold">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">Undergraduate Programs</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">₹2L - ₹8L</td>
                <td className="px-4 py-3 text-sm text-gray-600">Per year average</td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">Postgraduate Programs</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">₹1.5L - ₹6L</td>
                <td className="px-4 py-3 text-sm text-gray-600">Per year average</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-800">Diploma Programs</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">₹50K - ₹2L</td>
                <td className="px-4 py-3 text-sm text-gray-600">Per year average</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* All Courses with Filters */}
      <section id="all-courses" className="bg-white p-3 lg:p-8 rounded-2xl">
        <h3 className="text-md lg:text-xl font-bold mb-6">All Courses at {collegeName}</h3>
        <div className="flex items-center gap-2 mb-4">
          <Filter size={18} className="text-blue-600" />
          <h4 className="font-semibold text-md">Filter Courses</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stream</label>
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="w-full p-1.5 lg:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {streams.map(stream => (
                <option key={stream} value={stream}>{stream}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Degree Level</label>
            <select
              value={selectedDegree}
              onChange={(e) => setSelectedDegree(e.target.value)}
              className="w-full p-1.5 lg:p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {degrees.map(degree => (
                <option key={degree} value={degree}>{degree}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filteredCourses.map((offering) => (
            <div key={offering.id} className="border border-gray-200 rounded-xl p-2 lg:p-5 hover:border-blue-200 hover:shadow-sm transition">
              <h4 className="font-bold text-sm lg:text-md text-gray-800 mb-3">{offering.course.name}</h4>
              <div className="space-y-2 text-xs lg:text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-800">{offering.course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-800">{offering.course.course_type || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fees:</span>
                  <span className="font-bold text-blue-600">{offering.total_fees || 'TBA'}</span>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200 mb-4">
                <p className="text-xs text-gray-500 font-bold mb-1">Eligibility:</p>
                <p className="text-xs text-gray-700">{offering.eligibility || 'N/A'}</p>
              </div>
              <button
                onClick={() => router.push(`?courses&fees&courseId=${offering.course.id}`)}
                className="block w-full text-center py-1.5 lg:py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      {courseFAQs && courseFAQs.questions.length > 0 && (
        <section id="course-faqs" className="bg-white p-3 lg:p-8 rounded-2xl">
          <h3 className="text-md lg:text-xl font-bold mb-6">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {courseFAQs.questions.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all"
              >
                <summary className="list-none flex items-center justify-between p-2 cursor-pointer outline-none">
                  <p className="font-semibold text-sm text-gray-800">{faq.q}</p>
                  <Icons.Plus size={16} className="text-blue-500 transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1">
                  <p className="text-gray-600 text-xs lg:text-sm leading-relaxed border-t border-gray-200 pt-3">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CourseFeeTab;
