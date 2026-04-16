'use client';
import { useState, useTransition, useEffect } from 'react';
import { BriefcaseBusiness, IndianRupee, Settings2 } from 'lucide-react';
import Image from "next/image"
import Link from 'next/link';
import Headers from '../components/Header';
import Footer from '../components/Footer';
import { useScrollLock } from '../hooks/useScrollLock';
type CourseType = {
  id: number;
  name: string;
  slug: string;
  level: string;
  duration: string;
  avg_salary?: number;
  created_at: Date;
  updated_at: Date;
};

type CollegeType = {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  ownership: string;
  naac_grade: string;
  nirf_ranking: number;
  established: number;
  website: string;
  email: string;
  phone: string;
  logo_url: string;
  image_url: string;
  overview: string;
  description: string;
  meta_title: string;
  meta_description: string;
  created_at: Date;
  updated_at: Date;
};
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Loader2, ChevronLeftCircle, ChevronRightCircle, CalendarClock } from 'lucide-react';
import EnquiryFormModal from '../components/EnquiryFormModal';
import { useScrollTrigger } from '../hooks/useScrollTrigger';


// Define the type to include the colleges associated with each course
type CourseWithColleges = CourseType & {
  avg_fees?: string;
  course_type?: string;
  description?: string;
  offered_at_colleges: {
    college: CollegeType;
  }[];
};

// 2. Update the Props to include currentParams
interface Props {
  initialCourses: CourseWithColleges[];
  currentParams: {
    search?: string;
    stream?: string;
    level?: string;
    duration?: string;
    sort?: string;
  };
}

export default function CourseListClient({ initialCourses, currentParams }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [localSearch, setLocalSearch] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isTriggered, hasSubmitted } = useScrollTrigger(0.7);
  
  // Lock scroll when filter sidebar is open on mobile
  useScrollLock(isFilterOpen);

  useEffect(() => {
    if (isTriggered && !hasSubmitted) {
      setIsModalOpen(true);
    }
  }, [isTriggered, hasSubmitted]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const hiddenFields = {
    stream: currentParams.stream || 'All',
    level: currentParams.level || 'All',
    duration: currentParams.duration || 'All',
    searchQuery: currentParams.search || '',
    sortBy: currentParams.sort || 'newest'
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get(key) === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/courses?${params.toString()}`, { scroll: false });
    });
  };

  const resetFilters = () => {
    startTransition(() => {
      router.push('/courses');
    });
  };


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.push(`/courses?${params.toString()}`);
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <Headers />

      {/* --- LOADING SPINNER --- */}
      {isPending && (
        <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-white/60">
          <div className="p-5 bg-white rounded-2xl flex flex-col items-center border border-gray-100 shadow-xl">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-gray-600 mt-3">Updating courses...</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-375 mx-auto bg-linear-to-tr from-blue-500 to-indigo-600 md:rounded-2xl lg:rounded-2xl text-white pt-4 pb-4 px-4 relative overflow-hidden">
        <div className="max-w-10xl p-3 mx-auto">
          <div className="z-50 w-full lg:w-2/3 md:w-2/3">
            <p className="text-sm opacity-80 mb-15 md:mb-15 lg:mb-30">Home / Courses</p>
            <h2 className="text-2xl md:text-3xl flex font-semibold">Find Your Perfect Courses</h2>
            <p className="text-md md:text-lg opacity-90 mb-4"> Explore hundreds of Courses to find the right one for you. </p>
            <form onChange={handleSearchSubmit} className="w-full mt-4 flex bg-white p-1 md:p-2 rounded-lg shadow-lg border border-gray-200 text-gray-800">
              <button type="submit" className="p-2 text-blue-700 hover:text-blue-600 transition">
                <Search size={20} />
              </button>
              <input type="text" placeholder="Search for courses..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="grow p-2 outline-none placeholder-blue-700" />
            </form>
          </div>
          <div className='w-full lg:w-1/3 md:w-1/3 z-0'>
            <Image src="/coursehero.png" alt="Hero" width={280} height={300} className="absolute right-0 bottom-0 z-0 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden px-8 my-2">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md"
        >
          <Settings2 />
          Filter Options
        </button>
      </div>

      {/* Main */}

      <main className="max-w-387 mx-auto p-2 md:px-4 md:py-4 flex flex-col lg:flex-row gap-6">
        {/* Mobile Overlay Background */}
        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
        )}

        {/* Filters Sidebar */}
        <aside className={`fixed sm:fixed md:fixed inset-0 z-40  lg:relative lg:z-10 w-80 lg:h-auto sm:h-auto bg-gray-50 p-3 overflow-y-scroll transition-transform duration-300 lg:translate-x-0 lg:w-1/4 lg:block lg:bg-transparent lg:p-0
          ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} `} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex justify-between items-center mb-6 lg:mb-4">
            <h3 className="font-bold text-lg">Filters</h3>
            <div className="flex items-center gap-4">
              <button onClick={resetFilters} className="text-indigo-600 text-sm font-semibold">Reset</button>
              {/* Close Button for Mobile */}
              <button onClick={() => setIsFilterOpen(false)} className="lg:hidden p-2 bg-white rounded-full shadow-sm text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { title: "Stream", key: "stream", options: ["Engineering", "Management", "Science", "Commerce"] },
              { title: "Level", key: "level", options: ["UG", "PG", "Diploma", "PhD"] }
            ].map((block) => {
              const searchTerm = localSearch[block.title]?.toLowerCase() || "";
              const filteredOptions = block.options.filter(opt => opt.toLowerCase().includes(searchTerm));

              return (
                <div key={block.title} className='bg-white p-1 rounded-xl shadow-sm'>
                  <div className="bg-white h-70 pt-0 p-3 rounded-xl overflow-y-scroll lg:border-none" style={{ scrollbarWidth: 'thin', msOverflowStyle: 'none', borderRadius: '19px' }}>
                    <div className='bg-white sticky top-0 py-5'>
                      <h4 className="font-bold">{block.title}</h4>
                      <div className="flex items-center gap-2 mt-2 border-b border-gray-100">
                        <Search size={16} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="grow py-2 outline-none text-sm"
                          value={localSearch[block.title] || ""}
                          onChange={(e) => setLocalSearch({ ...localSearch, [block.title]: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-3 text-sm text-gray-700 mt-2">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => (
                          <label key={opt} className="flex items-center cursor-pointer hover:text-indigo-600 transition-colors">
                            <input
                              type="checkbox"
                              className="mr-3 accent-indigo-600 h-4 w-4"
                              checked={searchParams.get(block.key) === opt}
                              onChange={() => updateFilter(block.key, opt)}
                            />
                            <span className={searchParams.get(block.key) === opt ? "text-indigo-600 font-bold" : ""}>{opt}</span>
                          </label>
                        ))
                      ) : (
                        <p className="text-gray-400 text-xs italic py-2">No matches found</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mobile Apply Button */}
            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full lg:hidden bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg mt-4"
            >
              Show Results
            </button>
          </div>

        </aside>



        {/* Results Section */}
        <section className="w-full lg:w-3/4">
          <div className="@max-xs:flex-1 sm:flex md:flex lg:flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">
              Showing {initialCourses.length || 'All'} Courses
            </h3>

            {/* --- SORTING DROPDOWN --- */}
            <div className="relative group">
              <select
                className="bg-white border border-gray-200 text-sm rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-indigo-500"

                onChange={(e) => updateFilter('sort', e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="fees_low">Fees: Low to High</option>
                <option value="rank_low">NIRF Rank: High to Low</option>
                <option value="package_high">Avg Package: High to Low</option>
              </select>
              {/* <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" /> */}
            </div>
          </div>

          {initialCourses.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-xl font-semibold text-gray-600">No courses found.</h3>
              <button onClick={resetFilters} className="mt-4 text-indigo-600 underline">Clear all filters</button>
            </div>
          ) : (
            initialCourses.map((course) => (
              <div key={course.id} className="p-3 border border-gray-200 m-3 lg:m-4 rounded-xl shadow-sm bg-white">
                <h2 className="text-lg sm:text-xl md:text-2xl font-medium md:font-medium mb-3 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {course.name || 'N/A'} </h2>
                {/* Stats */}
                <div className="flex flex-wrap gap-2 md:gap-6 lg:gap-8 mb-3 text-gray-500 font-medium">
                  <div className="flex items-center gap-2">
                    <CalendarClock className='w-5 h-5 text-blue-600' strokeWidth={1}/>
                    <span className="text-sm">{course.duration || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <IndianRupee className='w-5 h-5 text-blue-600' strokeWidth={1} />
                    <span className="text-sm">
                      {course.avg_fees || 'N/A'} <span className="text-gray-400 font-medium">(Avg)</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className='w-5 h-5 text-blue-600' strokeWidth={1} />
                    <span className="text-sm">
                      {course.course_type || 'Full Time'}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="max-h-26 text-gray-600 leading-relaxed mb-4 text-sm overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {course.description || 'An MBA in Marketing is a postgraduate degree focusing on marketing strategies, brand management, and consumer behavior, equipping students with skills for roles like Brand Manager, Sales Manager, or Market Research Analyst.'}

                </p>

                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-blue-600 font-medium text-md md:text-lg lg:text-xl">Colleges Offering this Course</h3>
                  <div className="flex gap-3">
                    <ChevronLeftCircle className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-600' strokeWidth={1} />
                    <ChevronRightCircle className='w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-blue-600' strokeWidth={1} />
                  </div>
                </div>

                {/* Nested Horizontal College Scroll */}
                <div className="flex grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-6 overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {course.offered_at_colleges.length === 0 && (
                    <div className="flex justify-center items-center w-full py-3">
                      <p className=" text-center justify-center text-gray-400 italic text-sm">No colleges found for this course.</p>
                    </div>
                  )}
                  {course.offered_at_colleges.map((item) => (
                    <div key={item.college.id} className="w-70 md:w-75 lg:w-80 bg-white shrink-0 p-3 rounded-xl border border-blue-100 shadow-sm">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-600 text-md w-2/3">
                          {item.college.name}
                        </h4>
                        <Image src={item.college.logo_url || '/hero-corner.svg'}
                          alt="Hero corner image"
                          width={600}
                          height={600} className="w-8 h-8 md:w-9 md:h-9 lg:w-13 lg:h-13 opacity-80" />
                      </div>
                      <p className="text-blue-500 text-sm mb-3">{item.college.city}</p>
                      <div className="flex gap-2">
                        <Link href={`/colleges/${item.college.slug}?courses&fees&courseId=${course.id}`} className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold text-md text-center">View</Link>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold text-md shadow-md">Apply now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
            ))}
        </section>
      </main>
      <Footer />
      <EnquiryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourcePage="Course Listing"
        hiddenFields={hiddenFields}
      />
    </div>
  );
}
