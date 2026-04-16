'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong...!</h1>
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400 font-mono bg-gray-100 px-3 py-1 rounded">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Home size={16} />
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
