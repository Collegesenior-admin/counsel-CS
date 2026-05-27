import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type CourseWithColleges = {
  id: number;
  name: string;
  slug: string;
  short_name: string | null;
  offered_at_colleges: {
    college: {
      id: number;
      name: string;
      logo_url: string | null;
    };
  }[];
};

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
        short_name: true,
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
    const transformedCourses = courses.map((course: CourseWithColleges) => ({
      id: course.id,
      name: course.name,
      slug: course.slug,
      short_name: course.short_name || course.name.split(' ').map((word: string) => word[0]).join(''),
      colleges: course.offered_at_colleges.map((offering) => offering.college)
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
