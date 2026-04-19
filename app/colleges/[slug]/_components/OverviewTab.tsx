'use client';
// import React from 'react';
import {
    Users, BookOpen, Building2, ChevronRight,
    CheckCircle2
} from 'lucide-react';
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import {
    TabProps, SectionBlock, AdmissionStep,
    PlacementStat, GalleryMedia, FacilityJSON, IconProps, NewsContent, FAQGroup
} from './types';

export const OverviewTab = ({ college, setActiveTab }: TabProps) => {

    // Helper: Extract content from structured JSON paragraphs
    const contentSections = (college.structured_data as unknown as SectionBlock[]) || [];
    const getSectionContent = (term: string) => {
        return contentSections.find(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        )?.content || "";
    };

    // Data Extractions
    const overviewContent = getSectionContent("overview") || college.description;
    const coursePara = getSectionContent("courses");
    const admissionPara = getSectionContent("admission");
    const placementPara = getSectionContent("placement");
    const cutoffPara = getSectionContent("cutoff");
    const scholarshipPara = getSectionContent("scholarship");
    const rankingPara = getSectionContent("ranking");
    const galleryPara = getSectionContent("gallery");
    const campusPara = getSectionContent("campus");

    const admissionSteps = (college.admissions?.[0]?.admission_process as unknown as AdmissionStep[]) || [];
    const PlacementStats = (college.placements?.[0]?.placement_stats as unknown as PlacementStat[])?.[0] || null;
    const facilityData = (college.facilities[0]?.all_facilities as unknown as FacilityJSON) || null;
    const facilityList = facilityData?.Facilities || [];
    const faqData = college.faqs?.[0]?.faq_data as unknown as FAQGroup[];
    const overviewFAQs = faqData?.find(group => group.category === "Overview")?.questions || [];

    const handleViewAll = (tabId: string) => {
        setActiveTab(tabId);
        window.scrollTo({ top: 450, behavior: 'smooth' });
    };
    const IconComponent = ({ name, size = 20, className = "", ...props }: IconProps) => {
        // Use a type-safe lookup instead of 'any'
        const LucideIcon = Icons[name as keyof typeof Icons] as React.FC<LucideProps>;

        if (!LucideIcon) {
            // Return a fallback icon if the name doesn't match a Lucide icon
            return <Icons.HelpCircle size={size} className={className} {...props} />;
        }

        return <LucideIcon size={size} className={className} {...props} />;
    };

    return (
        <div className="space-y-3 lg:space-y-6 animate-in fade-in duration-500">
            {/* 1. ABOUT */}
            <section className="bg-white p-4 lg:p-8 rounded-2xl">
                <h2 className="text-md lg:text-xl font-bold mb-4">About {college.name}</h2>
                <p className="text-gray-600 text-sm lg:text-md leading-relaxed">{college.description}</p>
                <h3 className="text-md lg:text-lg font-bold mb-4 mt-4">{college.name} Overview</h3>
                <p className="text-sm lg:text-md text-gray-600 leading-relaxed">{overviewContent}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 lg:mt-8">

                    <div className="p-2 lg:p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Users className="text-blue-600 mb-2" size={20} />
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Avg Package</p>
                        <p className="text-md lg:text-lg font-bold">₹{(college as any).avg_package || 'N/A'}</p>
                    </div>
                    <div className="p-2 lg:p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <BookOpen className="text-blue-600 mb-2" size={20} />
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Courses</p>
                        <p className="text-md lg:text-lg font-bold">{college.course_offerings.length}+</p>
                    </div>
                    <div className="p-2 lg:p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <Building2 className="text-blue-600 mb-2" size={20} />
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Established</p>
                        <p className="text-md lg:text-lg font-bold">{college.established || 'N/A'}</p>
                    </div>
                </div>
            </section>

            {/* 2. COURSE & FEES */}
            <section className="bg-white p-4 md:p-6 lg:p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-lg font-bold">{college.name} Courses 2026</h2>
                    <button onClick={() => handleViewAll('courses')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View All <ChevronRight size={16} />
                    </button>
                </div>
                <p className="text-sm lg:text-md text-gray-600 mb-4">{coursePara || 'No course details available.'}</p>
                <div className="grid gap-4">
                    <h3 className="font-bold text-md lg:text-lg">{college.name} Courses, Fees</h3>
                    <div className='flex w-full overflow-x-scroll'>

                        <table className="w-full border-collapse overflow-x-scroll text-sm lg:text-md">
                            <thead>
                                <tr className=" text-left text-md font-bold border-b border-gray-300 bg-slate-50">
                                    <th className="p-3">Course
                                        <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
                                            <span className="flex items-center gap-1">
                                                Eligibility
                                            </span>
                                        </p>
                                    </th>
                                    <th className="p-3">Duration</th>
                                    <th className="p-3">Type</th>
                                    <th className="p-3 text-right">Avg Fees</th>
                                </tr>
                            </thead>
                            <tbody>
                                {college.course_offerings.slice(0, 10).map((offering: any) => (
                                    <tr
                                        key={offering.id}
                                        className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50"
                                    >
                                        <td className="p-3">
                                            <p className="font-medium w-60 md:w-90 text-gray-800">
                                                {offering.course.name}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-2">

                                                <span className="flex items-center gap-1">
                                                    <CheckCircle2 size={12} className="text-green-500" />
                                                    {offering.eligibility}
                                                </span>
                                            </p>
                                        </td>
                                        <td className="p-3">{offering.course.duration}</td>



                                        <td className="p-3 text-sm text-gray-700">
                                            {offering.course.course_type || "N/A"}
                                        </td>

                                        <td className="p-3 text-right font-bold text-blue-600">
                                            {offering.course.avg_fees || "TBA"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>

            {/* ADMISSION */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-xl font-bold">{college.name} Admission, 2026</h2>
                    <button onClick={() => handleViewAll('admission')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View Details <ChevronRight size={16} />
                    </button>
                </div>

                {college.admissions && college.admissions.length > 0 && college.admissions.slice(0, 2).map((admission) => {
                    // Parse the steps specifically for this admission record


                    return (
                        <div key={admission.id} className="mb-8 last:mb-0">
                            <h3 className="font-bold text-md lg:text-lg mb-2">{college.name} Admission Overview</h3>

                            {/* 1. General Admission Paragraph */}
                            <p className="text-gray-600 text-sm lg:text-md mb-6">{admissionPara}</p>

                            <h4 className="font-bold text-md my-4 pt-3 ">
                                Step-by-Step Admission Process 2026
                            </h4>

                            {/* 2. Vertical Steps Timeline */}
                            <div className="relative space-y-6 mt-6">
                                {/* The Line */}
                                <div className="absolute left-4.25 top-2 bottom-2 w-0.5 bg-blue-200"></div>

                                {admissionSteps.map((item) => (
                                    <div key={item.step} className="relative flex gap-4">
                                        {/* The Circle with Number */}
                                        <div className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white text-xs font-bold shrink-0">
                                            {item.step}
                                        </div>

                                        {/* Step Content */}
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
                    );
                })}
            </section>

            {/* 4. PLACEMENT  */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} Placements {PlacementStats?.year || '2026'}</h2>
                    <button onClick={() => handleViewAll('placements')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View Placement Report <ChevronRight size={16} />
                    </button>
                </div>

                {/* Placement Paragraph (Already extracted in your previous steps) */}
                {placementPara && (
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm lg:text-md md:text-base">
                        {placementPara}
                    </p>
                )}

                {/* Placement Table */}
                <h3 className="font-bold text-gray-700 my-5">{college.name} {PlacementStats?.title}</h3>
                <div className="overflow-hidden border border-gray-300 rounded-xl">
                    <table className="w-full text-left border-collapse ">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-300">
                                <th className="p-4 text-sm font-bold border-r border-gray-300 tracking-wider">Metric</th>
                                <th className="p-4 text-sm font-bold tracking-wider">Details ({PlacementStats?.degree || 'UG'})</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300 text-sm">
                            <tr className=" transition-colors items-center">
                                <td className="p-4 flex gap-3 font-medium border-r border-gray-300">Highest Package</td>
                                <td className="p-4 font-medium text-gray-500">{PlacementStats?.highest_package || 'N/A'}</td>
                            </tr>
                            <tr className=" transition-colors items-center">
                                <td className="p-4 flex gap-3 font-medium border-r border-gray-300">Average Package</td>
                                <td className="p-4 font-medium text-gray-500">{PlacementStats?.average_package || 'N/A'}</td>
                            </tr>
                            <tr className=" transition-colors items-center">
                                <td className="p-4 flex gap-3 font-medium border-r border-gray-300">Median Package</td>
                                <td className="p-4 font-medium text-gray-500">{PlacementStats?.median_package || 'N/A'}</td>
                            </tr>
                            <tr className=" transition-colors items-center">
                                <td className="p-4 flex  gap-3 font-medium border-r border-gray-300">Placement Year</td>
                                <td className="p-4 font-medium text-gray-500">{PlacementStats?.year || '2024'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <h3 className="font-bold text-gray-700 my-5">{college.name} Top Recruiters</h3>
                    <div className="flex flex-wrap gap-4">
                        {college.placements && college.placements.length > 0 && college.placements[0]?.top_recruiters?.map((recruiter: string, index: number) => (
                            <div key={index} className="px-2 py-1.5 lg:px-4 lg:py-2 bg-blue-100 border border-blue-300 rounded-bl rounded-full text-sm font-medium text-gray-700">
                                {recruiter}
                            </div>
                        ))}
                    </div>

                </div>

            </section>

            {/* 5. CUTOFF  */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} CutOffs 2026</h2>
                    <button onClick={() => handleViewAll('cutoffs')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View Cutoff Details <ChevronRight size={16} />
                    </button>
                </div>

                {(() => {
                    // Access the nested cutoff data structure: department → streams → blocks
                    const cutoffRecords = college.cutoffs?.[0]?.cutoff_data as unknown as Array<{
                        department: string;
                        streams: Array<{
                            stream_name: string;
                            exam: string;
                            blocks: Array<{
                                year: string;
                                title: string;
                                content: string;
                                category: Array<{ name: string; rank: string }>;
                            }>;
                        }>;
                    }> || [];

                    const firstDepartment = cutoffRecords[0];
                    const firstStream = firstDepartment?.streams?.[0];
                    const firstBlock = firstStream?.blocks?.[0];

                    if (!firstBlock) {
                        return (
                            <p className="text-gray-600 mb-6 text-sm lg:text-md leading-relaxed">
                                {cutoffPara || `The cutoff ranks for ${college.name} are determined based on entrance exam difficulty and seat availability.`}
                            </p>
                        );
                    }

                    return (
                        <>
                            <p className="text-gray-600 mb-6 text-sm lg:text-md leading-relaxed">
                                {firstBlock.content}
                            </p>

                            <div className="overflow-x-auto rounded-xl border border-gray-300">
                                <div className="px-6 py-3 bg-slate-50 border-b border-gray-300">
                                    <h3 className="text-sm font-bold text-slate-700">{firstStream.stream_name} - Cutoff Ranks</h3>
                                </div>
                                <table className="w-full text-left border-collapse">
                                    <tbody>
                                        {firstBlock.category?.slice(0, 3).map((cat, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors border-b border-gray-100 last:border-b-0">
                                                <td className="px-6 py-4 text-sm font-semibold text-slate-700">
                                                    {cat.name}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-200">
                                                        Rank: {cat.rank}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    );
                })()}
            </section>

            {/* SCHOLARSHIP */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} Scholarships</h2>
                    <button onClick={() => handleViewAll('scholarship')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View Scholarship Details <ChevronRight size={16} />
                    </button>
                </div>

                {scholarshipPara && <p className="text-gray-600 mb-6 text-sm lg:text-md">{scholarshipPara}</p>}

                <div className="overflow-x-auto rounded-xl border border-gray-300">
                    <table className="w-full text-left text-sm lg:text-md">
                        <thead>
                            <tr className="bg-slate-50 border-b border-gray-300">
                                <th className="px-4 py-3 text-sm font-bold border-r border-gray-300">Scholarship Name</th>
                                <th className="px-4 py-3 text-sm font-bold border-r border-gray-300">Based on</th>
                                <th className="px-4 py-3 text-sm font-bold border-r border-gray-300">Eligibility</th>
                                <th className="px-4 py-3 text-sm font-bold">Benefit</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {college.scholarships && college.scholarships.length > 0 ? (
                                college.scholarships.slice(0, 5).flatMap((sch) => {
                                    const schDataArray = Array.isArray(sch.scholarship_data)
                                        ? sch.scholarship_data
                                        : [];

                                    return schDataArray.slice(0, 5).map((schData: any, idx: number) => (
                                        <tr key={`${sch.id}-${idx}`} className="hover:bg-gray-50 transition-colors border-b border-gray-300 last:border-b-0">
                                            <td className="px-4 py-3 border-r border-gray-300 ">
                                                <p className="w-50 font-medium text-gray-800">{schData.name}</p>
                                            </td>
                                            <td className="px-4 py-3 border-r border-gray-300">
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded uppercase">
                                                    {schData.type || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 w-50 border-r border-gray-300 text-sm text-gray-600">
                                                <p className='w-50'>{schData.eligibility}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium text-blue-600">
                                                <p className='w-40'>{schData.amount_desc || schData.amount}</p>
                                            </td>
                                        </tr>
                                    ));
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-400">
                                        <p className="text-sm italic">No scholarship data currently available for {college.name}.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* RANKING */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} Rankings</h2>
                    <button onClick={() => handleViewAll('ranking')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View All Rankings <ChevronRight size={16} />
                    </button>

                </div>
                <p className="text-gray-600 mb-6 text-sm lg:text-md leading-relaxed">{rankingPara || `Rankings reflect ${college.name}'s academic excellence and reputation in engineering and technology education.`}</p>

                <div className="space-y-4">
                    {/* 1. Safely access the first record and the JSON data */}
                    {(() => {
                        const rankingData = (college.rankings?.[0]?.rank_data as unknown as Array<{ org: string; data: Array<{ year: number; rank: number | null; score?: string; stream: string; desc?: string }> }>) || [];

                        // Flatten all ranking data and get latest entries
                        const allRankings = rankingData.flatMap(orgItem =>
                            (orgItem.data || []).map(dataItem => ({
                                org: orgItem.org,
                                ...dataItem
                            }))
                        );

                        const latestRankings = allRankings
                            .filter(item => item.rank !== null) // Only show ranked items in overview
                            .sort((a, b) => Number(b.year) - Number(a.year))
                            .slice(0, 3);

                        if (latestRankings.length === 0) {
                            return <p className="text-gray-400 text-center py-4 italic">No rankings available.</p>;
                        }

                        return latestRankings.map((item, idx) => (
                            <div key={idx} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 flex justify-between items-center group hover:bg-white hover:border-blue-100 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-center justify-center w-10 h-10 bg-white rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <span className="text-[10px] uppercase font-bold opacity-60">Rank</span>
                                        <span className="text-md lg:text-lg font-medium leading-none">#{item.rank}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm lg:text-md font-medium text-gray-800">{item.org}</h4>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
                                            {item.stream} • {item.year}
                                        </p>
                                    </div>
                                </div>
                                {item.score && (
                                    <div className="text-right">
                                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                            Score: {item.score}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ));
                    })()}
                </div>


            </section>

            {/* GALLERY */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} Gallery</h2>
                    <button onClick={() => handleViewAll('gallery')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View All Images <ChevronRight size={16} />
                    </button>
                </div>
                <p className="text-sm lg:text-md text-gray-600">{galleryPara || ""}</p>
                <div className="space-y-10">
                    {college.images?.map((cat) => {
                        // Cast the JSON array correctly
                        const items = cat.media_url as unknown as GalleryMedia[];

                        return (
                            <div key={cat.id} className="bg-white mt-3 rounded-3xl ">
                                <h3 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
                                    {cat.category}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {items.slice(0, 4)?.map((item, index) => (
                                        <div key={index} className="group relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-200">

                                            {/* Render Image or Video Thumbnail */}

                                            {/* <img
                                                                src={item.type === 'video' ? item.thumbnail : item.url}
                                                                alt={item.caption}
                                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            /> */}

                                            {/* Play Icon Overlay for Videos */}
                                            {item.type === 'video' && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                    <div className="bg-white/90 p-3 rounded-full text-blue-600 shadow-xl">
                                                        <Icons.Play size={24} fill="currentColor" />
                                                    </div>
                                                </div>
                                            )}

                                            {/* Caption Hover Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                <p className="text-white text-xs font-semibold leading-tight">
                                                    {item.caption}
                                                </p>
                                                <span className="text-[10px] text-blue-300 font-bold uppercase mt-1">
                                                    {item.type}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CAMPUS */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">{college.name} Campus Facilities</h2>
                    <button onClick={() => handleViewAll('campus')} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                        View Campus Details <ChevronRight size={16} />
                    </button>
                </div>

                {/* Use the description from your JSON if campuspara isn't available */}
                <div className="mb-8 ">
                    <p className="text-gray-600 leading-relaxed text-sm lg:text-md md:text-base">
                        {campusPara || facilityData?.description || 'Details about campus infrastructure will be available soon.'}
                    </p><br />
                    <h3 className="text-md lg:text-lg font-bold text-gray-800 mb-3">{facilityData?.title || "Campus Infrastructure & Student Amenities"}</h3>

                    <p className="text-sm lg:text-md text-gray-600 leading-relaxed md:text-base">
                        {facilityData?.description || campusPara || 'Detailed information about the SRMIST campus infrastructure and student amenities.'}
                    </p>
                </div>
                <div className="mt-4 lg:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-4">
                    {/* We slice(0, 8) to show a good variety in the overview */}
                    {facilityList.slice(0, 8).map((facility, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-2 lg:p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all group"
                        >
                            <div className="bg-white p-3 rounded-xl shadow-sm mb-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <IconComponent name={facility.icon} />
                            </div>

                            <h4 className="font-semibold text-gray-700 text-xs md:text-sm">
                                {facility.name}
                            </h4>
                        </div>
                    ))}
                </div>

                {facilityList.length === 0 && (
                    <p className="text-center text-gray-400 py-10 italic">Facility data not found.</p>
                )}
            </section>

            {/* NEWS */}

            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-md lg:text-xl font-bold">Latest Updates & News</h2>
                    <button
                        onClick={() => handleViewAll('news')}
                        className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        View All News <ChevronRight size={16} />
                    </button>
                </div>

                <div className="space-y-4">
                    {college.news && college.news.length > 0 ? (
                        college.news.slice(0, 3).map((item) => {
                            // Cast the JSON data for this specific news record
                            const data = item.news_data as unknown as NewsContent;

                            return (
                                <div key={item.id} className="group flex gap-4 rounded-xl my-4 hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                    {/* Date Badge */}
                                    <div className="shrink-0 w-16 h-16 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-blue-600">
                                        <span className="text-md lg:text-lg font-bold leading-none">
                                            {new Date(item.published_date).getDate()}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase">
                                            {new Date(item.published_date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            {data.is_breaking && (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full animate-pulse">
                                                    <div className="w-1 h-1 bg-red-600 rounded-full"></div> Breaking
                                                </span>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {data.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {data.content}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="py-10 text-center border-2 border-dashed border-slate-50 rounded-2xl">
                            <p className="text-slate-400 text-sm italic">No recent updates available for this college.</p>
                        </div>)}
                </div>
            </section>

            {/* Q & A */}
            <section className="bg-white p-3 lg:p-8 rounded-2xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-md lg:text-xl font-bold">Q&A</h2>
                </div>
                <div className="bg-white my-3 rounded-2xl">
                    <div className="space-y-4">
                        {overviewFAQs.length > 0 ? (
                            overviewFAQs.map((item, idx) => (
                                <details
                                    key={idx}
                                    className="group bg-slate-50 rounded-xl border border-transparent hover:border-blue-100 transition-all">
                                    <summary className="list-none flex items-center justify-between p-2 cursor-pointer outline-none">
                                        <p className="font-bold text-sm text-gray-800 flex items-start gap-3">
                                            {item.q || 'FAQ Question'}</p>
                                        <Icons.Plus
                                            size={16}
                                            className="text-blue-500 transition-transform group-open:rotate-45" />
                                    </summary>
                                    <div className="px-4 pb-4 ml-7 animate-in fade-in slide-in-from-top-1">
                                        <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
                                            {item.a || 'FAQ Answer'} </p>
                                    </div>
                                </details>
                            ))
                        ) : (
                            <p className="text-gray-400 italic text-center py-4">No FAQs available.</p>)}
                    </div>
                </div>
            </section>

        </div>
    );
};
