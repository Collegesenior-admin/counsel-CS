import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ stream: string }> }
) {
  try {
    const { stream: streamParam } = await params;
    const stream = decodeURIComponent(streamParam);

    const courses = await prisma.courses.findMany({
      where: {
        stream: { equals: stream, mode: 'insensitive' },
        offered_at_colleges: {
          some: {} // Only courses offered at colleges
        }
      },
      select: {
        id: true,
        name: true,
        slug: true,
        offered_at_colleges: {
          select: {
            college: {
              select: {
                id: true,
                name: true,
                logo_url: true
              }
            }
          },
          take: 5 // Limit to first 5 colleges per course
        }
      },
      orderBy: { name: 'asc' },
      take: 12 // Limit to top 12 courses
    });

    // Transform the data to match the expected format
    const transformedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      slug: course.slug,
      colleges: course.offered_at_colleges.map(offering => offering.college)
    }));

    return NextResponse.json({
      stream,
      courses: transformedCourses
    });
  } catch (error) {
    console.error('Error fetching stream data:', error);
    return NextResponse.json({ error: 'Failed to fetch stream data' }, { status: 500 });
  }
}