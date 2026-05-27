import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const streams = await prisma.courses.findMany({
      select: { stream: true },
      distinct: ['stream'],
      where: {
        offered_at_colleges: {
          some: {} // Only streams that have courses offered at colleges
        }
      },
      orderBy: { stream: 'asc' }
    });

    const streamNames = streams.map((s: { stream: string | null }) => s.stream).filter(Boolean);

    return NextResponse.json({ streams: streamNames });
  } catch (error) {
    console.error('Error fetching streams:', error);
    return NextResponse.json({ error: 'Failed to fetch streams' }, { status: 500 });
  }
}
