import React from 'react';
import { TrendingUp, TrendingDown, Minus, Award, BarChart3, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RankingItem } from './types';

interface RankingTabProps {
  rankings: RankingItem[];
  collegeName?: string;
  collegeNirfRank?: number | null;
  structuredData?: {
    current_year?: number;
    prev_year?: number;
    intro_template?: string;
    comparison_template?: string;
  };
}

const RankingTab: React.FC<RankingTabProps> = ({ rankings, collegeName, collegeNirfRank, structuredData }) => {
  // Helper function to decode HTML entities
  const decodeHtml = (html: string) => {
    if (typeof window === 'undefined') {
      // Server-side: Use a simple regex-based approach
      return html
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
    }
    // Client-side: Use DOM method
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  
  // Process rankings data to decode HTML entities and flatten the nested structure
  const processedRankings = rankings?.map(orgItem => ({
    ...orgItem,
    org: orgItem.org ? decodeHtml(orgItem.org) : orgItem.org,
    data: orgItem.data?.map(dataItem => ({
      ...dataItem,
      stream: dataItem.stream ? decodeHtml(dataItem.stream) : dataItem.stream,
      desc: dataItem.desc ? decodeHtml(dataItem.desc) : dataItem.desc,
      score: dataItem.score ? decodeHtml(dataItem.score) : dataItem.score
    })) || []
  })) || [];
  
  // Process structured data to decode HTML entities
  const processedStructuredData = structuredData ? {
    ...structuredData,
    intro_template: structuredData.intro_template ? decodeHtml(structuredData.intro_template) : structuredData.intro_template,
    comparison_template: structuredData.comparison_template ? decodeHtml(structuredData.comparison_template) : structuredData.comparison_template
  } : undefined;
  
  // If no ranking data exists, show basic NIRF rank or placeholder
  if (!processedRankings || processedRankings.length === 0) {
    if (collegeNirfRank) {
      return (
        <div className="space-y-8">
          {/* Basic NIRF Ranking Display */}
          <div className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                NIRF Ranking 2024
              </h2>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                #{collegeNirfRank}
              </div>
              <p className="text-gray-600 mb-4">
                {collegeName} is ranked #{collegeNirfRank} in India according to NIRF (National Institutional Ranking Framework)
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium">
                <Info className="w-4 h-4 mr-2" />
                National Institutional Ranking Framework
              </div>
            </div>
          </div>

          {/* Ranking Context */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About NIRF Rankings</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ranking Methodology</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Teaching, Learning & Resources (30%)</li>
                  <li>• Research and Professional Practice (30%)</li>
                  <li>• Graduation Outcomes (20%)</li>
                  <li>• Outreach and Inclusivity (10%)</li>
                  <li>• Perception (10%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Ranking Categories</h4>
                <p className="text-sm">
                  NIRF ranks institutions across various categories including Overall, 
                  Universities, Engineering, Management, Pharmacy, Medical, Law, 
                  Architecture, and Research Institutions.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Indicator */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ranking Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current NIRF Rank</p>
                <p className="text-2xl font-bold text-blue-600">#{collegeNirfRank}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Performance Level</p>
                <p className="text-lg font-semibold text-gray-900">
                  {collegeNirfRank <= 50 ? 'Top Tier' : 
                   collegeNirfRank <= 100 ? 'Excellent' : 
                   collegeNirfRank <= 200 ? 'Very Good' : 
                   collegeNirfRank <= 300 ? 'Good' : 'Recognized'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // No ranking data at all
    return (
      <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
        <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ranking Information</h3>
        <p className="text-slate-400 italic mb-4">Detailed ranking records are not available at this time.</p>
        <p className="text-sm text-gray-500">
          {collegeName} may be a newer institution or ranking data is being updated. 
          Please check back later for the latest ranking information.
        </p>
      </div>
    );
  }

  const agencies = processedRankings.map(item => item.org);

  // Get years from processedStructuredData or use defaults
  const currentYear = processedStructuredData?.current_year || 2026;
  const prevYear = processedStructuredData?.prev_year || 2025;

  // Flatten all data for easier processing
  const allRankingData = processedRankings.flatMap(orgItem => 
    orgItem.data.map(dataItem => ({
      org: orgItem.org,
      ...dataItem
    }))
  );

  // 1. Get current year rankings (including non-ranked certifications)
  const currentRankings = allRankingData.filter(r => r.year === currentYear);
  const rankedItems = currentRankings.filter(r => r.rank !== null && r.rank !== undefined);
  const certificationItems = currentRankings.filter(r => r.rank === null || r.rank === undefined);

  // 2. Helper to find previous year's rank for trend calculation
  const getTrend = (org: string, stream: string, currentRank: number) => {
    const prev = allRankingData.find(r => r.org === org && r.stream === stream && r.year === prevYear);
    if (!prev || prev.rank === null) return null;
    const diff = prev.rank - currentRank;
    return diff;
  };

  // 3. Prepare data for the Line Chart (find the best organization with multiple years of ranked data)
  const rankedOrgs = [...new Set(allRankingData.filter(r => r.rank !== null).map(r => r.org))];
  let chartData: any[] = [];
  let chartOrgName = '';
  
  // Find the organization with the most years of ranked data
  for (const org of rankedOrgs) {
    const orgData = allRankingData
      .filter(r => r.org === org && r.rank !== null)
      .sort((a, b) => a.year - b.year);
    
    if (orgData.length >= 2 && orgData.length > chartData.length) {
      chartData = orgData;
      chartOrgName = org;
    }
  }

  // Check if we should show the chart (only if we have multiple years of data)
  const shouldShowChart = chartData.length >= 2;

  // Helper function to get ranking performance level
  const getRankingLevel = (rank: number) => {
    if (rank <= 10) return { level: 'Elite', color: 'text-green-600', bg: 'bg-green-100' };
    if (rank <= 50) return { level: 'Top Tier', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (rank <= 100) return { level: 'Excellent', color: 'text-indigo-600', bg: 'bg-indigo-100' };
    if (rank <= 200) return { level: 'Very Good', color: 'text-purple-600', bg: 'bg-purple-100' };
    if (rank <= 300) return { level: 'Good', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Recognized', color: 'text-gray-600', bg: 'bg-gray-100' };
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* SECTION 1: RANKED INSTITUTIONS */}
      {rankedItems.length > 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-md md:text-xl font-bold text-gray-900 mb-2">Ranking Achievements {currentYear}</h2>
            <p className="text-gray-600 text-sm md:text-md">Official rankings from recognized ranking agencies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rankedItems.map((item, idx) => {
              const trend = getTrend(item.org, item.stream, item.rank!);
              const rankLevel = getRankingLevel(item.rank!);
              
              return (
                <div key={idx} className={`p-3 lg:p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all bg-white border-gray-200`}>
                  <div className="flex justify-between items-start ">
                    <div className={`p-2 mb-2 rounded-xl ${rankLevel.bg}`}>
                      <Award size={20} className={rankLevel.color} />
                    </div>
                    {trend !== null && (
                      <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        trend > 0 ? 'bg-green-50 text-green-600' : trend < 0 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                      }`}>
                        {trend > 0 ? <TrendingUp size={12} /> : trend < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
                        {trend === 0 ? 'Stable' : Math.abs(trend)}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{item.org}</p>
                  <h4 className="text-2xl font-bold text-slate-800 mt-1">{item.rank}</h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium mb-3">{item.stream}</p>
                  <div className={` px-2 py-1 rounded-full text-[10px] font-medium ${rankLevel.bg} ${rankLevel.color} inline-block`}>
                    {rankLevel.level}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed my-2">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* SECTION 2: CERTIFICATIONS & ACCREDITATIONS */}
      {certificationItems.length > 0 && (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Accreditations & Certifications {currentYear}</h2>
            <p className="text-gray-600 text-sm">Quality certifications and institutional accreditations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {certificationItems.map((item, idx) => {
              const getAccreditationColor = (org: string) => {
                if (org.includes('NAAC')) return { bg: 'bg-green-50', color: 'text-green-600', border: 'border-green-200' };
                if (org.includes('NIRF')) return { bg: 'bg-blue-50', color: 'text-blue-600', border: 'border-blue-200' };
                if (org.includes('ISO')) return { bg: 'bg-purple-50', color: 'text-purple-600', border: 'border-purple-200' };
                return { bg: 'bg-gray-50', color: 'text-gray-600', border: 'border-gray-200' };
              };
              
              const colors = getAccreditationColor(item.org);
              
              return (
                <div key={idx} className={`p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all bg-white ${colors.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-xl ${colors.bg}`}>
                      <Award size={20} className={colors.color} />
                    </div>
                    {item.score && item.score !== 'N/A' && (
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.color}`}>
                        {item.score}
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{item.org}</p>
                  <h4 className={`text-lg font-bold mt-1 mb-2 ${colors.color}`}>
                    {item.org.includes('NAAC') ? 'NAAC Accredited' :
                     item.org.includes('NIRF') ? 'NIRF Participant' :
                     item.org.includes('ISO') ? 'ISO Certified' : 'Certified'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 font-medium mb-3">{item.stream}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      )}


      {/* SECTION 4: AGENCY-WISE DETAILED TABLES */}
      {processedRankings.length > 0 && processedRankings.map((orgItem) => {
        const agency = orgItem.org;
        const orgData = orgItem.data;
        
        // Get current and previous year data
        const currentRecord = orgData.find(d => d.year === currentYear);
        const prevRecord = orgData.find(d => d.year === prevYear);
        
        // Get all available years for this organization
        const availableYears = [...new Set(orgData.map(d => d.year))].sort((a, b) => b - a);

        // Determine status for comparison
        let statusText = "consistent performance";
        if (currentRecord && prevRecord && currentRecord.rank !== null && prevRecord.rank !== null) {
          statusText = currentRecord.rank < prevRecord.rank ? "improvement" : "slight dip";
        }

        // Use templates from structured_data
        const introText = processedStructuredData?.intro_template
          ? processedStructuredData.intro_template
              .replace(/{agency}/g, agency)
              .replace(/{current_year}/g, String(currentYear))
              .replace(/{rank}/g, currentRecord?.rank ? String(currentRecord.rank) : (currentRecord?.score || 'N/A'))
              .replace(/{stream}/g, currentRecord?.stream || 'Overall')
          : `The institution has been featured in the ${agency} ${currentYear} rankings. According to the ${agency} Ranking ${currentYear}, the college is ${currentRecord?.rank ? `ranked ${currentRecord.rank}` : `certified with ${currentRecord?.score || 'recognition'}`} in the ${currentRecord?.stream || 'Overall'} category. The rankings reflect the institution's consistent efforts toward academic growth and student development.`;

        const comparisonText = processedStructuredData?.comparison_template
          ? processedStructuredData.comparison_template
              .replace(/{agency}/g, agency)
              .replace(/{status}/g, statusText)
              .replace(/{stream}/g, currentRecord?.stream || 'Overall')
          : `The table below shows ${agency} ranking trends across major categories. The institution has shown ${statusText} in the ${currentRecord?.stream || 'Overall'} category compared to the previous year.`;

        return (
          <section key={agency} className="ranking-agency-block mb-6">
            <div className="mb-6">
              <h2 className="text-md md:text-xl font-bold text-slate-800 mb-3">
                {collegeName} {agency} Ranking {currentYear}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{introText}</p>

              <h3 className="text-sm md:text-md font-bold text-slate-800 mb-2">
                {collegeName} {agency} Historical Performance
              </h3>
              <p className="text-sm text-slate-500 mb-4 italic">
                {comparisonText}
              </p>
            </div>

            {/* Multi-Year Ranking Comparison Table */}
            <div className="overflow-scroll rounded-2xl border border-slate-200 shadow-sm bg-white mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Year</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider border-b">Category/Stream</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-700 border-b">Rank/Score</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-700 border-b">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {availableYears.map((year, index) => {
                    const yearData = orgData.find(d => d.year === year);
                    const prevYearData = orgData.find(d => d.year === year - 1);
                    
                    return (
                      <tr key={year} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-bold text-slate-800">{year}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">{yearData?.stream || 'Overall'}</td>
                        <td className="px-6 py-4 text-sm font-bold">
                          {yearData?.rank ? (
                            <span className="text-blue-600">{yearData.rank}</span>
                          ) : (
                            <span className="text-green-600">{yearData?.score || 'N/A'}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {yearData && prevYearData && yearData.rank !== null && prevYearData.rank !== null ? (
                            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                              yearData.rank < prevYearData.rank ? 'bg-green-50 text-green-600' : 
                              yearData.rank > prevYearData.rank ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-500'
                            }`}>
                              {yearData.rank < prevYearData.rank ? (
                                <><TrendingUp size={12} /> +{prevYearData.rank - yearData.rank}</>
                              ) : yearData.rank > prevYearData.rank ? (
                                <><TrendingDown size={12} /> -{yearData.rank - prevYearData.rank}</>
                              ) : (
                                <><Minus size={12} /> Stable</>
                              )}
                            </div>
                          ) : index === availableYears.length - 1 ? (
                            <span className="text-slate-400 text-xs">Baseline</span>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Current Year Description */}
            {currentRecord?.desc && (
              <div className="bg-slate-50 rounded-xl p-3 mb-4">
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  {currentYear} {agency} Performance
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentRecord.desc}
                </p>
              </div>
            )}

            {/* Historical Context */}
            {orgData.length > 1 && (
              <div className="bg-blue-50 rounded-xl p-3">
                <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <BarChart3 size={16} className="text-blue-600" />
                  Historical Performance Summary
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div>
                    <p className="font-medium text-slate-800 mb-1">Performance Trend:</p>
                    <p>{orgData.filter(d => d.rank !== null).length > 1 ? 
                      'Multi-year ranking data available' : 
                      'Consistent participation/certification'}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 mb-1">Years of Data:</p>
                    <p>{availableYears.length} years ({Math.min(...availableYears)} - {Math.max(...availableYears)})</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-3 flex justify-end">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2">
                {agency} Rankings
              </span>
            </div>
          </section>
        );
      })}
      {/* SECTION 3: TREND GRAPH & TABLE */}
      {shouldShowChart && rankedItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:flex gap-5 md:gap-8">
          
          {/* Left: Trend Graph */}
          <div className="lg:w-3/5 bg-white p-3 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="md:flex items-center justify-between mb-8">
              <h3 className="text-md lg:text-lg font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="text-blue-600" size={20} /> {chartOrgName} Ranking Progress ({prevYear} - {currentYear})
              </h3>
              <span className="text-[10px] font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500">Multi-Year Trend</span>
            </div>
            
            <div className="h-60 md:h-75 mr-3 -ml-5">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="10 10" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={true} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis reversed axisLine={true} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={['auto', 'auto']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 17px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rank" 
                    stroke="#fcd34d" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#fcd34d', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Score Breakdown */}
          <div className="bg-[#0d68f2] lg:w-2/5 text-white rounded-3xl p-4 md:p-8  relative overflow-hidden">
            <Info className="absolute -right-4 -top-4 size-24 text-blue-500" />
            <h3 className="text-md md:text-lg font-bold mb-6">Why this Rank?</h3>
            <div className="space-y-6">
              {currentRankings.slice(0, 2).map((item, i) => (
                <div key={i} className="border-l-2 border-white-600 pl-4">
                  <p className="text-xs font-bold text-white uppercase ">{item.org} - {item.stream}</p>
                  <p className="text-sm mt-2 italic">
                    {item.desc || `Ranked #${item.rank} based on comprehensive evaluation of academic excellence, research output, and institutional performance.`}
                  </p>
                  {item.score && (
                    <div className="mt-2 text-[10px] bg-white/10 w-fit px-2 py-0.5 rounded font-mono">
                      Score: {item.score}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
          <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ranking Trends</h3>
          <p className="text-gray-500 text-sm">
            Multi-year ranking data is not available. Current ranking information is displayed above.
          </p>
        </div>
      )}
    </div>
  );
};

export default RankingTab;
