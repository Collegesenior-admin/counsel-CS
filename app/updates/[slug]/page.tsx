import React from 'react';
import Header from "../../components/Header";
import Footer from '../../components/Footer';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
// import { updates as UpdateType } from '@prisma/client';

const UpdateDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  // Fetch the specific update from Supabase
  const update = await prisma.updates.findUnique({
    where: { slug: slug }
  });

  // If the slug doesn't exist, show the 404 page
  if (!update) {
    notFound();
  }

  return (
    <>
      <Header />
      <section className="bg-gray-100 py-12 px-6 md:px-20 font-sans min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb - Matching your theme */}
          <nav className="text-sm text-blue-600 mb-4 font-medium">
            Home / Updates / {update.category}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Article Content (Left Side) */}
            <article className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
                <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  {update.category}
                </span>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {update.title}
                </h1>

                <div className="flex items-center text-gray-400 text-sm mb-8 pb-8 border-b border-gray-100">
                  <span className="mr-4">📅 {new Date(update.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>⏱️ 5 min read</span>
                </div>

                {/* Article Body */}
                <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed space-y-6">
                  {update.content.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar Form (Right side) - Matching your exact design */}
            <aside className="space-y-8">
              <div className="bg-blue-600 rounded-2xl overflow-hidden shadow-xl text-white sticky top-24">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">Have a Quick Question?</h3>
                  <p className="text-blue-100 text-sm mb-8">
                    Get personalized guidance from one of our expert counsellors.
                  </p>

                  <form className="space-y-6">
                    <SidebarInput label="Name" placeholder="Your Name Here" />
                    <SidebarInput label="Phone Number" placeholder="+91 Your Number Here" />
                    <SidebarInput label="Email" placeholder="Your Mail ID Here" />

                    <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl mt-4 hover:bg-blue-50 transition shadow-lg">
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

// Reuse your SidebarInput component for consistency
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

export default UpdateDetailPage;
