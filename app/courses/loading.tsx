import Header from "../components/Header";
export default function Loading() {
  return (
    <div className="max-w-8xl mx-auto">
        {/* skeletom navbar section */}
      <Header />

      {/* 1. Skeleton Hero Section */}
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-3xl mb-10"></div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 2. Skeleton Sidebar (Filters) */}
        <aside className="hidden lg:block w-1/4 space-y-8">
          <div className="h-6 bg-gray-200 w-24 rounded mb-6"></div> {/* "Filters" title */}
          
          {[1, 2, 3].map((block) => (
            <div key={block} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
              {/* Category Title */}
              <div className="h-5 bg-gray-200 w-1/2 rounded mb-4"></div>
              
              {/* Search bar inside filter */}
              <div className="h-10 bg-gray-50 border border-gray-100 rounded-lg w-full mb-4"></div>
              
              {/* Checkbox Rows */}
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-gray-200 rounded"></div> {/* Checkbox */}
                  <div className="h-3 bg-gray-100 w-full rounded"></div> {/* Text */}
                </div>
              ))}
            </div>
          ))}
        </aside>

        {/* 3. Skeleton College Cards List */}
        <div className="flex-1 space-y-6">
          <div className="flex justify-between items-center mb-4">
             <div className="h-4 bg-gray-200 w-32 rounded"></div> {/* Result count */}
             <div className="h-10 bg-gray-100 w-40 rounded-xl"></div> {/* Sort dropdown */}
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-4 flex flex-col md:flex-row gap-6 shadow-sm animate-pulse">
              {/* College Image box */}
              <div className="w-full md:w-64 h-48 bg-gray-200 rounded-2xl shrink-0"></div>
              
              {/* College Content box */}
              <div className="flex-1 space-y-4 py-2">
                <div className="h-7 bg-gray-200 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
                  <div className="h-8 w-24 bg-gray-100 rounded-full"></div>
                </div>
                <div className="pt-6 flex justify-between items-center border-t border-gray-50 mt-4">
                   <div className="h-10 w-36 bg-indigo-50 rounded-xl"></div>
                   <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
