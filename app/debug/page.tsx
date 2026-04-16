'use client';

import { prisma } from '@/lib/prisma';
import { useEffect, useState } from 'react';

export default function DebugPage() {
  const [debugData, setDebugData] = useState({
    dbStatus: 'Loading...',
    collegeCount: 0,
    sampleCollege: null,
    envStatus: {}
  });

  useEffect(() => {
    async function fetchDebugData() {
      try {
        const response = await fetch('/api/debug');
        const data = await response.json();
        
        setDebugData({
          dbStatus: data.status === 'success' ? 'Connected' : `Error: ${data.message}`,
          collegeCount: data.counts?.colleges || 0,
          sampleCollege: data.sampleData || null,
          envStatus: data.environment || {}
        });
      } catch (error: any) {
        setDebugData(prev => ({
          ...prev,
          dbStatus: `Error: ${error.message}`
        }));
      }
    }

    fetchDebugData();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Database Debug Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
          <pre className="text-sm">{JSON.stringify(debugData.envStatus, null, 2)}</pre>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Database Status</h2>
          <p><strong>Status:</strong> {debugData.dbStatus}</p>
          <p><strong>College Count:</strong> {debugData.collegeCount}</p>
        </div>

        {debugData.sampleCollege && (debugData.sampleCollege as any).logo_url && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">Sample College Data</h2>
            <pre className="text-sm">{JSON.stringify(debugData.sampleCollege, null, 2)}</pre>
            
            <div className="mt-4">
              <h3 className="font-semibold">Logo Test:</h3>
              <img 
                src={(debugData.sampleCollege as any).logo_url} 
                alt="College Logo" 
                className="w-20 h-20 object-contain border"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.border = '2px solid red';
                  (e.target as HTMLImageElement).alt = 'Image failed to load';
                }}
              />
              <p className="text-sm text-gray-600">URL: {(debugData.sampleCollege as any).logo_url}</p>
            </div>
          </div>
        )}

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Public Images Test</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <img src="/avit.png" alt="AVIT" className="w-20 h-20 object-contain border" />
              <p className="text-sm">/avit.png</p>
            </div>
            <div>
              <img src="/Hero.webp" alt="Hero" className="w-20 h-20 object-contain border" />
              <p className="text-sm">/Hero.webp</p>
            </div>
            <div>
              <img src="/logoblue.svg" alt="Logo" className="w-20 h-20 object-contain border" />
              <p className="text-sm">/logoblue.svg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
