import { prisma } from '@/lib/prisma';
import CollegeListClient from './CollegeListClient';

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    search?: string;
    stream?: string;
    course?: string;
    sort?: string
  }>;
}) {
  const params = await searchParams;

  try {
    // 1. Fetch dynamic filter values from database
    const [colleges, filterData] = await Promise.all([
      // Fetch colleges with filters
      prisma.colleges.findMany({
        where: {
          AND: [
            params.city ? { city: { equals: params.city, mode: 'insensitive' } } : {},
            params.stream ? {
              course_offerings: {
                some: {
                  course: {
                    stream: { equals: params.stream, mode: 'insensitive' }
                  }
                }
              }
            } : {},
            params.course ? {
              course_offerings: {
                some: {
                  course: {
                    name: { equals: params.course, mode: 'insensitive' }
                  }
                }
              }
            } : {},
            params.search ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { city: { contains: params.search, mode: 'insensitive' } }
              ]
            } : {},
          ]
        },
        include: {
          course_offerings: {
            include: {
              course: true
            }
          }
        },
        orderBy: params.sort === 'fees_low' ? { min_fees: 'asc' } : 
                params.sort === 'package_high' ? { avg_package: 'desc' } : 
                { nirf_ranking: 'asc' },
      }),
      
      // Fetch unique filter values
      Promise.all([
        // Get unique cities from colleges
        prisma.colleges.findMany({
          select: { city: true },
          distinct: ['city'],
          orderBy: { city: 'asc' }
        }),
        
        // Get unique streams that are actually offered by colleges
        prisma.courses.findMany({
          select: { stream: true },
          distinct: ['stream'],
          where: {
            offered_at_colleges: {
              some: {} // Only courses that are offered at some college
            }
          },
          orderBy: { stream: 'asc' }
        }),
        
        // Get unique courses that are actually offered by colleges
        prisma.courses.findMany({
          select: { name: true },
          distinct: ['name'],
          where: {
            offered_at_colleges: {
              some: {} // Only courses that are offered at some college
            }
          },
          orderBy: { name: 'asc' }
        })
      ])
    ]);

    const [cities, streams, courses] = filterData;

    // 2. Prepare filter options
    const filterOptions = {
      cities: cities.map((c: { city: string | null }) => c.city).filter(Boolean),
      streams: streams.map((s: { stream: string | null }) => s.stream).filter(Boolean),
      courses: courses.map((c: { name: string | null }) => c.name).filter(Boolean)
    };

    const serializedColleges = JSON.parse(JSON.stringify(colleges));
    const serializedFilterOptions = JSON.parse(JSON.stringify(filterOptions));

    return (
      <CollegeListClient
        initialColleges={serializedColleges}
        currentParams={params}
        filterOptions={serializedFilterOptions}
      />
    );
  } catch (error) {
    console.error('Database error in colleges page:', error);
    
    // Return fallback UI when database fails
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Colleges</h1>
          <p className="text-gray-600 mb-4">We're experiencing technical difficulties.</p>
          <p className="text-sm text-gray-500">Please try again later or contact support.</p>
        </div>
      </div>
    );
  }
}
