import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import * as Icons from "lucide-react";

interface PlacementProcess {
  step: string;
  name: string;
  desc: string;
}

interface PlacementItem {
  title: string;
  content: string;
  objectives_title: string;
  objectives: string[];
  process_title: string;
  placement_process: PlacementProcess[];
}

interface PlacementStat {
  title: string;
  degree: string;
  year: number;
  average_package: string;
  median_package: string;
  highest_package: string;
}

interface PlacementRecord {
  id: number;
  college_id: number;
  placement_data: PlacementItem[];
  placement_stats?: PlacementStat[];
  top_recruiters?: string[];
}

interface FAQGroup {
  category: string;
  questions: {
    q: string;
    a: string;
  }[];
}

interface PlacementTabProps {
  placements: PlacementRecord[];
  collegeName: string;
  faqs?: FAQGroup[];
}

const PlacementTab: React.FC<PlacementTabProps> = ({ placements, collegeName, faqs }) => {
  const placementFAQs = faqs?.find(group => group.category === "Placements")?.questions || [];
  if (!placements || placements.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">No placement data available at this time.</p>
      </div>
    );
  }

  const allPlacementData = placements.flatMap(record => record.placement_data || []);
  const data = allPlacementData[0];
  const stats = (placements[0]?.placement_stats as unknown as PlacementStat[])?.[0] || null;
  const recruiters = placements[0]?.top_recruiters || [];

  if (!data) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400">Placement details coming soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Title and Content */}
      <div className="space-y-6">
        <h2 className="text-md lg:text-xl font-bold text-slate-800">{collegeName} - {data.title}</h2>
        <p className="text-sm lg:text-md text-slate-600 leading-relaxed">{data.content}</p>
      </div>

      {/* Placement Stats Table */}
      {stats && (
        <div className="space-y-6">
          <h3 className="text-md lg:text-xl font-bold text-slate-800">{collegeName} {stats.title}</h3>
          <div className="border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-800 border-r border-slate-200">Metric</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-800">Details ({stats.degree || 'UG'})</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700 border-r border-slate-200">Highest Package</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{stats.highest_package || 'N/A'}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700 border-r border-slate-200">Average Package</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{stats.average_package || 'N/A'}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-3 text-sm font-medium text-slate-700 border-r border-slate-200">Median Package</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{stats.median_package || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-slate-700 border-r border-slate-200">Placement Year</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{stats.year || '2024'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Recruiters */}
      {recruiters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-md lg:text-xl font-bold text-slate-800">{collegeName} Top Recruiters</h3>
          <div className="flex flex-wrap gap-3">
            {recruiters.map((recruiter, index) => (
              <div key={index} className="p-1.5 lg:px-4 lg:py-2 bg-blue-100 border border-blue-300 rounded-bl rounded-full text-sm font-medium text-gray-700">
                {recruiter}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Objectives Section */}
      <div className="bg-slate-50">
        <h3 className="text-md lg:text-xl font-bold text-slate-800 mb-4">{collegeName} - {data.objectives_title}</h3>
        <div className="space-y-3 p-3 px-2">
          {data.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 className="text-blue-600 shrink-0 mt-1" size={18} />
              <p className="text-slate-600 text-sm lg:text-md">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Process */}
      <div className="space-y-6">
        <h3 className="text-md lg:text-lg font-bold text-slate-800 pb-2">
          {collegeName} - {data.process_title}
        </h3>
        <div className="space-y-4 border-l-2 border-blue-400 pl-4">
          {data.placement_process.map((p, i) => (
            <div key={i} className="flex gap-4 items-start ">
              <div className="flex items-center justify-center w-6 h-6 rounded-sm bg-blue-600 text-white font-medium text-sm shrink-0">
                {p.step}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-800 mb-1">{p.name}</h4>
                <p className="text-sm lg:text-md text-slate-600">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      {placementFAQs.length > 0 && (
        <div className="bg-white mt-6 rounded-xl border border-gray-100">
          <h3 className="text-lg font-bold mb-4">Placement FAQs</h3>
          <div className="space-y-4">
            {placementFAQs.map((item, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                <summary className="list-none flex items-center justify-between p-1.5 lg:p-3 cursor-pointer outline-none">
                  <p className="font-bold text-sm text-gray-800 w-[85%] flex items-start gap-3">
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

export default PlacementTab;
