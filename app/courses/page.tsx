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

  // 1. Properly type the orderBy variable for Course metrics
  let orderBy: Record<string, 'asc' | 'desc'> = { name: 'asc' };

  if (params.sort === 'fees_low') {
    orderBy = { total_fees: 'asc' };
  } else if (params.sort === 'seats_high') {
    orderBy = { seats_available: 'desc' };
  }

  // 2. Fetch courses with filters and linked colleges
  const courses = await prisma.courses.findMany({
    where: {
      AND: [
        // Filter by Stream (e.g., Engineering, Management)
        params.stream ? { stream: { equals: params.stream, mode: 'insensitive' } } : {},
        
        // Filter by Level (e.g., UG, PG, Diploma, PhD)
        params.level ? { level: { equals: params.level, mode: 'insensitive' } } : {},
        
        // Filter by Duration (e.g., 4 years)
        params.duration ? { duration: { equals: params.duration, mode: 'insensitive' } } : {},
        
        // Search by Course Name or Short Name
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
          college: true // Includes the actual college details for the horizontal scroll
        }
      }
    },
    orderBy: orderBy,
  });

  // 3. Serialization (Ensuring Date objects don't break Client Components)
  const serializedCourses = JSON.parse(JSON.stringify(courses));

  return (
    <CourseListClient
      initialCourses={serializedCourses}
      currentParams={params}
    />
  );
}