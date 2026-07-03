'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, ChevronLeft, ChevronRight, HeartPulse, PencilRuler, Stethoscope, TestTubes, Palette, Utensils, GraduationCap, Building2, Laptop, Microscope, BookOpen } from 'lucide-react';

interface Course {
    id: number;
    name: string;
    short_name: string;
    slug: string;
    colleges: {
        id: number;
        name: string;
        logo_url: string | null;
    }[];
}

interface StreamData {
    courses: Course[];
}

// Display label → DB stream values to merge
const STREAM_GROUPS: { label: string; icon: any; dbValues: string[] }[] = [
    { label: 'Engineering',         icon: PencilRuler,      dbValues: ['Engineering', 'Technology', 'Computer Science', 'Information Technology'] },
    { label: 'Management',          icon: BriefcaseBusiness,dbValues: ['Management', 'Business', 'MBA', 'Commerce', 'Finance', 'Economics'] },
    { label: 'Computer Science',    icon: Laptop,           dbValues: ['Computer Science', 'Computer Applications', 'BCA', 'MCA'] },
    { label: 'Pharmacy',            icon: HeartPulse,       dbValues: ['Pharmacy', 'Pharmaceutical Sciences'] },
    { label: 'Physiotherapy',       icon: HeartPulse,       dbValues: ['Physiotherapy', 'Physical Therapy', 'Rehabilitation'] },
    { label: 'Arts & Science',      icon: TestTubes,        dbValues: ['Science', 'Arts', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Humanities', 'Liberal Arts'] },
    { label: 'Education',           icon: GraduationCap,    dbValues: ['Education', 'Teaching', 'B.Ed'] },
    { label: 'Law',                 icon: BookOpen,         dbValues: ['Law', 'Legal Studies', 'LLB'] },
];

export default function StreamSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [selectedGroup, setSelectedGroup] = useState(STREAM_GROUPS[0]);
    const [streamData, setStreamData] = useState<StreamData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStreamData = async () => {
            setLoading(true);
            try {
                const param = encodeURIComponent(selectedGroup.dbValues.join(','));
                const response = await fetch(`/api/streams/${param}`);
                const data = await response.json();
                setStreamData(data);
            } catch (error) {
                console.error('Error fetching stream data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStreamData();
    }, [selectedGroup]);

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -250, behavior: 'smooth' });
    const scrollRight = () => scrollRef.current?.scrollBy({ left: 250, behavior: 'smooth' });

    return (
        <section className="relative overflow-hidden bg-linear-to-tr from-[#0B6AF3] to-[#1C4FD9] max-w-387 mx-auto p-6 md:px-6 mb-8">
            <img
                src="/streams.svg"
                alt="streams"
                className="absolute inset-0 scale-115 w-full h-full object-cover pointer-events-none select-none"
            />
            <div className="relative z-10 mx-auto max-w-385 ">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-wide text-white md:text-[43px]">
                        Explore Courses By Stream
                    </h2>
                    <p className="mx-auto mt-4 max-w-3xl text-sm italic leading-7 text-white/85 md:text-base">
                        Here's Why Thousands Of Students And Parents Trust CollegeSenior
                        For A Stress-Free Admission Journey — With Expert Guidance,
                        Personal Attention, And Reliable Support.
                    </p>
                </div>

                {/* Stream Tabs */}
                <div className="my-6 relative flex justify-center items-center h-13">
                    {/* Left Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0057ff]"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    {/* Scrollable Tabs */}
                    <div
                        ref={scrollRef}
                        className="flex w-[75%] md:w-[85%] lg:w-[90%] mx-auto text-center lg:justify-center items-center gap-6 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide h-10"
                    >
                        {STREAM_GROUPS.map((group, index) => {
                            const isActive = group.label === selectedGroup.label;
                            const Icon = group.icon;
                            return (
                                <div key={group.label}>
                                    <button
                                        onClick={() => setSelectedGroup(group)}
                                        className={`relative flex shrink-0 items-center gap-2 pb-1.5 text-sm font-medium md:text-base transition-colors ${isActive ? 'text-white' : 'text-white/85 hover:text-white'}`}
                                    >
                                        <Icon size={18} />
                                        <span>{group.label}</span>
                                        {isActive && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-white"></div>
                                        )}
                                    </button>
                                    {index < STREAM_GROUPS.length - 1 && (
                                        <div className="h-6 w-0.5 shrink-0 bg-white/40 -ml-3 -mt-7" />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-[#0057ff]"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Highlight Banner */}
                <div className="mt-6 flex flex-col md:block md:text-center md:w-full items-start justify-evenly gap-4 rounded-xl bg-white/13 px-5 py-5 backdrop-blur-md">

                    <p className="text-lg font-medium text-white md:text-xl lg:text-2xl leading-7">
                        Right Now You Are Seeing Top/Popular Courses Of {selectedGroup.label}
                    </p>
                    <div className='flex flex-row md:block w-full justify-between items-center'>

                        <p className="mt-2 text-sm text-white/80 md:text-base md:my-3">
                            To know more about other courses explore the whole catalog of courses
                        </p>

                        <div className='block md:hidden bg-white rounded-full p-1 text-[#0057ff]'>
                            <Link
                                href="/courses"
                            >
                                <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                    <Link
                        href="/courses"
                        className="hidden md:block w-50 mx-auto lg:mt-4 rounded-xl bg-white px-8 py-3 text-sm font-semibold text-[#0057ff] transition hover:scale-105 whitespace-nowrap"
                    >
                        Explore all courses
                    </Link>
                </div>

                {/* Course Cards Grid */}
                <div
                    className="mt-10 grid grid-rows-2 grid-flow-col auto-cols-[85%] sm:auto-cols-[48%] md:auto-cols-[45%] xl:grid-rows-none xl:grid-flow-row xl:auto-cols-auto xl:grid-cols-3 gap-x-5 gap-y-5 overflow-x-auto xl:overflow-visible snap-x snap-mandatory " >
                    {loading ? (
                        // Loading skeleton
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-4 bg-white/20 rounded mb-3"></div>
                                <div className="h-16 bg-white/20 rounded mb-3"></div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                                </div>
                            </div>
                        ))
                    ) : (
                        streamData?.courses.slice(0, 6).map((course, index) => (
                            <Link
                                key={course.id}
                                href={`/courses?search=${encodeURIComponent(course.short_name || course.name)}`}
                                className=" relative group block cursor-pointer snap-center">
                                {/* Top Line */}
                                <div className="absolute left-14 top-4 h-px w-[80%] bg-linear-to-r from-white to-transparent" />

                                {/* Number */}
                                <div className="relative z-10 inline-block pr-3 text-2xl md:text-3xl font-medium mb-3 text-white">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Title */}
                                <h4 className="text-[20px] font-medium leading-tight text-white group-hover:text-yellow-300 transition-colors">
                                    {course.name}
                                </h4>

                                {/* Colleges */}
                                <div className="mb-3 flex flex-wrap items-center gap-3 mt-1.5">
                                    <span className="text-sm text-white/85">
                                        Colleges Offering this Course -
                                    </span>
                                    <div className="flex items-center -space-x-3">
                                        {course.colleges.slice(0, 3).map((college) => (
                                            <Image
                                                key={college.id}
                                                src={college.logo_url || '/placeholder-logo.svg'}
                                                alt={`${college.name} Logo`}
                                                width={32}
                                                height={32}
                                                className="rounded-full w-10 h-10 object-contain bg-white"
                                            />
                                        ))}
                                        {course.colleges.length > 3 && (
                                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs text-white font-medium">
                                                +{course.colleges.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
