'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import * as Icons from "lucide-react";
import {
    MapPin, Download
} from 'lucide-react';
import { SectionBlock, FacilityJSON, CollegeCourseData } from './_components/types';
import Header from '@/app/components/Header';
import { CollegeWithRelations } from './_components/types';
import Footer from '@/app/components/Footer';
import { useScrollTrigger } from '@/app/hooks/useScrollTrigger';
// import { Prisma } from '@prisma/client';
import { OverviewTab } from './_components/OverviewTab';
import ScholarshipTab from './_components/ScholarshipTab';
import NewsTab from './_components/NewsTab';
import CampusTab from './_components/CampusTab';
import RankingTab from './_components/RankingTab';
import CutoffTab from './_components/CutoffTab';
import PlacementTab from './_components/PlacementTab';
import AdmissionTab from './_components/AdmissionTab';
import CourseFeeTabNew from './_components/CourseFeeTab-new';
import TopCoursesSection from './_components/TopCoursesSection';
import SimilarCollegesSection from './_components/SimilarCollegesSection';
import TableOfContents from './_components/TableOfContents';
import EnquiryFormModal from '@/app/components/EnquiryFormModal';
import TabEnquiryForm from '@/app/components/TabEnquiryForm';

interface SimilarCollege {
    id: number;
    name: string;
    slug: string;
    city: string;
    state: string;
    logo_url?: string | null;
    nirf_ranking?: number | null;
    ownership?: string | null;
}

export default function CollegeClientView({ college, similarColleges }: { college: CollegeWithRelations; similarColleges: SimilarCollege[] }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const courseId = searchParams.get('courseId');
    const [hasShownModal, setHasShownModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTabFormOpen, setIsTabFormOpen] = useState(false);
    const [currentTabForm, setCurrentTabForm] = useState('');
    const { isTriggered, hasSubmitted } = useScrollTrigger(0.7);

    // Detect active tab from URL query params
    const getActiveTabFromURL = () => {
        if (searchParams.has('courseId')) return 'courses'; // Course detail view
        if (searchParams.has('courses') || searchParams.has('fees')) return 'courses';
        if (searchParams.has('admission')) return 'admission';
        if (searchParams.has('placements')) return 'placements';
        if (searchParams.has('cutoffs')) return 'cutoffs';
        if (searchParams.has('scholarship')) return 'scholarship';
        if (searchParams.has('ranking')) return 'ranking';
        if (searchParams.has('gallery')) return 'gallery';
        if (searchParams.has('campus')) return 'campus';
        if (searchParams.has('news')) return 'news';

        return 'overview';
    };

    const [activeTab, setActiveTab] = useState(getActiveTabFromURL());

    // Show modal on 70% scroll, but not on course detail view
    useEffect(() => {
        if (isTriggered && !hasShownModal && !courseId && !hasSubmitted) {
            setIsModalOpen(true);
            setHasShownModal(true);
        }
    }, [isTriggered, hasShownModal, courseId, hasSubmitted]);

    // Function to open tab-specific enquiry form
    const openTabEnquiryForm = (tabName: string) => {
        setCurrentTabForm(tabName);
        setIsTabFormOpen(true);
    };

    const hiddenFields = {
        collegeId: college.id.toString(),
        collegeName: college.name
    };



    // Update URL when tab changes (but not when courseId changes)
    useEffect(() => {
        const currentCourseId = searchParams.get('courseId');
        const tabToURLMap: Record<string, string> = {
            'overview': pathname,
            'courses': currentCourseId ? `${pathname}?courses&fees&courseId=${currentCourseId}` : `${pathname}?courses&fees`,
            'admission': `${pathname}?admission`,
            'placements': `${pathname}?placements`,
            'cutoffs': `${pathname}?cutoffs`,
            'scholarship': `${pathname}?scholarship`,
            'ranking': `${pathname}?ranking`,
            'gallery': `${pathname}?gallery`,
            'campus': `${pathname}?campus`,
            'news': `${pathname}?news`,

        };
        const targetURL = tabToURLMap[activeTab] || pathname;
        const currentURL = window.location.search;
        if (currentURL !== targetURL.split('?')[1]) {
            router.push(targetURL, { scroll: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab, pathname, router]);

    // Scroll to course on mount if courseId exists
    useEffect(() => {
        if (courseId) {
            setTimeout(() => {
                const element = document.getElementById(`course-${courseId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        }
    }, [courseId]);

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'courses', label: 'Courses & Fees' },
        { id: 'admission', label: 'Admission' },
        { id: 'placements', label: 'Placements' },
        { id: 'cutoffs', label: 'CutOffs' },
        { id: 'scholarship', label: 'Scholarship' },
        { id: 'ranking', label: 'Ranking' },
        { id: 'gallery', label: 'Gallery' },
        { id: 'campus', label: 'Campus' },
        { id: 'news', label: 'News' },

    ];

    // Handle tab change with scroll to top
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        // Scroll to show table of contents (just below sticky nav)
        setTimeout(() => {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                const headerHeight = 80; // Header height
                const navHeight = 60; // Sticky nav height
                const padding = 20; // Extra padding
                const targetPosition = mainContent.offsetTop - headerHeight - navHeight - padding;

                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }, 150);
    };

    const contentSections = (college.structured_data as unknown as SectionBlock[]) || [];
    const getSectionContent = (term: string) => {
        return contentSections.find(item =>
            item.title.toLowerCase().includes(term.toLowerCase())
        )?.content || "";
    };

    // Data Extractions
    const coursePara = getSectionContent("courses");
    const admissionPara = getSectionContent("admission");
    const placementPara = getSectionContent("placement");
    const cutoffPara = getSectionContent("cutoff");
    const scholarshipPara = getSectionContent("scholarship");
    const rankingPara = getSectionContent("ranking");
    const galleryPara = getSectionContent("gallery");
    const campusPara = getSectionContent("campus");

    // Table of Contents sections for each tab
    const getTableOfContents = (tabId: string): string[] => {
        const sections: Record<string, string[]> = {
            overview: [
                `About ${college.name}`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            courses: [
                `${college.name} Courses & Fees 2026`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            admission: [
                `${college.name} Admission Overview`,
                `Step-by-Step Admission Process 2026`,
                `Admission FAQs`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            placements: [
                `${college.name} Placement Details`,
                `Placement Statistics`,
                `Top Recruiters`,
                `Placement Process`,
                `Placement FAQs`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            cutoffs: [
                `${college.name} Cutoff Trends`,
                `Cutoff Details`,
                `Cutoff FAQs`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            scholarship: [
                `${college.name} Scholarship Details`,
                `Scholarship FAQs`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            ranking: [
                `${college.name} Ranking Details`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            campus: [
                `${college.name} Campus Life`,
                `Campus Facilities`,
                `Campus FAQs`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ],
            news: [
                `${college.name} Latest News & Updates`,
                `Top Courses Offered at ${college.name}`,
                `More Colleges in ${college.city}`
            ]
        };
        return sections[tabId] || [];
    };


    interface GalleryMedia {
        type: 'image' | 'video';
        url: string;
        caption: string;
        thumbnail?: string; // Only used for videos
    }


    return (
        <div className="bg-gray-100 min-h-screen m-0 p-0">
            <Header />

            {/* 1. HERO SECTION */}
            <section className="bg-white px-3 md:px-6 lg:px-8">
                <div className="max-w-450 mx-auto flex flex-col-reverse lg:flex-row items-stretch">

                    {/* LEFT SIDE */}
                    <div className="w-full lg:w-3/5 flex flex-col justify-center py-4 md:py-6 lg:py-8">

                        {/* TOP BAR */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <nav className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">
                                Home / Colleges / {college.slug}
                            </nav>
                        </div>

                        {/* COLLEGE INFO */}
                        <div className='flex flex-row-reverse justify-between'>

                            {/* LOGO */}
                            <div className="flex gap-2 items-center mx-3">
                                <span className="bg-blue-600 text-white text-[10px] md:text-xs px-3 md:px-4 py-1 rounded-md uppercase">
                                    {college.ownership}
                                </span>

                                <span className="bg-amber-100 text-amber-700 text-[10px] md:text-xs px-3 md:px-4 py-1 rounded-md flex items-center gap-1">
                                    NIRF RANK {college.nirf_ranking}
                                </span>
                            </div>
                            <div className="w-15 h-15 md:w-24 md:h-24 p-2 bg-white rounded-full shrink-0 shadow-sm">
                                <Image
                                    src={college.logo_url || "/avit.png"}
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-left sm:items-start gap-4 md:gap-6 mb-4 text-left sm:text-left">

                            {/* TEXT */}
                            <div>
                                <h1 className="text-slate-900 text-left">
                                    {college.name}
                                </h1>

                                <p className="flex items-center justify-left sm:justify-start gap-2 text-gray-500 text-sm md:text-base mt-1">
                                    <MapPin size={16} className="text-blue-600" />
                                    {college.city}, {college.state}
                                </p>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-wrap justify-left sm:justify-start gap-3">
                            <button className="px-2 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm md:text-base font-medium hover:bg-slate-50 flex items-left gap-2">
                                <Download size={16} />
                                Download Brochure
                            </button>
                        </div>
                    </div>

                    {/* RIGHT SIDE (IMAGE) */}
                    <div className="w-full lg:w-2/5 bg-gray-50 lg:m-3 flex items-center justify-center overflow-hidden">
                        <Image
                            src={college.banner_url || "/avit.png"}
                            alt="Campus"
                            width={1000} height={600}
                            className="w-full h-55 md:h-75 lg:h-full object-cover rounded-lg"
                            priority
                        />
                    </div>

                </div>
            </section>

            {/* 2. STICKY NAV */}
            <nav className="max-w-365 mx-auto sticky top-17 z-30 bg-white border-y border-gray-300 overflow-x-auto no-scrollbar">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex gap-12 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`py-3 text-sm font-medium whitespace-nowrap border-b-4 transition-all ${activeTab === tab.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-blue-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </nav>

            {/* 3. CONTENT AREA */}
            <main className="max-w-360 mx-auto px-2 py-2 lg:px-4 lg:py-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-3/4 space-y-3">

                    {/* --- TAB: OVERVIEW --- */}
                    {activeTab === 'overview' && (
                        <>
                            <TableOfContents sections={getTableOfContents('overview')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3 lg:mb-6">
                                <div className="lg:flex lg:justify-between lg:items-center md:text-left lg:text-left md:flex md:justify-between md:items-center text-center">
                                    <div>
                                        <h3 className="font-semibold text-blue-900 my-2">Get Complete College Information</h3>
                                        <p className="text-blue-700 text-sm ">Get detailed overview, admission process, and expert guidance</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Overview')}
                                        className="bg-blue-600 text-white text-sm m-3 text-center px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        Get Details
                                    </button>
                                </div>
                            </div>
                            <div id="about-college">
                                <OverviewTab college={college} setActiveTab={setActiveTab} />
                            </div>
                            <div id="top-courses-offered-at-college">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in-city">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* --- TAB: COURSES (FULL LIST) --- */}
                    {activeTab === 'courses' && (
                        <>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-2 lg:p-4 mb-3 lg:mb-6">
                                <div className="text-center justify-center lg:flex lg:justify-between items-center">
                                    <div>
                                        <h3 className="text-md font-medium text-green-900">Get Course & Fee Details</h3>
                                        <p className="text-green-700 text-xs m-2">Get complete course information, fees structure, and admission guidance</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Courses & Fees')}
                                        className="text-sm lg:text-md bg-green-600 text-white m-1 p-1.5 lg:px-4 lg:py-2 rounded-lg font-medium hover:bg-green-700 transition"
                                    >
                                        Get Details
                                    </button>
                                </div>
                            </div>
                            {/* <TableOfContents sections={getTableOfContents('courses')} collegeName={college.name} /> */}
                            <section className="rounded-2xl" id="courses-fees-2026">
                                <CourseFeeTabNew
                                    courseOfferings={college.course_offerings.map((offering: any) => ({
                                        ...offering,
                                        course: {
                                            ...offering.course,
                                            level: offering.course.level ?? undefined,
                                            avg_salary: offering.course.avg_salary ?? undefined
                                        },
                                        collegecourse_data: offering.collegecourse_data as CollegeCourseData | null
                                    }))}
                                    collegeName={college.name}
                                    coursePara={coursePara}
                                    highlightedCourseId={courseId ? Number(courseId) : null}
                                    faqs={college.faqs?.[0]?.faq_data as Array<{ category: string; questions: Array<{ q: string; a: string }> }> | undefined}
                                />
                            </section>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB : ADDMISSION */}
                    {activeTab === 'admission' && (
                        <>
                            <TableOfContents sections={getTableOfContents('admission')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3 lg:mb-6">
                                <div className="text-center lg:flex lg:justify-between lg:text-left lg:items-center">
                                    <div>
                                        <h3 className="text-sm lg:text-md font-semibold text-purple-900 m-2">Get Admission Guidance</h3>
                                        <p className="text-purple-700 text-sm m-2">Get step-by-step admission process and expert counseling</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Admission')}
                                        className="bg-purple-600 text-white p-1.5 lg:px-4 lg:py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                                    >
                                        Get Guidance
                                    </button>
                                </div>
                            </div>
                            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm" id="admission-overview">
                                <h2 className="text-md lg:text-xl font-bold mb-3">{college.name} Admission Process</h2>
                                <p className="text-gray-600 mb-3 text-sm lg:text-md">{admissionPara}</p>
                                <div id="step-by-step-admission-process-2026">
                                    <AdmissionTab admissions={college.admissions as unknown as Array<{ id: number; college_id: number; admission_data: Array<{ degree_level: string; streams: Array<{ stream_name: string; courses: Array<{ course_title: string; content: string; duration: string; fees: string; seats: string; eligibility: string; entrance_exam: string; selection_process: string; cutoff_info: string }> }> }>; admission_process?: Array<{ step: number; title: string; content: string }> }>} collegeName={college.name} admissionPara={admissionPara} faqs={college.faqs?.[0]?.faq_data as unknown as Array<{ category: string; questions: Array<{ q: string; a: string }> }>} />
                                </div>
                            </section>
                            <div id="admission-faqs">
                                {/* FAQs are handled within AdmissionTab */}
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB: PLACEMENTS */}
                    {activeTab === 'placements' && (
                        <>
                            <TableOfContents sections={getTableOfContents('placements')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-3 lg:mb-6">
                                <div className="lg:flex lg:justify-between lg:items-center lg:text-left md:flex md:justify-between md:items-center md:text-left text-center">
                                    <div>
                                        <h3 className="font-semibold text-orange-900 mb-3">Get Placement Details</h3>
                                        <p className="text-orange-700 text-sm mb-3">Get complete placement statistics, top recruiters, and career guidance</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Placements')}
                                        className="bg-orange-600 text-white text-sm lg:text-md p-1.5 lg:px-4 lg:py-2 rounded-lg font-medium hover:bg-orange-700 transition"
                                    >
                                        Get Details
                                    </button>
                                </div>
                            </div>
                            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm" id="placement-details">
                                <h2 className="text-md lg:text-2xl font-bold mb-6">{college.name} Placement Details</h2>
                                <p className="text-sm lg:text-md text-gray-600 mb-5">{placementPara}</p>
                                <div id="placement-statistics">
                                    <PlacementTab
                                        placements={college.placements as unknown as Array<{ id: number; college_id: number; placement_data: Array<{ title: string; content: string; objectives_title: string; objectives: string[]; process_title: string; placement_process: Array<{ step: string; name: string; desc: string }> }> }>}
                                        collegeName={college.name}
                                        faqs={college.faqs?.[0]?.faq_data as unknown as Array<{ category: string; questions: Array<{ q: string; a: string }> }>}
                                    />
                                </div>
                            </section>
                            <div id="top-recruiters">
                                {/* Top recruiters are handled within PlacementTab */}
                            </div>
                            <div id="placement-process">
                                {/* Placement process is handled within PlacementTab */}
                            </div>
                            <div id="placement-faqs">
                                {/* FAQs are handled within PlacementTab */}
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB: CUTOFFS */}
                    {activeTab === 'cutoffs' && (
                        <>
                            <TableOfContents sections={getTableOfContents('cutoffs')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-3 lg:mb-6">
                                <div className="lg:flex lg:justify-between lg:items-center lg:text-left md:flex md:justify-between md:items-center md:text-left text-center">
                                    <div>
                                        <h3 className="font-semibold text-red-900 mb-2">Get Cutoff Information</h3>
                                        <p className="text-red-700 text-sm mb-2">Get latest cutoff trends and admission probability analysis</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Cutoffs')}
                                        className="bg-red-600 text-white p-1.5 lg:px-4 lg:py-2 rounded-lg font-medium hover:bg-red-700 transition"
                                    >
                                        Get Details
                                    </button>
                                </div>
                            </div>
                            <section className="bg-white md:p-8 p-4 rounded-2xl shadow-sm" id="cutoff-trends">
                                <h2 className="text-md lg:text-2xl font-bold mb-6">{college.name} Cutoff Trends</h2>
                                <p className="text-gray-600 mb-6 text-sm lg:text-md">{cutoffPara}</p>
                                <div id="cutoff-details">
                                    <CutoffTab
                                        cutoffs={college.cutoffs as unknown as Array<{ id: number; college_id: number; course_id?: number; cutoff_data: Array<{ department: string; streams: Array<{ stream_name: string; exam: string; blocks: Array<{ year: string; title: string; content: string; category: Array<{ name: string; rank: string }> }> }> }> }>}
                                        collegeName={college.name}
                                        faqs={college.faqs?.[0]?.faq_data as unknown as Array<{ category: string; questions: Array<{ q: string; a: string }> }>}
                                    />
                                </div>
                            </section>
                            <div id="cutoff-faqs">
                                {/* FAQs are handled within CutoffTab */}
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB: SCHOLARSHIP */}
                    {activeTab === 'scholarship' && (
                        <>
                            <TableOfContents sections={getTableOfContents('scholarship')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3 lg:mb-6">
                                <div className="lg:flex lg:justify-between lg:items-center lg:text-left md:flex md:justify-between md:items-center md:text-left text-center">
                                    <div>
                                        <h3 className="font-semibold text-yellow-900 mb-3">Get Scholarship Information</h3>
                                        <p className="text-yellow-700 text-sm mb-3">Get complete scholarship details and application guidance</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Scholarship')}
                                        className="bg-yellow-600 text-white p-1.5 lg:px-4 lg:py-2 text-sm lg:text-md rounded-lg font-medium hover:bg-yellow-700 transition"
                                    >
                                        Get Details
                                    </button>
                                </div>
                            </div>
                            <section className="bg-white md:p-8 p-4 rounded-2xl shadow-sm" id="scholarship-details">
                                <h2 className="text-md lg:text-2xl font-bold mb-6">{college.name} Scholarship Details</h2>
                                <p className="text-gray-600 text-sm lg:text-md">{scholarshipPara || 'Scholarship details will be available soon. Please check back later for the latest information on scholarships offered.'}</p>
                                <ScholarshipTab scholarships={college.scholarships as unknown as Array<{ id: number; college_id: number; scholarship_data: Array<{ name: string; type: string; deadline: string; amount_desc: string; description: string; eligibility: string; amount_value: number }> }>} collegeName={college.name} faqs={college.faqs?.[0]?.faq_data as unknown as Array<{ category: string; questions: Array<{ q: string; a: string }> }>} />
                            </section>
                            <div id="scholarship-faqs">
                                {/* FAQs are handled within ScholarshipTab */}
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB: RANKING */}
                    {activeTab === 'ranking' && (
                        <>
                            <TableOfContents sections={getTableOfContents('ranking')} collegeName={college.name} currentCity={college.city} />
                            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3 lg:mb-6">
                                <div className="lg:flex lg:justify-between lg:items-center lg:text-left md:flex md:justify-between md:items-center md:text-left text-center">
                                    <div>
                                        <h3 className="font-semibold text-indigo-900 mb-3">Get Ranking Analysis</h3>
                                        <p className="text-indigo-700 text-sm mb-3">Get detailed ranking analysis and college comparison</p>
                                    </div>
                                    <button
                                        onClick={() => openTabEnquiryForm('Ranking')}
                                        className="bg-indigo-600 text-white p-1.5 lg:px-4 lg:py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                                    >
                                        Get Analysis
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 animate-in fade-in duration-500" id="ranking-details">
                                <section className="bg-white md:p-8 p-4 rounded-2xl shadow-sm">
                                    <h2 className="text-md md:text-2xl font-bold mb-6">{college.name} Ranking Details</h2>
                                    <p className="text-gray-600 my-6 text-sm md:text-md">{rankingPara}</p>
                                    <RankingTab
                                        rankings={college.rankings?.flatMap((record: any) =>
                                            record.rank_data as unknown as Array<{ org: string; data: Array<{ year: number; rank: number | null; score?: string; stream: string; desc?: string }> }>
                                        ) || []}
                                        collegeName={college.name}
                                        collegeNirfRank={college.nirf_ranking}
                                        structuredData={college.rankings?.[0]?.structured_data as unknown as { current_year?: number; prev_year?: number; intro_template?: string; comparison_template?: string } | undefined}
                                    />
                                </section>
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}


                    {/* --- TAB: GALLERY (FULL LIST) --- */}
                    {activeTab === 'gallery' && (
                        <div className="space-y-10">
                            {college.images?.map((cat: any) => {
                                // Cast the JSON array correctly
                                const items = cat.media_url as unknown as GalleryMedia[];

                                return (
                                    <div key={cat.id} className="bg-white p-4 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                                        <h2 className="text-md md:text-xl font-bold mb-6 text-gray-800 flex items-center gap-2 my-3">
                                            {college.name} Gallery
                                        </h2>
                                        <p className="text-gray-600 my-3 text-sm md:text-md">{galleryPara}</p>

                                        <h3 className="text-md md:text-lg font-bold text-gray-700 my-5">{college.name} {cat.category} Gallery</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {items.map((item, index) => (
                                                <div key={index} className="group relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-gray-100">

                                                    {/* Render Image or Video Thumbnail */}
                                                    {/* <img
                                                        src={item.type === 'image' ? item.thumbnail : item.url}
                                                        alt={item.caption}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    /> */}
                                                    {/* <video src=""></video> */}

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
                    )}

                    {/* TAB: CAMPUS */}
                    {activeTab === 'campus' && (
                        <>
                            <TableOfContents sections={getTableOfContents('campus')} collegeName={college.name} currentCity={college.city} />
                            <section className="bg-white p-3 lg:p-8 rounded-2xl shadow-sm" id="campus-life">
                                <h2 className="text-md lg:text-2xl font-bold mb-6">{college.name} Campus Life</h2>
                                <p className="text-gray-600 text-sm lg:text-md">{campusPara}</p>
                                <div id="campus-facilities">
                                    <CampusTab infrastructure={college.facilities[0] as unknown as { id: number; college_id: number; all_facilities: FacilityJSON; structured_data: Record<string, string | number> | null }} collegeName={college.name} faqs={college.faqs?.[0]?.faq_data as unknown as Array<{ category: string; questions: Array<{ q: string; a: string }> }>} />
                                </div>
                            </section>
                            <div id="campus-faqs">
                                {/* FAQs are handled within CampusTab */}
                            </div>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                    {/* TAB: NEWS */}
                    {activeTab === 'news' && (
                        <>
                            <TableOfContents sections={getTableOfContents('news')} collegeName={college.name} currentCity={college.city} />
                            <section className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm" id="latest-news-updates">
                                <h2 className="text-md lg:text-2xl font-bold mb-6">{college.name} Latest  News & Updates</h2>
                                <NewsTab news={college.news as unknown as Array<{ id: number; category: string; published_date: string | Date; news_data: { title: string; content: string; is_breaking?: boolean; image_url?: string } }>} collegeName={college.name} />
                            </section>
                            <div id="top-courses-offered-at">
                                <TopCoursesSection courses={college.course_offerings} collegeName={college.name} />
                            </div>
                            <div id="more-colleges-in">
                                <SimilarCollegesSection colleges={similarColleges} currentCity={college.city} />
                            </div>
                        </>
                    )}

                </div>

                {/* --- RIGHT SIDEBAR --- */}
                <aside className="lg:w-1/4">
                    <div className="bg-blue-600 rounded-xl mb-3 p-6 text-white sticky top-35">
                        <h3 className="text-lg font-bold mb-2">Get Admission Help</h3>
                        <p className="text-blue-100 text-sm mb-4">Get expert guidance for {college.name} admissions</p>
                        <div className="space-y-5">
                            <input type="text" placeholder="Your Name" className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 outline-none transition-all" />
                            <input type="tel" placeholder="Mobile No" className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 outline-none transition-all" />
                            <input type="tel" placeholder="Email" className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/10 text-white placeholder:text-blue-200 focus:bg-white focus:text-gray-900 outline-none transition-all" />
                            {/* <button className="w-full py-2 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all">Request Call Back</button> */}
                        </div>
                        <button

                            className="w-full py-3 mt-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all"
                        >
                            Request Callback
                        </button>
                    </div>
                </aside>
            </main>

            <Footer />
            <EnquiryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sourcePage="College View"
                hiddenFields={hiddenFields}
            />
            <TabEnquiryForm
                isOpen={isTabFormOpen}
                onClose={() => setIsTabFormOpen(false)}
                collegeName={college.name}
                tabName={currentTabForm}
            />
        </div>
    );
}
