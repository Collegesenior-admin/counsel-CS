import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import CourseListClient from './CourseListClient';

export const metadata: Metadata = {
  title: 'Courses - Find Your Perfect Course | CollegeSenior',
  description: 'Explore hundreds of courses across Engineering, Management, Science, Commerce and more. Compare fees, duration, and find colleges offering your preferred course.',
  keywords: ['courses', 'engineering courses', 'management courses', 'course fees', 'college courses', 'UG courses', 'PG courses'],
  openGraph: {
    title: 'Find Your Perfect Course - CollegeSenior',
    description: 'Browse and compare courses from top colleges. Get detailed information about fees, duration, and career prospects.',
    type: 'website'
  }
};

const ITEMS_PER_PAGE = 10; // Adjust items per page here

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    stream?: string;
    level?: string;
    duration?: string;
    sort?: string;
    page?: string; // Added page param
  }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  try {
    // 1. Fetch courses and filter data in parallel
    const [courses, filterData] = await Promise.all([
      // Fetch courses with filters
      prisma.courses.findMany({
        where: {
          AND: [
            params.stream ? { stream: { equals: params.stream, mode: 'insensitive' } } : {},
            params.level ? { level: { equals: params.level, mode: 'insensitive' } } : {},
            params.duration ? { duration: { equals: params.duration, mode: 'insensitive' } } : {},
            params.search ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { short_name: { contains: params.search, mode: 'insensitive' } }
              ]
            } : {},
          ]
        },
        include: {
          offered_at_colleges: {
            include: {
              college: true
            }
          }
        },
        orderBy: params.sort === 'fees_low' ? { avg_fees: 'asc' } : 
                params.sort === 'duration' ? { duration: 'asc' } : 
                { name: 'asc' },
      }),
      
      // Fetch unique filter values
      Promise.all([
        prisma.courses.findMany({
          select: { stream: true },
          distinct: ['stream'],
          orderBy: { stream: 'asc' }
        }),
        prisma.courses.findMany({
          select: { level: true },
          distinct: ['level'],
          orderBy: { level: 'asc' }
        }),
        prisma.courses.findMany({
          select: { duration: true },
          distinct: ['duration'],
          orderBy: { duration: 'asc' }
        })
      ])
    ]);

    const [streams, levels, durations] = filterData;

    // 2. Prepare filter options
    const filterOptions = {
      streams: streams.map((s: { stream: string | null }) => s.stream).filter(Boolean),
      levels: levels.map((l: { level: string | null }) => l.level).filter(Boolean),
      durations: durations.map((d: { duration: string | null }) => d.duration).filter(Boolean)
    };

    // --- CUSTOM SORTING ENGINE BASED ON YOUR DROPDOWN SPECS ---
    let processedCourses = [...courses];

    if (params.sort === 'default' || !params.sort) {
      processedCourses.sort((a, b) => {
        const countA = a.offered_at_colleges?.length || 0;
        const countB = b.offered_at_colleges?.length || 0;
        return countB - countA; 
      });
    } else if (params.sort === 'rank_low') {
      processedCourses.sort((a, b) => {
        const bestRankA = a.offered_at_colleges?.reduce((min:number, cur:any) => 
          cur.college?.nirf_ranking && cur.college.nirf_ranking < min ? cur.college.nirf_ranking : min, 999
        ) || 999;

        const bestRankB = b.offered_at_colleges?.reduce((min:number, cur:any) => 
          cur.college?.nirf_ranking && cur.college.nirf_ranking < min ? cur.college.nirf_ranking : min, 999
        ) || 999;

        return bestRankA - bestRankB;
      });
    } else if (params.sort === 'package_high') {
      processedCourses.sort((a, b) => {
        const pkgA = (a as any).avg_package || 0;
        const pkgB = (b as any).avg_package || 0;
        return pkgB - pkgA;
      });
    }

    // --- CALCULATE PAGINATION STATISTICS ---
    const totalItems = processedCourses.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;
    
    // In-memory pagination calculation to account for custom JS sorting routines
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCourses = processedCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 3. Serialization
    const serializedCourses = JSON.parse(JSON.stringify(paginatedCourses));
    const serializedFilterOptions = JSON.parse(JSON.stringify(filterOptions));

    return (
      <CourseListClient
        initialCourses={serializedCourses}
        currentParams={params}
        filterOptions={serializedFilterOptions}
        totalPages={totalPages} // Sent total pages down
        totalItems={totalItems} // Sent total unfiltered matching count down
      />
    );
  } catch (error) {
    console.error('Database error in courses page:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Courses</h1>
          <p className="text-gray-600 mb-4">We're experiencing technical difficulties.</p>
          <p className="text-sm text-gray-500">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }
}
