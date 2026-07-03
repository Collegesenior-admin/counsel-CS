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
  _count: {
    offered_at_colleges: number;
  };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ stream: string }> }
) {
  try {
    const { stream: streamParam } = await params;
    const streamValues = decodeURIComponent(streamParam).split(',').map(s => s.trim());

    const courses: CourseWithColleges[] = await prisma.courses.findMany({
      where: {
        stream: { in: streamValues, mode: 'insensitive' },
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
          }
        },
        _count: {
          select: { offered_at_colleges: true }
        }
      },
      take: 50
    });

    // Transform the data to match the expected format
    const transformedCourses = courses
      .sort((a, b) => b._count.offered_at_colleges - a._count.offered_at_colleges)
      .slice(0, 12)
      .map((course) => ({
      id: course.id,
      name: course.name,
      slug: course.slug,
      short_name: course.short_name || course.name.split(' ').map((word: string) => word[0]).join(''),
      colleges: course.offered_at_colleges.slice(0, 5).map((offering) => offering.college),
      collegeCount: course._count.offered_at_colleges
    }));

    return NextResponse.json({
      courses: transformedCourses
    });
  } catch (error) {
    console.error('Error fetching stream data:', error);
    return NextResponse.json({ error: 'Failed to fetch stream data' }, { status: 500 });
  }
}
