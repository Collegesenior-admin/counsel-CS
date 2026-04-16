import React, { useState } from 'react';
import { TrendingUp, CheckCircle2, GraduationCap, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface Course {
  id: number;
  name: string;
  short_name?: string | null;
  duration: string;
  course_type?: string | null;
  avg_fees?: string | null;
  stream?: string;
  level?: string;
  description?: string;
  avg_salary?: string;
  entrance_exams?: string[];
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

interface CourseDetailViewProps {
  selectedCourse: CourseOffering;
  collegeName: string;
  otherCourses: CourseOffering[];
}

const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  selectedCourse,
  collegeName,
  otherCourses,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const courseData = (selectedCourse.collegecourse_data || {}) as CollegeCourseData;
  const course = selectedCourse.course;
  const [isTOCExpanded, setIsTOCExpanded] = useState(false);

  const handleBack = () => {
    if (from === 'course-listing') {
      router.push('/courses');
    } else {
      router.back();
    }
  };

  const coursesByStream = otherCourses.reduce((acc, offering) => {
    const stream = offering.course.stream || 'Other';
    if (!acc[stream]) acc[stream] = [];
    acc[stream].push(offering);
    return acc;
  }, {} as Record<string, CourseOffering[]>);

  const tocItems = [
    `${course.short_name || course.name} in ${collegeName} Overview`,
    `${course.short_name} Highlights`,
    `Fee Structure for ${course.short_name}`,
    `Eligibility & Admission`,
    `Placement & Career Prospects`,
    `${course.short_name} FAQs`,
    `Other Courses at ${collegeName}`,
    `Explore by Streams`
  ];

  return (
    <div className="space-y-3">
      
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition mb-4"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      {/* Table of Contents - Collapsible */}
      <section className="bg-white p-6 rounded-2xl border border-gray-200">
        <button
          onClick={() => setIsTOCExpanded(!isTOCExpanded)}
          className="w-full flex items-center justify-between"
        >
          <h3 className="font-bold text-lg">Table of Contents</h3>
          {isTOCExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        {isTOCExpanded && (
          <ul className="space-y-2 text-sm text-gray-600 mt-4">
            {tocItems.map((item, idx) => (
              <li key={idx}>
                <span className="text-blue-600 mt-1">•</span>
                <button onClick={() => {
                  const ids = ['course-overview', 'course-details', 'fee-structure', 'eligibility', 'placement', 'course-faqs', 'related-courses', 'explore-streams'];
                  document.getElementById(ids[idx])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }} className="hover:text-blue-600 transition ml-2">{item}</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Course Header */}
      <section className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-2">{course.short_name} at {collegeName}</h2>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Duration</p>
            <p className="text-lg font-bold">{course.duration}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Type</p>
            <p className="text-lg font-bold">{course.course_type || 'Full Time'}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Total Fees</p>
            <p className="text-lg font-bold text-blue-600">{courseData?.fee_structure?.total || selectedCourse.total_fees || 'TBA'}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-gray-400 uppercase font-bold">Avg Salary</p>
            <p className="text-lg font-bold text-green-600">{course.avg_salary || 'N/A'}</p>
          </div>
        </div>
      </section>

      {/* Overview */}
      {courseData?.overview && (
        <section id="course-overview" className="bg-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">{course.short_name} in {collegeName} Overview</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{courseData.overview}</p>

          {courseData.highlights && courseData.highlights.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-md mb-3">Course Highlights</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {courseData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {courseData.specializations && courseData.specializations.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-md mb-3">Specializations Offered</h3>
              <div className="flex flex-wrap gap-2">
                {courseData.specializations.map((spec, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Course Highlights - Redesigned */}
      <section id="course-details" className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">{course.short_name} at {collegeName} Highlights</h2>
        <div className="overflow-x-auto rounded-xl border border-gray-300 mb-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Duration</td>
                <td className="px-4 py-3 text-sm text-gray-600">{course.duration}</td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Course Type</td>
                <td className="px-4 py-3 text-sm text-gray-600">{course.course_type || 'Full Time'}</td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Stream</td>
                <td className="px-4 py-3 text-sm text-gray-600">{course.stream}</td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Level</td>
                <td className="px-4 py-3 text-sm text-gray-600">{course.level || 'N/A'}</td>
              </tr>
              <tr className="border-b border-gray-300 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Total Fees</td>
                <td className="px-4 py-3 text-sm font-bold text-blue-600">{courseData?.fee_structure?.total || selectedCourse.total_fees || 'TBA'}</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-bold text-gray-700">Avg Salary</td>
                <td className="px-4 py-3 text-sm font-bold text-green-600">{course.avg_salary || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grid Layout for Additional Info */}
        <div className="grid md:grid-cols-2 gap-4">
          {course.entrance_exams && course.entrance_exams.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-md mb-3 text-gray-800">Entrance Exams</h3>
              <div className="flex flex-wrap gap-2">
                {course.entrance_exams.map((exam, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {exam}
                  </span>
                ))}
              </div>
            </div>
          )}

          {courseData?.exam_pattern && (
            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-md mb-3 text-gray-800">Exam Pattern</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{courseData.exam_pattern}</p>
            </div>
          )}

          {courseData?.infrastructure && (
            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-md mb-3 text-gray-800">Infrastructure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{courseData.infrastructure}</p>
            </div>
          )}

          {courseData?.projects_internships && (
            <div className="p-4 bg-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-md mb-3 text-gray-800">Projects & Internships</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{courseData.projects_internships}</p>
            </div>
          )}
        </div>
      </section>

      {/* Fee Structure */}
      {courseData?.fee_structure && (
        <section id="fee-structure" className="bg-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-3">Fee Structure for {course.short_name} at {collegeName}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">The fees structure for {course.short_name} at {collegeName} is approximately {courseData.fee_structure.total?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  for the full {course.duration?.split(' ')[0] || '4'}-years program. This includes tuition fees, semester-wise institute charges, and other academic expenses. Additional hostel and mess charges may apply if the student opts for on-campus accommodation.</p>
          <div className="overflow-x-auto rounded-xl border border-gray-300">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-300">
                  <th className="text-left px-4 py-3 text-sm font-bold">Year</th>
                  <th className="text-right px-4 py-3 text-sm font-bold">Fees</th>
                </tr>
              </thead>
              <tbody>
                {courseData.fee_structure.year_1 && (
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">Year 1</td>
                    <td className="px-4 py-3 text-sm font-bold text-right">{courseData.fee_structure.year_1}</td>
                  </tr>
                )}
                {courseData.fee_structure.year_2 && (
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">Year 2</td>
                    <td className="px-4 py-3 text-sm font-bold text-right">{courseData.fee_structure.year_2}</td>
                  </tr>
                )}
                {courseData.fee_structure.year_3 && (
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">Year 3</td>
                    <td className="px-4 py-3 text-sm font-bold text-right">{courseData.fee_structure.year_3}</td>
                  </tr>
                )}
                {courseData.fee_structure.year_4 && (
                  <tr className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">Year 4</td>
                    <td className="px-4 py-3 text-sm font-bold text-right">{courseData.fee_structure.year_4}</td>
                  </tr>
                )}
                {courseData.fee_structure.total && (
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 text-sm font-bold text-gray-800">Total Course Fees</td>
                    <td className="px-4 py-3 text-lg font-bold text-blue-600 text-right">{courseData.fee_structure.total}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Eligibility & Admission - Redesigned */}
      <section id="eligibility" className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Eligibility & Admission for {course.short_name} in {collegeName}</h2>
        <p className="text-gray-700 leading-relaxed mb-6">The eligibility criteria for {course.short_name} at {collegeName} require candidates to have a minimum of {courseData?.eligibility_details?.split(' ')[0] || '60%'} in {courseData?.eligibility_details?.split(' ').slice(1).join(' ') || 'Mathematics, Physics, and Chemistry'} at the Class 12 level or equivalent.
          The selection process is based on {courseData?.selection_criteria || 'Merit-based'}, followed by the official counselling procedure conducted by the respective authorities.
          The admission process involves completing the {courseData?.admission_process?.[0]?.title || 'Application Form'}, appearing for the {courseData?.admission_process?.[1]?.title || 'Entrance Exam'}, and successfully participating in the counselling and seat allotment process.
          Additionally, {courseData?.scholarship_info || 'Merit-based'} scholarships are available, offering financial support to {courseData?.eligibility_details || 'Students meeting specific criteria'}, subject to institute norms.</p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {(courseData?.eligibility_details || selectedCourse.eligibility) && (
            <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-blue-600" />
                Eligibility Criteria
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{courseData?.eligibility_details || selectedCourse.eligibility}</p>
            </div>
          )}

          {courseData?.selection_criteria && (
            <div className="p-5 bg-green-50 rounded-xl border border-green-100">
              <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-600" />
                Selection Process
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{courseData.selection_criteria}</p>
            </div>
          )}
        </div>

        {courseData?.admission_process && courseData.admission_process.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-4">Admission Process</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {courseData.admission_process.map((step) => (
                <div key={step.step} className="p-4 bg-slate-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-sm font-bold shrink-0">
                      {step.step}
                    </div>
                    <h4 className="font-bold text-md text-gray-800">{step.title}</h4>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed ml-11">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {courseData?.scholarship_info && (
          <div className="mt-6 p-5 bg-amber-50 rounded-xl border border-amber-100">
            <h3 className="font-bold text-md mb-2 text-gray-800">Scholarship Information</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{courseData.scholarship_info}</p>
          </div>
        )}
      </section>

      {/* Placement & Career - Redesigned */}
      {courseData?.career_prospects && (
        <section id="placement" className="bg-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">Placement & Career Prospects for {course.short_name} in {collegeName}</h2>
          <p className="text-gray-700 leading-relaxed mb-6">The placement and career prospects for {course.name} at {collegeName} are strong, with an average salary range of {courseData.career_prospects.salary_range} offered to graduates.
            Students are recruited for roles, across leading organizations in sectors including {courseData.career_prospects.top_sectors?.join(', ') || 'Technology and Analytics'}.
            Through the course, students develop industry-relevant skills such as {courseData.skills_gained?.join(', ') || 'Problem-solving and Analytical Skills'}, which prepare them for careers in technology, analytics, and problem-solving roles across diverse domains.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {courseData.career_prospects.salary_range && (
              <div className="p-6 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 text-center">
                <p className="text-sm text-gray-600 mb-2">Average Salary Range</p>
                <p className="text-lg font-bold text-green-600">{courseData.career_prospects.salary_range}</p>
              </div>
            )}

            {courseData.career_prospects.job_roles && (
              <div className="md:col-span-2 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-bold text-md text-gray-800 mb-3">Top Job Roles</h3>
                <div className="grid grid-cols-2 gap-2">
                  {courseData.career_prospects.job_roles.map((role, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                      <CheckCircle2 size={14} className="text-blue-600 shrink-0" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {courseData.career_prospects.top_sectors && (
            <div className="mb-6">
              <h3 className="font-bold text-md text-gray-800 mb-3">Top Hiring Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {courseData.career_prospects.top_sectors.map((sector, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          )}

          {courseData.skills_gained && courseData.skills_gained.length > 0 && (
            <div>
              <h3 className="font-bold text-md mb-3 flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" />
                Skills You&apos;ll Gain
              </h3>
              <div className="flex flex-wrap gap-2">
                {courseData.skills_gained.map((skill, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* FAQs */}
      {courseData?.faqs && courseData.faqs.length > 0 && (
        <section id="course-faqs" className="bg-white p-8 rounded-2xl">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions for {course.short_name}</h2>
          <div className="space-y-4">
            {courseData.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all"
              >
                <summary className="list-none flex items-center justify-between p-4 cursor-pointer outline-none">
                  <p className="font-bold text-sm text-gray-800">{faq.q}</p>
                  <Icons.Plus size={16} className="text-blue-500 transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Other Courses - Redesigned */}
      <section id="related-courses" className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Other Popular Courses at {collegeName}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {otherCourses.slice(0, 6).map((offering) => (
            <Link
              key={offering.id}
              href={`?courses&fees&courseId=${offering.course.id}`}
              className="p-5 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition group"
            >
              <h3 className="font-bold text-gray-800 mb-3 text-sm group-hover:text-blue-600 transition">{offering.course.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium text-gray-700">{offering.course.duration}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Fees:</span>
                  <span className="font-bold text-blue-600">{offering.total_fees || 'TBA'}</span>
                </div>
              </div>
            </Link>
          ))}</div>
      </section>

      {/* Explore by Streams - Redesigned */}
      <section id="explore-streams" className="bg-white p-8 rounded-2xl">
        <h2 className="text-xl font-bold mb-6">Explore Courses by Stream at {collegeName}</h2>
        <div className="space-y-6">
          {Object.entries(coursesByStream).map(([stream, courses]) => (
            <div key={stream} className="p-5 bg-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-bold text-md text-gray-800 mb-4 flex items-center gap-2">
                <GraduationCap size={18} className="text-blue-600" />
                {stream} Courses ({courses.length})
              </h3>
              <div className="grid md:grid-cols-4 gap-3">
                {courses.slice(0, 4).map((offering) => (
                  <Link
                    key={offering.id}
                    href={`?courses&fees&courseId=${offering.course.id}`}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition text-center"
                  >
                    <p className="font-medium text-gray-800 text-xs">{offering.course.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CourseDetailView;
