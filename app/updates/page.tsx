import { prisma } from '@/lib/prisma'
type UpdateType = {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string;
  published_date?: Date;
  meta_title: string | null;
  meta_description: string | null;
  created_at: Date;
  updated_at: Date;
};
import React from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import Link from 'next/link'

const FeaturedInsights = async ({
  searchParams
}: {
  searchParams: Promise<{ category?: string }>
}) => {
  const params = await searchParams;
  const selectedCategory = params.category;

  const categories = ["All Posts", "Admissions", "Exams", "Careers", "Placements", "College Life", "Results"];

  let updates: UpdateType[] = [];

  try {
    updates = await prisma.updates.findMany({
      where: {
        // If a category is selected and it's not "All Posts", filter by it
        category: selectedCategory && selectedCategory !== "All Posts"
          ? selectedCategory
          : undefined
      },
      orderBy: { created_at: 'desc' },
      take: 10
    });
  } catch (error) {
    console.error('Database error:', error);
  }

  return (
    <>
      <Header />
      <section className="bg-gray-100 py-12 px-6 md:px-20 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb & Header */}
          <nav className="text-sm text-blue-600 mb-2">Home / Updates</nav>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Insights</h2>

          {/* Top Featured Cards */}
          <div className="flex gap-5 md:gap-6 p-3 mb-12 overflow-x-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <FeaturedCard
              title="Your College Journey Starts Here"
              desc="Expert tips to make your application stand out"
              img="/building.jpg"
            />
            <FeaturedCard
              title="How to Write a Winning College Essay"
              desc="A comprehensive guide to prepare and give your absolute best to it"
              img="/writing.jpg"
            />
            <FeaturedCard
              title="Navigation to Financial Aid: A complete Guide"
              desc="Expert tips to make your application stand out"
              img="/student.jpg"
            />
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => {
              // Check if this specific category is the one currently active
              const isActive = selectedCategory === cat || (!selectedCategory && cat === "All Posts");

              return (
                <Link
                  key={cat}
                  href={cat === "All Posts" ? "/updates" : `/updates?category=${cat}`}
                  className={`px-6 py-2 rounded-lg font-medium transition ${isActive
                      ? "bg-blue-600 text-white shadow-md" // Highlight active button
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Article List (Left side) - Now using database data */}
            <div className="lg:col-span-2 space-y-6">
              {updates && updates.length > 0 ? (
                updates.map((items: UpdateType) => (
                  <ArticleListItem
                    key={items.id}
                    title={items.title}
                    category={items.category}
                    date={new Date(items.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    content={items.content}
                    slug={items.slug}
                  />
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg">
                  <p>No updates available at the moment.</p>
                </div>
              )}
            </div>

            {/* Sidebar Form (Right side) */}
            <aside className="bg-blue-600 max-h-150 rounded-2xl overflow-hidden shadow-xl text-white">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Have a Quick Question?</h3>
                <p className="text-blue-100 text-sm mb-8">
                  Feeling overwhelmed? Get personalized guidance from one of our expert counsellors.
                </p>

                <form className="space-y-6">
                  <SidebarInput label="Name" placeholder="Your Name Here" />
                  <SidebarInput label="Phone Number" placeholder="+91 Your Number Here" />
                  <SidebarInput label="Email" placeholder="Your Mail ID Here" />

                  <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl mt-4 hover:bg-blue-50 transition">
                    Talk to an Expert
                  </button>
                </form>
              </div>
              {/* Bottom Image in Sidebar */}
              <div className="h-32 w-full bg-gray-200 mt-4 overflow-hidden">
                {/* <img src="/campus-footer.jpg" className="w-full h-full object-cover" alt="campus" /> */}
              </div>
            </aside>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

// --- Sub-Components ---

const FeaturedCard = ({ title, desc }: { title: string, desc: string, img: string }) => (
  <div className="relative w-75 h-55 rounded-lg shrink-0 md:shrink-0 lg:shrink-0 group cursor-pointer shadow-md">
    <div className="absolute inset-0 bg-gray-200 z-10 group-hover:bg-gray-300 transition rounded-lg"></div>
    {/* <img src={img} className="absolute inset-0 w-full h-full object-cover" alt={title} /> */}
    <div className="absolute bottom-0 p-6 z-20 text-gray-700">
      <h3 className="text-lg font-bold mb-2 leading-tight">{title}</h3>
      <p className="text-xs text-gray-700 line-clamp-2">{desc}</p>
    </div>
  </div>
);

const ArticleListItem = ({ title, category, date, content, slug }: { title: string, category: string, date: string, content: string, slug: string }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 border border-gray-100 hover:shadow-md transition">
    <div className="flex-1">
      <p className="text-xs text-gray-400 mb-3">{category} - {date}</p>
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        {content.substring(0, 120)}...
      </p>
      <Link href={`/updates/${slug}`} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200">
        Read More
      </Link>
    </div>
    <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden bg-gray-200">
      {/* <img src={img} className="w-full h-full object-cover" alt={title} /> */}
    </div>
  </div>
);

const SidebarInput = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="border-b border-blue-400 pb-2">
    <label className="block text-xs font-bold mb-1 uppercase tracking-wider">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="bg-transparent w-full text-white placeholder-blue-200 outline-none text-sm"
    />
  </div>
);

export default FeaturedInsights;
