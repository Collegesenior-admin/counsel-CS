
import { prisma } from '@/lib/prisma';
import React from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import Link from 'next/link';
import { Prisma } from '@prisma/client';

/* ---------------- TYPES & INTERFACES ---------------- */

interface JSONContentBlock {
  type?: string;
  text?: string;
  [key: string]: any;
}

type BlogItem = {
  id: number;
  title: string;
  slug: string;
  content: Prisma.JsonValue;
  excerpt: string | null;
  imageUrl: string | null;
  createdAt: Date;
};

type NewsItem = {
  id: number;
  title: string;
  slug: string;
  content: Prisma.JsonValue;
  excerpt: string | null;
  imageUrl: string | null;
  category: string | null;
  createdAt: Date;
};

/* ---------------- HELPER FUNCTIONS ---------------- */

const getContentPreview = (content: Prisma.JsonValue, excerpt: string | null): string => {
  if (excerpt) return excerpt;

  try {
    if (Array.isArray(content)) {
      const firstParagraph = content.find((block) => {
        const item = block as JSONContentBlock;
        return item?.type === 'paragraph';
      }) as JSONContentBlock | undefined;

      if (firstParagraph && firstParagraph.text) {
        return firstParagraph.text;
      }
    }
  } catch (e) {
    console.error("Failed to parse content json", e);
  }
  return "Read full post for details.";
};

/* ---------------- MAIN SERVER COMPONENT ---------------- */

const FeaturedInsights = async ({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) => {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams.category;

  const categories = ["All Posts", "Admissions", "Exams", "Careers"];

  let featuredBlogs: BlogItem[] = [];
  let articlesNews: NewsItem[] = [];

  try {
    // 1. Fetch Blogs for the top Featured Horizontal Slider (Always fetches latest blogs, ignores category filter)
    featuredBlogs = await prisma.blogUpdate.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 6, // Limit to top 6 featured blogs
    });

    // 2. Fetch News Articles for the bottom list view based on category selection
    const newsWhereClause =
      selectedCategory && selectedCategory !== "All Posts"
        ? { category: selectedCategory, isPublished: true }
        : { isPublished: true };

    articlesNews = await prisma.newsUpdate.findMany({
      where: newsWhereClause,
      orderBy: { createdAt: "desc" },
      take: 10,
    });

  } catch (error) {
    console.error("Database query initialization error:", error);
  }

  return (
    <>
      <Header />

      <section className="bg-gray-100 py-12 px-6 md:px-20 ">
        <div className="max-w-387 mx-auto">

          {/* Breadcrumb & Header */}
          <nav className="text-sm text-blue-600 mb-2">Home / Updates</nav>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Featured Insights
          </h2>

          {/* TOP SECTION: Blogs showing in Horizontal Featured Cards */}
          {featuredBlogs.length > 0 ? (
            <div
              className="flex gap-5 md:gap-6 p-3 mb-12 overflow-x-scroll"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {featuredBlogs.map((blog) => (
                <Link key={`blog-${blog.id}`} href={`/updates/${blog.slug}`}>
                  <FeaturedCard
                    title={blog.title}
                    desc={getContentPreview(blog.content, blog.excerpt)}
                    img={blog.imageUrl || "/building.jpg"}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg text-center text-gray-400 mb-12">
              No featured blogs available.
            </div>
          )}

          {/* MIDDLE SECTION: Category Filter Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {categories.map((cat) => {
              const isActive =
                selectedCategory === cat ||
                (!selectedCategory && cat === "All Posts");

              return (
                <Link
                  key={cat}
                  href={cat === "All Posts" ? "/updates" : `/updates?category=${cat}`}
                  className={`px-6 py-2 rounded-lg font-medium transition ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>

          {/* BOTTOM SECTION: Main Layout for News Articles & Sidebar */}
          <div className=" gap-8 flex">

            {/* LEFT SIDE: News Articles List */}
            <div className="space-y-6 w-[85%]">
              {articlesNews.length > 0 ? (
                articlesNews.map((article: NewsItem) => (
                  <ArticleListItem
                    key={`news-${article.id}`}
                    title={article.title}
                    category={article.category || "General"}
                    date={new Date(article.createdAt).toLocaleDateString(
                      'en-US',
                      { month: 'short', year: 'numeric' }
                    )}
                    previewText={getContentPreview(article.content, article.excerpt)}
                    slug={article.slug}
                  />
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center text-gray-500">
                  <p>No news articles available under this category at the moment.</p>
                </div>
              )}
            </div>

            {/* RIGHT SIDE: Sidebar Form */}
            <aside className="space-y-8">
              <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Have a Quick Question?</h3>
                  <p className="text-blue-100 text-sm mb-8">
                    Get personalized guidance from one of our expert counsellors.
                  </p>

                  {/* NO onSubmit here! */}
                  <form className="space-y-6">
                    <SidebarInput label="Name" placeholder="Your Name Here" />
                    <SidebarInput label="Phone Number" placeholder="+91 Your Number Here" />
                    <SidebarInput label="Email" placeholder="Your Mail ID Here" />

                    {/* type="button" prevents the page from reloading when clicked */}
                    <button type="button" className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl mt-4 hover:bg-blue-50 transition shadow-lg">
                      Talk to an Expert
                    </button>
                  </form>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FeaturedInsights;

/* ---------------- SUB-COMPONENTS ---------------- */

const FeaturedCard = ({
  title,
  desc,
  img,
}: {
  title: string;
  desc: string;
  img: string;
}) => (
  <div className="relative w-95 h-65 rounded-lg shrink-0 group cursor-pointer shadow-md overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
      style={{ backgroundImage: `url(${img})` }}
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10" />

    <div className="absolute bottom-0 p-6 z-20 text-white">
      <h3 className="text-lg font-bold mb-2 drop-shadow-md">{title}</h3>
      <p className="text-xs line-clamp-2 text-gray-200 drop-shadow-sm">{desc}</p>
    </div>
  </div>
);

const ArticleListItem = ({
  title,
  category,
  date,
  previewText,
  slug,
}: {
  title: string;
  category: string;
  date: string;
  previewText: string;
  slug: string;
}) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex gap-6 border border-gray-100 hover:shadow-md transition">
    <div className="flex-1">
      <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-3">
        {category} — <span className="text-gray-400 font-normal normal-case">{date}</span>
      </p>

      <h3 className="text-lg font-bold text-gray-800 mb-3">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-6 line-clamp-2">
        {previewText}
      </p>

      <Link
        href={`/updates/${slug}`}
        className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-gray-200 transition"
      >
        Read More
      </Link>
    </div>
  </div>
);

const SidebarInput = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) => (
  <div className="border-b border-blue-400 pb-2">
    <label className="block text-xs font-bold mb-1 uppercase tracking-wider">
      {label}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="bg-transparent w-full text-white placeholder-blue-200 outline-none text-sm"
    />
  </div>
);

