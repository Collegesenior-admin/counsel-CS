import React from 'react';
import { MapPin, Award, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface SimilarCollege {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
  logo_url?: string | null;
  nirf_ranking?: number | null;
  ownership?: string | null;
}

interface SimilarCollegesSectionProps {
  colleges: SimilarCollege[];
  currentCity: string;
}

const SimilarCollegesSection: React.FC<SimilarCollegesSectionProps> = ({ colleges, currentCity }) => {
  if (colleges.length === 0) return null;

  return (
    <section className="bg-white p-3 lg:p-6 rounded-xl border border-gray-200 mt-6">
      <h3 className="text-md lg:text-lg font-bold text-gray-800 mb-4">More Colleges in {currentCity}</h3>
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-4 min-w-max">
          {colleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.slug}`}>
              <div className="w-72 shrink-0 p-5 border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-gradient-to-br from-white to-slate-50">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    {college.logo_url ? (
                      <Image src={college.logo_url} alt={college.name} width={56} height={56} className="w-14 h-14 object-contain rounded-lg border border-gray-200 bg-white p-1" />
                    ) : (
                      <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building2 size={24} className="text-blue-600" />
                      </div>
                    )}
                    <div className="flex-1">
                      {college.ownership && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase mb-1">
                          {college.ownership}
                        </span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mb-3 line-clamp-2 min-h-[40px]">{college.name}</h4>
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-100">
                      <MapPin size={14} className="text-blue-600" />
                      <span className="font-medium">{college.city}, {college.state}</span>
                    </div>
                    {college.nirf_ranking && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 bg-white px-3 py-2 rounded-lg border border-gray-100">
                        <Award size={14} className="text-amber-600" />
                        <span className="font-medium">NIRF Rank #{college.nirf_ranking}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarCollegesSection;
