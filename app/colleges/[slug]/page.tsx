import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CollegeClientView from "./CollegeClientView";

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  
  const college = await prisma.colleges.findUnique({
    where: { slug },
    select: {
      name: true,
      city: true,
      state: true,
      logo_url: true,
      seo: {
        select: {
          meta_title: true,
          meta_description: true
        }
      }
    }
  });

  if (!college) {
    return {
      title: 'College Not Found',
      description: 'The requested college information is not available.'
    };
  }

  return {
    title: college.seo?.meta_title || `${college.name} - Admissions, Fees, Ranking 2026`,
    description: college.seo?.meta_description || `Get complete information about ${college.name} in ${college.city}, ${college.state}. Check fees, admissions, cutoffs, placements and rankings.`,
    keywords: [`${college.name}`, `${college.city} colleges`, 'admissions 2026', 'college fees', 'engineering colleges'],
    openGraph: {
      title: college.seo?.meta_title || `${college.name} - Complete College Information`,
      description: college.seo?.meta_description || `Explore ${college.name} - admissions, fees, courses, and more.`,
      images: college.logo_url ? [{ url: college.logo_url, alt: `${college.name} logo` }] : [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: college.seo?.meta_title || `${college.name} - College Information`,
      description: college.seo?.meta_description || `Complete guide to ${college.name} admissions and courses.`
    }
  };
}

// Note the 'Promise' type for params
export default async function CollegePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. Await the params to get the slug
  const { slug } = await params;

  // 2. Now slug is defined, and the query will work
  const collegeData = await prisma.colleges.findUnique({
    where: { 
      slug: slug // No longer undefined
    },
    include: {
      course_offerings: { 
        include: { 
          course: true 
        }
      },
      admissions: true,
      placements: true,
      cutoffs: true,
      scholarships: true,
      images: true, 
      rankings: true,
      facilities: true,
      faqs: true,
      news: true
    },
  });

  if (!collegeData) return notFound();

  // 3. Fetch similar colleges from the same city
  const similarColleges = await prisma.colleges.findMany({
    where: {
      city: collegeData.city,
      id: { not: collegeData.id }
    },
    select: {
      id: true,
      name: true,
      slug: true,
      city: true,
      state: true,
      logo_url: true,
      nirf_ranking: true,
      ownership: true
    },
    take: 5
  });

  return <CollegeClientView college={collegeData} similarColleges={similarColleges} />;
}