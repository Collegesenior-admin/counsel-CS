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

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    stream?: string;
    level?: string;
    duration?: string;
    sort?: string;
  }>;
}) {
  const params = await searchParams;

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
        // Get unique streams
        prisma.courses.findMany({
          select: { stream: true },
          distinct: ['stream'],
          orderBy: { stream: 'asc' }
        }),
        
        // Get unique levels
        prisma.courses.findMany({
          select: { level: true },
          distinct: ['level'],
          orderBy: { level: 'asc' }
        }),
        
        // Get unique durations
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

    // 3. Serialization (Ensuring Date objects don't break Client Components)
    const serializedCourses = JSON.parse(JSON.stringify(courses));
    const serializedFilterOptions = JSON.parse(JSON.stringify(filterOptions));

    return (
      <CourseListClient
        initialCourses={serializedCourses}
        currentParams={params}
        filterOptions={serializedFilterOptions}
      />
    );
  } catch (error) {
    console.error('Database error in courses page:', error);
    
    // Return fallback UI when database fails
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
