import React from 'react';
import { Calendar, Users, DollarSign, Award } from 'lucide-react';
import * as Icons from "lucide-react";

interface Course {
  course_title: string;
  content: string;
  duration: string;
  fees: string;
  seats: string;
  eligibility: string;
  entrance_exam: string;
  selection_process: string;
  cutoff_info: string;
}

interface Stream {
  stream_name: string;
  courses: Course[];
}

interface DegreeLevel {
  degree_level: string;
  streams: Stream[];
}

interface AdmissionStep {
  step: number;
  title: string;
  content: string;
}

interface AdmissionRecord {
  id: number;
  college_id: number;
  admission_data: DegreeLevel[];
  admission_process?: AdmissionStep[];
}

interface FAQGroup {
  category: string;
  questions: {
    q: string;
    a: string;
  }[];
}

interface AdmissionTabProps {
  admissions: AdmissionRecord[];
  collegeName: string;
  admissionPara?: string;
  faqs?: FAQGroup[];
}

const AdmissionTab: React.FC<AdmissionTabProps> = ({ admissions, collegeName, faqs }) => {
  const admissionFAQs = faqs?.find(group => group.category === "Admission")?.questions || [];

  if (!admissions || admissions.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">No admission data available at this time.</p>
      </div>
    );
  }

  const allAdmissionData = admissions.flatMap(record => record.admission_data || []);
  const admissionSteps = admissions[0]?.admission_process || [];

  return (
    <div className="space-y-12">

      {/* Admission Process Steps */}
      {admissionSteps.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-md lg:text-xl font-bold text-slate-800 ">
            {collegeName} Step-by-Step Admission Process 2026
          </h3>
          <div className="relative space-y-6 mt-6">
            <div className="absolute left-4.25 top-2 bottom-2 w-0.5 bg-blue-200"></div>
            {admissionSteps.map((item) => (
              <div key={item.step} className="relative flex gap-4">
                <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-800 text-sm lg:text-md">{item.title}</h5>
                  <p className="text-gray-500 text-xs lg:text-sm mt-1 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Degree Level Sections */}
      {allAdmissionData.map((degreeLevel, degreeIndex) => (
        <div key={degreeIndex} className="space-y-4">
          <h2 className="text-lg lg:text-xl font-bold text-slate-800 ">
            {collegeName} - {degreeLevel.degree_level}
          </h2>

          {degreeLevel.streams.map((stream, streamIndex) => (
            <div key={streamIndex} className="space-y-3 pl-2 lg:pl-3">
              <div className="bg-slate-50 py-2 px-3 border-l-2 border-blue-600">
                <h3 className="text-md lg:text-lg font-bold text-slate-800">{stream.stream_name}</h3>
              </div>

              {stream.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="space-y-4">
                  <h4 className="text-sm lg:text-lg font-bold text-slate-800">{course.course_title}</h4>
                  <p className="text-slate-600 text-xs lg:text-sm leading-relaxed">{course.content}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-blue-500 shrink-0 m-0.5" size={15} />
                      <div>
                        <p className="text-xs lg:text-sm text-slate-400">Duration</p>
                        <p className="text-sm lg:text-md font-semibold text-slate-700">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icons.IndianRupee className="text-blue-500 shrink-0 mt-0.5" size={15} />
                      <div>
                        <p className="text-xs lg:text-sm text-slate-400">Fees</p>
                        <p className="text-sm lg:text-md font-semibold text-slate-700">{course.fees}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="text-blue-500 shrink-0 mt-0.5" size={15} />
                      <div>
                        <p className="text-xs lg:text-sm text-slate-400">Seats</p>
                        <p className="text-sm lg:text-md font-semibold text-slate-700">{course.seats}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="text-blue-600 shrink-0 mt-1" size={15} />
                      <div>
                        <p className="text-xs lg:text-sm text-slate-400">Entrance Exam</p>
                        <p className="text-sm lg:text-md font-semibold text-slate-700">{course.entrance_exam}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-4 space-y-2">
                    <div>
                      <p className="text-xs lg:text-sm text-slate-400">Eligibility</p>
                      <p className="text-sm lg:text-md font-medium text-slate-700">{course.eligibility}</p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-slate-400">Selection Process</p>
                      <p className="text-sm lg:text-md font-medium text-slate-700">{course.selection_process}</p>
                    </div>
                    <div>
                      <p className="text-xs lg:text-sm text-slate-400">Cutoff Info</p>
                      <p className="text-sm lg:text-md font-medium text-slate-700">{course.cutoff_info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* FAQ Section */}
      {admissionFAQs.length > 0 && (
        <div className="bg-white mt-6 rounded-xl border border-gray-100">
          <h3 className="text-md lg:text-lg font-semibold mb-4">Admission FAQs</h3>
          <div className="space-y-2">
            {admissionFAQs.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                <summary className="list-none flex items-center justify-between py-2 cursor-pointer outline-none">
                  <p className="text-sm lg:text-md text-gray-800 flex items-start gap-2 w-65 md:w-auto lg:w-auto">
                    {item.q}
                  </p>
                  <Icons.Plus
                    size={16}
                    className="text-blue-500 transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-4 pb-4 ml-7 animate-in fade-in slide-in-from-top-1">
                  <p className="text-gray-600 text-md leading-relaxed border-t border-gray-200 pt-3">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionTab;
