import React from 'react';
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  duration: string;
  avg_fees?: string | null;
  course_type?: string | null;
  eligibility?: string | null;
}

interface CourseOffering {
  id: number;
  course: Course;
  eligibility?: string | null;
  total_fees?: string | null;
}

interface TopCoursesSectionProps {
  courses: CourseOffering[];
  collegeName: string;
}

const TopCoursesSection: React.FC<TopCoursesSectionProps> = ({ courses, collegeName }) => {
  const topCourses = courses.slice(0, 8);

  if (topCourses.length === 0) return null;


  return (
    <section className="bg-white p-3 lg:p-6 rounded-xl border border-gray-200 mt-6">
      <h3 className="text-md lg:text-lg font-bold text-gray-800 mb-4">
        Top Courses Offered at {collegeName}
      </h3>

      <div className="overflow-x-auto pb-2 -mx-2 px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-4 min-w-max">
          {topCourses.map((offering) => (
            <div
              key={offering.id}
              className="w-94 shrink-0 border border-gray-200 rounded-xl p-2 lg:p-5 hover:shadow-sm transition bg-white" >
                <a href={`?courses&fees&courseId=${offering.course.id}`} className='hover:text-blue-700'>
              <h4 className="font-bold text-sm lg:text-md text-gray-800 mb-3 line-clamp-2">
                  {offering.course.name}
              </h4>

              <div className="space-y-2 text-xs lg:text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium text-gray-800">
                    {offering.course.duration}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-800">
                    {offering.course.course_type || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Fees:</span>
                  <span className="font-bold text-blue-600">
                    {offering.total_fees || 'TBA'}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-bold mb-1">
                  Eligibility:
                </p>
                <p className="text-xs text-gray-700">
                  {offering.eligibility || 'N/A'}
                </p>
              </div>
                </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCoursesSection;
