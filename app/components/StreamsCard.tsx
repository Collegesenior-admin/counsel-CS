'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BriefcaseBusiness, ChevronLeft, ChevronRight, HeartPulse, PencilRuler, Stethoscope, TestTubes, Palette, Calculator, Utensils, GraduationCap, Building2, Laptop, Wrench, Microscope, TrendingUp, Users, BookOpen, Briefcase } from 'lucide-react';

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
    stream: string;
    courses: Course[];
}

const streamIcons: Record<string, any> = {
    // Engineering & Technology
    'Engineering': PencilRuler,
    'Technology': Laptop,
    'Computer Science': Laptop,
    'Information Technology': Laptop,
    'Mechanical Engineering': Wrench,
    'Civil Engineering': Building2,
    'Electrical Engineering': Calculator,

    // Science & Research
    'Science': TestTubes,
    'Physics': TestTubes,
    'Chemistry': Microscope,
    'Biology': Microscope,
    'Mathematics': Calculator,
    'Research': TestTubes,

    // Medical & Health
    'Medical': Stethoscope,
    'Medicine': Stethoscope,
    'Health Sciences': HeartPulse,
    'Nursing': HeartPulse,
    'Pharmacy': HeartPulse,
    'Dental': Stethoscope,

    // Business & Management
    'Management': BriefcaseBusiness,
    'Business': Briefcase,
    'MBA': BriefcaseBusiness,
    'Commerce': TrendingUp,
    'Finance': TrendingUp,
    'Economics': TrendingUp,
    'Accounting': Calculator,

    // Arts & Design
    'Arts': Palette,
    'Design': Palette,
    'Fine Arts': Palette,
    'Fashion Design': Palette,
    'Architecture': Building2,

    // Hospitality & Services
    'Hotel Management': Utensils,
    'Hospitality': Utensils,
    'Tourism': Users,
    'Catering': Utensils,

    // Education & Liberal Arts
    'Education': GraduationCap,
    'Liberal Arts': BookOpen,
    'Humanities': BookOpen,
    'Literature': BookOpen,
    'Philosophy': BookOpen,

    // Commerce & Banking
    'Commerce & Banking': TrendingUp,
    'Banking': TrendingUp,
    'Insurance': TrendingUp,
};

export default function StreamSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [streams, setStreams] = useState<string[]>([]);
    const [selectedStream, setSelectedStream] = useState<string>('');
    const [streamData, setStreamData] = useState<StreamData | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch streams on component mount
    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const response = await fetch('/api/streams');
                const data = await response.json();
                const allowedStreams = [
                    'Commerce',
                    'Arts',
                    'Science',
                    'Engineering',
                    'Pharmacy',
                    'Management',
                    'Research'
                ];

                const filteredStreams = (data.streams || []).filter(
                    (stream: string) => allowedStreams.includes(stream)
                );

                setStreams(filteredStreams);

                if (filteredStreams.length > 0) {
                    setSelectedStream(filteredStreams[0]);
                }
            }
            catch (error) {
                console.error('Error fetching streams:', error);
            }
        };
        fetchStreams();
    }, []);

    // Fetch courses for selected stream
    useEffect(() => {
        if (!selectedStream) return;

        const fetchStreamData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/streams/${encodeURIComponent(selectedStream)}`);
                const data = await response.json();
                setStreamData(data);
            } catch (error) {
                console.error('Error fetching stream data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStreamData();
    }, [selectedStream]);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -250,
                behavior: "smooth",
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 250,
                behavior: "smooth",
            });
        }
    };

    const getStreamIcon = (stream: string) => {
        // Try exact match first
        let IconComponent = streamIcons[stream];

        // If no exact match, try partial matching
        if (!IconComponent) {
            const streamKey = Object.keys(streamIcons).find(key =>
                stream.toLowerCase().includes(key.toLowerCase()) ||
                key.toLowerCase().includes(stream.toLowerCase())
            );
            IconComponent = streamKey ? streamIcons[streamKey] : GraduationCap;
        }

        return <IconComponent size={18} />;
    };

    return (
        <section className="relative overflow-hidden bg-linear-to-tr from-[#0B6AF3] to-[#1C4FD9] max-w-387 mx-auto p-6 md:px-12 mb-8">
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
                        {streams.map((stream, index) => {
                            const isActive = stream === selectedStream;
                            return (
                                <div key={stream}>
                                    <button
                                        onClick={() => setSelectedStream(stream)}
                                        className={`relative flex shrink-0 items-center gap-2 pb-1.5 text-sm font-medium md:text-base transition-colors ${isActive ? 'text-white' : 'text-white/85 hover:text-white'
                                            }`}
                                    >
                                        {getStreamIcon(stream)}
                                        <span>{stream}</span>
                                        {isActive && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-white"></div>
                                        )}
                                    </button>
                                    {index < streams.length - 0 && (
                                        <div className="h-6 w-0.5 shrink-0 bg-white/40 -ml-3 -mt-7 " />
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
                <div className="mt-6 flex flex-col lg:block lg:text-center items-start justify-evenly gap-4 rounded-xl bg-white/13 px-5 py-5 backdrop-blur-md">

                    <p className="text-lg font-medium text-white md:text-2xl leading-7">
                        Right Now You Are Seeing Top/Popular Courses Of {selectedStream}
                    </p>
                    <div className='flex flex-row lg:block w-full justify-between items-center'>

                        <p className="mt-2 text-sm text-white/80 md:text-base lg:my-3">
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
