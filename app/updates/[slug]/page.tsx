
import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { Calendar, Timer, User } from 'lucide-react';

/* ---------------- STRUCTURAL TYPES ---------------- */

interface JSONContentBlock {
  type: 'paragraph' | 'table' | 'graph' | 'heading' | 'quote' | 'list';
  text?: string;
  headers?: string[];
  rows?: string[][];
  chartType?: string;
  title?: string;
  data?: Array<{ label?: string; year?: string; value: number }>;
  level?: number;
  author?: string;
  style?: 'bullet' | 'ordered';
  items?: string[];
}

type UnifiedDetailItem = {
  title: string;
  content: Prisma.JsonValue;
  createdAt: Date;
  category?: string | null; // Optional because Blogs don't have this
  author?: string | null;   // Blogs have authors
  type: 'blog' | 'news';
};

/* ---------------- MAIN SERVER COMPONENT ---------------- */

const UpdateDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  let update: UnifiedDetailItem | null = null;

  try {
    // 1. Attempt to find the slug inside the Blog table first
    const blogData = await prisma.blogUpdate.findUnique({
      where: { slug: slug, isPublished: true }
    });

    if (blogData) {
      update = {
        title: blogData.title,
        content: blogData.content,
        createdAt: blogData.createdAt,
        author: blogData.author,
        type: 'blog'
      };
    } else {
      // 2. If not found in blogs, check the News table
      const newsData = await prisma.newsUpdate.findUnique({
        where: { slug: slug, isPublished: true }
      });

      if (newsData) {
        update = {
          title: newsData.title,
          content: newsData.content,
          createdAt: newsData.createdAt,
          category: newsData.category,
          type: 'news'
        };
      }
    }
  } catch (error) {
    console.error("Database detail query exception:", error);
  }

  // If slug doesn't exist in either table, route to 404
  if (!update) {
    notFound();
  }

  // Safe categorization fallbacks for layout strings
  const displayCategory = update.type === 'news' ? (update.category || "General") : "Blogs";

  return (
    <>
      <Header />
      <section className="bg-gray-100 py-12 px-6 md:px-20 font-sans min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Breadcrumb Section */}
          <nav className="text-sm text-blue-600 mb-4 font-medium">
            Home / Updates / {displayCategory}
          </nav>

          <div className="flex gap-8">

            {/* LEFT SIDE: Content Presentation Module */}
            <article className="w-[85%]">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100">

                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  {displayCategory}
                </span>

                <h2 className="text-3xl md:text-3xl font-semibold text-gray-900 mb-6 leading-tight">
                  {update.title}
                </h2>

                <div className="flex items-center text-gray-400 text-sm mb-8 pb-8 border-b border-gray-200 gap-2">
                  <Calendar size={18} /><span>  {new Date(update.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <User size={18} />{update.author && <span> By {update.author}</span>}
                  <Timer size={18} /><span> 5 min read</span>
                </div>

                {/* DYNAMIC JSON CONTENT COMPONENT PARSER */}
                <div className="space-y-6 max-w-none text-gray-700">
                  {Array.isArray(update.content) ? (
                    (update.content as unknown as JSONContentBlock[]).map((block, index) => {
                      switch (block.type) {

                        case 'paragraph':
                          return (
                            <p key={index} className="text-lg leading-relaxed text-gray-600">
                              {block.text}
                            </p>
                          );

                        case 'heading':
                          const HeadingTag = block.level === 3 ? 'h3' : 'h2';
                          return (
                            <HeadingTag key={index} className={`font-bold text-gray-900 mt-8 mb-4 ${block.level === 3 ? 'text-xl' : 'text-2xl'}`}>
                              {block.text}
                            </HeadingTag>
                          );

                        case 'quote':
                          return (
                            <blockquote key={index} className="border-l-4 border-blue-600 pl-4 my-6 italic text-gray-600 bg-gray-50 p-4 rounded-r-xl">
                              <p className="text-lg">"{block.text}"</p>
                              {block.author && <cite className="block text-sm font-bold text-gray-400 mt-2 not-italic">— {block.author}</cite>}
                            </blockquote>
                          );

                        case 'list':
                          const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
                          return (
                            <ListTag key={index} className={`pl-6 my-4 space-y-2 text-lg text-gray-600 ${block.style === 'ordered' ? 'list-decimal' : 'list-disc'}`}>
                              {block.items?.map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ListTag>
                          );

                        case 'table':
                          return (
                            <div key={index} className="my-6 overflow-x-auto border border-gray-200 rounded-xl">
                              <table className="w-full text-left border-collapse">
                                <thead>
                                  <tr className="bg-gray-50 border-b border-gray-200">
                                    {block.headers?.map((head, i) => (
                                      <th key={i} className="p-4 font-bold text-gray-700 text-sm uppercase">{head}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {block.rows?.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b border-gray-100 hover:bg-gray-50/50">
                                      {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="p-4 text-sm text-gray-600">{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          );

                        case 'graph':
                          return (
                            <div key={index} className="my-8 p-6 border border-gray-200 rounded-2xl bg-gray-50/50 text-center">
                              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
                                📊 Chart: {block.title || "Statistics Data Breakdown"}
                              </p>
                              <div className="flex items-end justify-center gap-6 h-40 pt-4">
                                {block.data?.map((dataPoint, i) => (
                                  <div key={i} className="flex flex-col items-center gap-2 flex-1 max-w-15">
                                    <div
                                      className="w-full bg-blue-600 rounded-t-md transition-all hover:bg-blue-700"
                                      style={{ height: `${Math.min((dataPoint.value / 50) * 100, 100)}px` }}
                                    />
                                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                                      {dataPoint.label || dataPoint.year}: {dataPoint.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );

                        default:
                          return null;
                      }
                    })
                  ) : (
                    <p className="text-gray-400 italic">No structured visual layout data available for display.</p>
                  )}
                </div>
              </div>
            </article>

            {/* RIGHT SIDE: Sidebar capture container */}
            <aside className="space-y-8">
              <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl text-white">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Have a Quick Question?</h3>
                  <p className="text-blue-100 text-sm mb-8">
                    Get personalized guidance from one of our expert counsellors.
                  </p>

                  <form className="space-y-6">
                    <SidebarInput label="Name" placeholder="Your Name Here" />
                    <SidebarInput label="Phone Number" placeholder="+91 Your Number Here" />
                    <SidebarInput label="Email" placeholder="Your Mail ID Here" />

                    <button type="button" className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl mt-4 hover:bg-blue-50 ">
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

const SidebarInput = ({ label, placeholder }: { label: string, placeholder: string }) => (
  <div className="border-b border-blue-400 pb-2">
    <label className="block text-xs font-semibold mb-1 tracking-wider">{label}</label>
    <input
      type="text"
      placeholder={placeholder}
      className="bg-transparent w-full text-white placeholder-blue-200 outline-none text-sm"
    />
  </div>
);

export default UpdateDetailPage;
