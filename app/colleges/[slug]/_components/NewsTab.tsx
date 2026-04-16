import React from 'react'; import { ChevronRight, ImageIcon, Tag } from 'lucide-react'; // Types for your news structure 
interface NewsContent { title: string; content: string; is_breaking?: boolean; image_url?: string; }
interface NewsRecord { id: number; category: string; published_date: string | Date; news_data: NewsContent; } 
interface NewsTabProps { news: NewsRecord[]; collegeName: string; }
const NewsTab: React.FC<NewsTabProps> = ({ news, collegeName }) => {
  if (!news || news.length === 0) {
    return (
      <div className="py-16 sm:py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
        <p className="text-slate-400 italic text-sm sm:text-base">
          No recent updates available for {collegeName}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-4 m-3">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[11px] sm:text-xs font-bold text-slate-600 shadow-sm w-fit">
          Total Updates: {news.length}
        </span>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

        {/* LEFT: News List */}
        <div className="lg:col-span-2 space-y-2 sm:space-y-2">

          {news.map((item) => {
            const data = item.news_data;

            return (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-4 sm:p-5 bg-white rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300"
              >

                {/* Image */}
                <div className="w-full sm:w-40 md:w-52 h-40 sm:h-32 md:h-40 rounded-xl overflow-hidden shrink-0">
                  {data.image_url ? (
                    <img
                      src={data.image_url}
                      alt={data.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                      <ImageIcon className="text-slate-300" size={36} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {data.is_breaking && (
                      <span className="text-[9px] font-black text-white bg-red-500 px-2 py-0.5 rounded-full uppercase animate-pulse">
                        Breaking
                      </span>
                    )}

                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                    {data.title}
                  </h3>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 leading-relaxed">
                    {data.content}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 sm:mt-4 flex items-center justify-between">
                    <button className="text-[11px] sm:text-xs font-bold text-slate-400 group-hover:text-blue-600 flex items-center gap-1 transition-colors">
                      Read Full Article <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Sidebar */}
        <div className="space-y-5 sm:space-y-6">

          <div className="p-5 sm:p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm mb-4 flex items-center gap-2">
              <Tag size={16} /> Categories
            </h4>

            <div className="flex flex-wrap gap-2">
              {['Admissions', 'Placements', 'Events', 'Exam'].map(cat => (
                <button
                  key={cat}
                  className="px-3 py-1 bg-white border border-blue-100 rounded-lg text-[11px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NewsTab;
