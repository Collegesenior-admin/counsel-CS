import React from 'react';
import { BookOpen, Clock, IndianRupee } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  duration: string;
  avg_fees?: string | null;
}

interface CourseOffering {
  id: number;
  course: Course;
  eligibility?: string | null;
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
      <h3 className="text-md lg:text-lg font-bold text-gray-800 mb-4">Top Courses Offered at {collegeName}</h3>
      <div className="overflow-x-auto pb-2 -mx-2 px-2" >
        <div className="flex gap-4 min-w-max">
          {topCourses.map((offering) => (
            <div key={offering.id} className="w-64 shrink-0 p-5 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all bg-linear-to-br from-white to-blue-50/30">
              <div className="flex flex-col h-full">
               
                <h4 className="font-bold text-gray-800 text-sm mb-3 line-clamp-2 min-h-10">{offering.course.name}</h4>
                <div className="flex mt-auto space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <Clock size={14} className="text-blue-600" />
                    <span className="font-medium">{offering.course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <IndianRupee size={14} className="text-blue-600" />
                    <span className="font-medium">{offering.course.avg_fees || 'TBA'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCoursesSection;
