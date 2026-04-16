import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const collegeCount = await prisma.colleges.count();
    const courseCount = await prisma.courses.count();
    
    const sampleCollege = await prisma.colleges.findFirst({
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        logo_url: true
      }
    });

    return NextResponse.json({
      status: 'success',
      database: 'connected',
      timestamp: new Date().toISOString(),
      counts: {
        colleges: collegeCount,
        courses: courseCount
      },
      sampleData: sampleCollege,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'
      }
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
        SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing'
      }
    }, { status: 500 });
  }
}
