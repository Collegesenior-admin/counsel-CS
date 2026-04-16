import React, { useState } from 'react';
// import * as LucideIcons from 'lucide-react';
import * as Icons from "lucide-react";
import { ChevronDown, ChevronUp, LucideProps } from "lucide-react";
import { FacilityJSON, FAQGroup, IconProps } from './types';


interface CampusTabProps {
    infrastructure: {
        all_facilities: FacilityJSON;
    };
    collegeName: string;
    faqs?: FAQGroup[];
}

const IconComponent = ({ name, size = 20, className = "", ...props }: IconProps) => {
    // Use a type-safe lookup instead of 'any'
    const LucideIcon = Icons[name as keyof typeof Icons] as React.FC<LucideProps>;

    if (!LucideIcon) {
        // Return a fallback icon if the name doesn't match a Lucide icon
        return <Icons.HelpCircle size={size} className={className} {...props} />;
    }

    return <LucideIcon size={size} className={className} {...props} />;
};

const CampusTab: React.FC<CampusTabProps> = ({ infrastructure, collegeName, faqs }) => {
    const { all_facilities } = infrastructure;
    const campusFAQs = faqs?.find(group => group.category === "Campus")?.questions || [];
    const [isExpanded, setIsExpanded] = useState(false);

    // Define how many items to show initially
    const INITIAL_LIMIT = 8;
    const hasMore = all_facilities.Facilities.length > INITIAL_LIMIT;

    // Decide which items to display based on state
    const displayedFacilities = isExpanded
        ? all_facilities.Facilities
        : all_facilities.Facilities.slice(0, INITIAL_LIMIT);


    if (!all_facilities) {
        return (
            <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">Infrastructure data is being updated.</p>
            </div>
        );
    }

    return (
        <div className=" animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">

                {/* Overall Description Card */}
                <section className="bg-white py-4 rounded-3xl border border-slate-100">
                    <h3 className="text-md lg:text-xl font-bold text-slate-800 mb-4">{collegeName} Campus Overview</h3>
                    <p className="text-slate-600 leading-relaxed text-sm lg:text-md">
                        {all_facilities.description}
                    </p>
                </section>
            </div>
            <div className="space-y-3 mb-6">
                <h3 className="text-md lg:text-xl font-bold text-slate-800">
                    {collegeName} Campus Details
                </h3>

                {all_facilities.Facilities.map((facility) => (
                    <div className="flex  bg-white border border-gray-200 shadow-sm pb-3 rounded-lg ">
                        {/* Left Icon */}
                        <div className="flex-1">
                        <div className="flex items-center bg-blue-100 rounded-t-lg shrink-0 p-2 gap-4">
                            <IconComponent name={facility.icon} className="size-5 text-blue-600" strokeWidth={1.5}/>
                            <h3 className="text-md md:text-lg text-blue-700">
                                {facility.name}
                            </h3>
                        </div>

                        {/* Right Content */}
                            <p className="text-sm md:text-md text-slate-600 leading-relaxed px-3 py-2">
                                {facility.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Facilities Grid */}
            <div className="animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-lg font-bold mb-4 px-1">
                    {collegeName} Campus Facilities
                </h3>

                {/* The Responsive Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {displayedFacilities.map((f, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 rounded-2xl transition-all"
                        >
                            <div className="p-2 text-gray-500 rounded-xl transition-colors">
                                <IconComponent name={f.icon} className="size-4" />
                            </div>
                            <span className="text-sm font-semibold text-gray-500 ">
                                {f.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Toggle Button */}
                {hasMore && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-full text-sm font-medium text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-600 transition-all"
                        >
                            {isExpanded ? (
                                <>Show Less <ChevronUp size={16} /></>
                            ) : (
                                <>View All Facilities <ChevronDown size={16} /></>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {campusFAQs.length > 0 && (
                <div className="bg-white mt-6 rounded-xl border border-gray-100">
                    <h3 className="text-md lg:text-lg font-bold mb-2">{collegeName} Campus FAQs</h3>
                    <div className="space-y-3">
                        {campusFAQs.map((item, idx) => (
                            <details
                                key={idx}
                                className="group bg-slate-50 rounded-xl border border-transparent transition-all">
                                <summary className="list-none flex items-center justify-between p-2 lg:p-4 cursor-pointer outline-none">
                                    <p className="text-sm w-[80%] text-gray-800 flex items-start gap-3">
                                        {item.q}</p>
                                    <Icons.Plus
                                        size={16}
                                        className="text-blue-500 transition-transform group-open:rotate-45" />
                                </summary>
                                <div className="px-4 pb-4 ml-7 animate-in fade-in slide-in-from-top-1">
                                    <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
                                        {item.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CampusTab;
