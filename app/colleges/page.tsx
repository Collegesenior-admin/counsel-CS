import { prisma } from '@/lib/prisma';
import CollegeListClient from './CollegeListClient';

export default async function CollegesPage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string;
    search?: string;
    stream?: string;
    degree?: string;
    sort?: string
  }>;
}) {
  const params = await searchParams;

  try {
    // 1. Properly type the orderBy variable
    let orderBy: Record<string, 'asc' | 'desc'> = { nirf_ranking: 'asc' };

    if (params.sort === 'fees_low') {
      orderBy = { min_fees: 'asc' };
    } else if (params.sort === 'package_high') {
      orderBy = { avg_package: 'desc' };
    }

    // 2. Fetch colleges with all filters
    const colleges = await prisma.colleges.findMany({
      where: {
        AND: [
          params.city ? { city: { equals: params.city, mode: 'insensitive' } } : {},
          params.stream ? { ownership: { equals: params.stream, mode: 'insensitive' } } : {},
          params.search ? {
            OR: [
              { name: { contains: params.search, mode: 'insensitive' } },
              { city: { contains: params.search, mode: 'insensitive' } }
            ]
          } : {},
        ]
      },
      orderBy: orderBy,
    });

    const serializedColleges = JSON.parse(JSON.stringify(colleges));

    return (
      <CollegeListClient
        initialColleges={serializedColleges}
        currentParams={params}
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
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}
