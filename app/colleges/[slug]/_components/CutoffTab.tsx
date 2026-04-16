import React from 'react';
import * as Icons from "lucide-react";

interface CategoryRank {
  name: string;
  rank: string;
}

interface CutoffBlock {
  year: string;
  title: string;
  content: string;
  category: CategoryRank[];
}

interface Stream {
  stream_name: string;
  exam: string;
  blocks: CutoffBlock[];
}

interface Department {
  department: string;
  streams: Stream[];
}

interface CutoffRecord {
  id: number;
  college_id: number;
  course_id?: number;
  cutoff_data: Department[];
}

interface FAQGroup {
  category: string;
  questions: {
    q: string;
    a: string;
  }[];
}

interface CutoffTabProps {
  cutoffs: CutoffRecord[];
  collegeName: string;
  faqs?: FAQGroup[];
}

const CutoffTab: React.FC<CutoffTabProps> = ({ cutoffs, faqs }) => {
  const cutoffFAQs = faqs?.find(group => group.category === "Cutoff")?.questions || [];

  if (!cutoffs || cutoffs.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">No cutoff data available at this time.</p>
      </div>
    );
  }

  const allDepartments = cutoffs.flatMap(record => record.cutoff_data || []);

  return (
    <div className="space-y-12">
      {allDepartments.map((dept, deptIndex) => (
        <div key={deptIndex} className="space-y-4">
          <h2 className="text-lg lg:text-2xl font-bold text-slate-800 border-b-2 border-blue-600 pb-2">
            {dept.department}
          </h2>

          {dept.streams.map((stream, streamIndex) => (
            <div key={streamIndex} className="space-y-4">
              <div className="flex bg-slate-50 p-2 lg:p-4 rounded-lg">
                <div className="w-1 bg-blue-500 rounded-full mr-3"></div>

                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-slate-800">
                    {stream.stream_name}
                  </h3>
                  <p className="text-xs lg:text-sm text-slate-600 mt-1">
                    Exam: {stream.exam}
                  </p>
                </div>
              </div>


              {stream.blocks.map((block, blockIndex) => (
                <div key={blockIndex} className="ml-2.5 lg:ml-6 space-y-4">
                  <div className="border-l-2 border-slate-300 pl-4">
                    <div className="mb-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">{block.year}</span>
                      <h4 className="text-md lg:text-lg font-bold text-slate-800">{block.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{block.content}</p>
                  </div>

                  <div className="border border-slate-200">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200">
                          <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">Category</th>
                          <th className="px-4 py-3 text-right text-sm font-bold text-slate-700">Cutoff Rank</th>
                        </tr>
                      </thead>
                      <tbody>
                        {block.category?.map((cat, idx) => (
                          <tr key={idx} className="border-b border-slate-100 last:border-b-0">
                            <td className="px-4 py-3 text-sm text-slate-700">{cat.name}</td>
                            <td className="px-4 py-3 text-right text-sm font-bold text-slate-800">{cat.rank}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* FAQ Section */}
      {cutoffFAQs.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Cutoff FAQs</h3>
          <div className="space-y-4">
            {cutoffFAQs.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                <summary className="list-none flex items-center justify-between p-2 cursor-pointer outline-none">
                  <p className="font-bold text-sm text-gray-800 flex items-start gap-3 w-[85%]">
                    {item.q}
                  </p>
                  <Icons.Plus
                    size={16}
                    className="text-blue-500 transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-4 pb-4 ml-7 animate-in fade-in slide-in-from-top-1">
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
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

export default CutoffTab;
