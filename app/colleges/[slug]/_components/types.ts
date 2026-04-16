// import { Prisma } from '@prisma/client';
import { LucideProps } from "lucide-react";

// 1. The Main Data Type - Manual definition instead of Prisma
export type CollegeWithRelations = {
    id: number;
    name: string;
    slug: string;
    city: string;
    state: string;
    type: string;
    ownership: string;
    naac_grade: string;
    nirf_ranking: number;
    established: number;
    website: string;
    email: string;
    phone: string;
    logo_url: string;
    image_url: string;
    banner_url: string;
    overview: string;
    description: string;
    meta_title: string;
    meta_description: string;
    created_at: Date;
    updated_at: Date;
    course_offerings: any[];
    admissions?: any[];
    placements?: any[];
    cutoffs?: any[];
    scholarships?: any[];
    images?: any[];
    rankings?: any[];
    facilities: any[];
    news?: any[];
    faqs?: any[];
    structured_data?: any;
};

// 2. Structured Content (JSON Paragraphs)
export interface SectionBlock {
    title: string;
    content: string;
}

// 3. Admission Process Steps
export interface AdmissionStep {
    step: number;
    title: string;
    content: string;
}

// 4. Placement Statistics
export interface PlacementStat {
    title: string;
    degree: string;
    year: number;
    average_package: string;
    median_package: string;
    highest_package: string;
}

// 5. Facilities
export interface FacilityItem {
    name: string;
    icon: string;
    description: string;
}

export interface FacilityJSON {
    college: string;
    title: string;
    description: string;
    Facilities: FacilityItem[];
    campusFAQs?: FAQGroup[];
}

// 6. FAQs
export interface FAQGroup {
    category: string;
    questions: {
        q: string;
        a: string;
    }[];
}

// 7. Rankings - Updated for new nested structure
export interface RankingDataItem {
    year: number;
    rank: number | null;
    score?: string;
    stream: string;
    desc?: string;
}

export interface RankingItem {
    org: string;
    data: RankingDataItem[];
}

export interface RankingRecord {
    id: number;
    college_id: number;
    rank_data: RankingItem[];
    structured_data?: {
        current_year?: number;
        prev_year?: number;
        intro_template?: string;
        comparison_template?: string;
    };
}

// 8. Gallery
export interface GalleryMedia {
        type: 'image' | 'video';
        url: string;
        caption: string;
        thumbnail?: string; // Only used for videos
    }

export interface IconProps extends LucideProps {
    name: string;
}

export interface NewsContent {
        title: string;
        content: string;
        link_url: string;
        image_url: string;
        is_breaking?: boolean; // Added here
        cta_text?: string;
        meta?: {
            cta_text?: string;
            author?: string;
        }
    }

// 9. Shared Props for all Tab Components
export interface TabProps {
    college: CollegeWithRelations;
    setActiveTab: (tab: string) => void;
}


export interface ScholarshipData {
  name: string;
  type: string;
  deadline: string;
  amount_desc: string;
  description: string;
  eligibility: string;
  amount_value: number;
}

export interface ScholarshipRecord {
  id: number;
  college_id: number;
  scholarship_data: ScholarshipData[];
}

export interface ScholarshipTabProps {
  scholarships: ScholarshipRecord[];
  collegeName: string;
  faqs?: FAQGroup[];
}

export interface NewsRecord {
  id: number;
  college_id: number;
  category: string; // e.g., "Admission", "Placement", "Event"
  published_date: string | Date;
  news_data: {
    title: string;
    content: string;
    image_url?: string;
    author?: string;
  };
  created_at: string;
}

export interface NewsTabProps {
  news: NewsRecord[];
  collegeName: string;
  faqs?: FAQGroup[];
}

export interface CollegeCourseData {
  overview?: string;
  highlights?: string[];
  specializations?: string[];
  admission_process?: Array<{ step: number; title: string; description: string }>;
  eligibility_details?: string;
  selection_criteria?: string;
  fee_structure?: {
    year_1?: string;
    year_2?: string;
    year_3?: string;
    year_4?: string;
    total?: string;
  };
  scholarship_info?: string;
  career_prospects?: {
    job_roles?: string[];
    salary_range?: string;
    top_sectors?: string[];
  };
  skills_gained?: string[];
  infrastructure?: string;
  exam_pattern?: string;
  projects_internships?: string;
  faqs?: Array<{ q: string; a: string }>;
}
