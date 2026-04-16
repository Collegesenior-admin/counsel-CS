import React from 'react';
import { Award } from 'lucide-react';
import * as Icons from "lucide-react";
import { ScholarshipTabProps } from './types';


const ScholarshipTab: React.FC<ScholarshipTabProps> = ({ scholarships, collegeName, faqs }) => {

    const scholarshipFAQs = faqs?.find(group => group.category === "Scholarships")?.questions || [];

    if (!scholarships || scholarships.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-3 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <Award className="text-slate-300 mb-4" size={64} />
                <p className="text-slate-500 font-medium text-lg">No scholarship data found.</p>
                <p className="text-slate-400 text-sm">Check back later for updated financial aid info.</p>
            </div>
        );
    }

    return (
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Part 1: Heading/Description (Optional: Mapping through the array for titles) */}
            {scholarships[0]?.scholarship_data?.map((data, idx) => (
                <div key={idx} className="mt-4">
                    <div className="flex items-start gap-2">
                        <div>
                            <h3 className="text-md lg:text-lg font-bold text-gray-800 mb-3">{collegeName} {data.name}</h3>
                            <p className="text-md text-gray-600 mt-1 text-sm lg:text-md">{data.description}</p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Part 2: The Scholarship Table */}
            <div className="bg-white mt-3 rounded-xl border border-gray-100">
                <div className="overflow-x-auto rounded-xl border border-gray-300">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-300">
                                <th className="px-2 py-2 text-center text-sm lg:text-md font-bold border-r border-gray-300">Scholarship Name</th>
                                <th className="px-2 py-2 text-center text-sm lg:text-md font-bold border-r border-gray-300">Type</th>
                                <th className="px-2 py-2 text-center text-sm lg:text-md font-bold border-r border-gray-300">Deadline</th>
                                <th className="px-2 py-2 text-center text-sm lg:text-md font-bold border-r border-gray-300">Eligibility</th>
                                <th className="px-2 py-2 text-center text-sm lg:text-md font-bold">Benefit</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {scholarships[0]?.scholarship_data?.map((data, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-colors text-sm lg:text-md">
                                    <td className="px-2 py-3 border-r border-gray-300">
                                        <p className="text-gray-800 w-40">{data.name}</p>
                                    </td>
                                    <td className="px-2 py-3 border-r border-gray-300">
                                        <p className="px-2 py-1 bg-blue-100 text-blue-700 font-bold rounded uppercase">
                                            {data.type}
                                        </p>
                                    </td>
                                    <td className="px-2 py-3 border-r border-gray-300">
                                        <p className="flex items-center w-30 gap-1 text-gray-600">

                                            {data.deadline}
                                        </p>
                                    </td>
                                    <td className="px-2 py-3 border-r border-gray-300 text-gray-600">
                                        <p className='w-50'>{data.eligibility}</p>
                                    </td>
                                    <td className="px-2 py-3">
                                        <p className="font-bold text-blue-600 w-45">{data.amount_desc}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* Part 3: FAQs Section */}
            {scholarshipFAQs.length > 0 && (
                <div className="bg-white mt-6 rounded-xl border border-gray-100">
                    <h3 className="text-md lg:text-lg font-bold mb-3">Scholarship FAQs</h3>
                    <div className="bg-white rounded-2xl">
                        <div className="space-y-4">
                            {scholarshipFAQs.length > 0 ? (
                                scholarshipFAQs.map((item, idx) => (
                                    <details
                                        key={idx}
                                        className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                                        <summary className="list-none flex items-center justify-between  cursor-pointer outline-none">
                                            <p className="text-sm text-gray-800 w-[85%] flex items-start gap-3">
                                                {item.q || 'FAQ Question'}</p>
                                            <Icons.Plus
                                                size={16}
                                                className="text-blue-500 transition-transform group-open:rotate-45" />
                                        </summary>
                                        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1">
                                            <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
                                                {item.a || 'FAQ Answer'} </p>
                                        </div>
                                    </details>
                                ))
                            ) : (
                                <p className="text-gray-400 italic text-center py-4">No FAQs available.</p>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScholarshipTab;
