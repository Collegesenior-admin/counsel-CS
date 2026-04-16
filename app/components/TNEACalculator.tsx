'use client';

import { useState } from 'react';
import { ArrowLeft, Calculator, TrendingUp, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CalculatorResult {
  cutoff: number;
  estimatedRank: string;
  collegeTier: string;
  eligibleColleges: string[];
}

export default function TNEACalculator() {
  const router = useRouter();
  const [marks, setMarks] = useState({
    mathematics: '',
    physics: '',
    chemistry: ''
  });
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (subject: string, value: string) => {
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setMarks(prev => ({ ...prev, [subject]: value }));
    }
  };

  const calculateCutoff = () => {
    const math = Number(marks.mathematics);
    const physics = Number(marks.physics);
    const chemistry = Number(marks.chemistry);

    if (!math || !physics || !chemistry) {
      alert('Please enter all three subject marks');
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      // TNEA cutoff formula: Math + Physics + Chemistry (normalized to 200)
      const cutoff = Math.round(((math + physics + chemistry) / 3) * 2);
      
      let estimatedRank = '';
      let collegeTier = '';
      let eligibleColleges: string[] = [];

      // Rank estimation based on cutoff
      if (cutoff >= 190) {
        estimatedRank = '1 - 5,000';
        collegeTier = 'Tier 1 (Top Colleges)';
        eligibleColleges = ['Anna University', 'IIT Madras', 'NIT Trichy', 'PSG College', 'SSN College'];
      } else if (cutoff >= 170) {
        estimatedRank = '5,000 - 15,000';
        collegeTier = 'Tier 2 (Good Colleges)';
        eligibleColleges = ['VIT Chennai', 'SRM University', 'Thiagarajar College', 'CEG Campus', 'MIT Campus'];
      } else if (cutoff >= 150) {
        estimatedRank = '15,000 - 35,000';
        collegeTier = 'Tier 3 (Average Colleges)';
        eligibleColleges = ['Rajalakshmi Engineering', 'Sri Venkateswara College', 'Easwari Engineering', 'Panimalar Engineering'];
      } else if (cutoff >= 130) {
        estimatedRank = '35,000 - 60,000';
        collegeTier = 'Tier 4 (Decent Options)';
        eligibleColleges = ['Vel Tech University', 'Hindustan University', 'St. Joseph College', 'Meenakshi College'];
      } else {
        estimatedRank = '60,000+';
        collegeTier = 'Tier 5 (Basic Colleges)';
        eligibleColleges = ['Various Private Colleges', 'Self-Financing Colleges'];
      }

      setResult({
        cutoff,
        estimatedRank,
        collegeTier,
        eligibleColleges
      });
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculator = () => {
    setMarks({ mathematics: '', physics: '', chemistry: '' });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">TNEA Cutoff Calculator 2026</h1>
              <p className="text-gray-600">Calculate your cutoff marks and predict your engineering college admission chances</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter Your 12th Standard Marks</h2>
                <p className="text-gray-600 text-sm">Enter your marks out of 100 for each subject</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-gray-700 font-medium mb-3">Mathematics</label>
                  <input
                    type="number"
                    placeholder="e.g. 95"
                    value={marks.mathematics}
                    onChange={(e) => handleInputChange('mathematics', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Out of 100</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-3">Physics</label>
                  <input
                    type="number"
                    placeholder="e.g. 92"
                    value={marks.physics}
                    onChange={(e) => handleInputChange('physics', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Out of 100</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-3">Chemistry</label>
                  <input
                    type="number"
                    placeholder="e.g. 88"
                    value={marks.chemistry}
                    onChange={(e) => handleInputChange('chemistry', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Out of 100</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={calculateCutoff}
                  disabled={isCalculating}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Cutoff'}
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How TNEA Cutoff Works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• TNEA cutoff is calculated based on your 12th standard marks in Mathematics, Physics, and Chemistry</p>
                <p>• The formula normalizes your marks to a 200-point scale</p>
                <p>• Higher cutoff scores increase your chances of getting into top engineering colleges</p>
                <p>• Rank estimation is based on previous year trends and may vary</p>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg shadow-lg p-6 text-gray-900">
              <h3 className="text-lg font-semibold mb-6">Your Results</h3>
              
              {result ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center mb-2">
                      <Calculator className="w-5 h-5 mr-2" />
                      <span className="font-medium">TNEA Cutoff</span>
                    </div>
                    <div className="text-3xl font-bold">{result.cutoff}/200</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span className="font-medium">Estimated Rank</span>
                    </div>
                    <div className="text-xl font-semibold">{result.estimatedRank}</div>
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="font-medium">College Tier</span>
                    </div>
                    <div className="text-lg font-semibold">{result.collegeTier}</div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Eligible Colleges</h4>
                    <div className="space-y-2">
                      {result.eligibleColleges.map((college, index) => (
                        <div key={index} className="bg-white bg-opacity-20 rounded px-3 py-2 text-sm">
                          {college}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    data-application-button
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Get Admission Guidance
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-700">Enter your marks and calculate to see your results</p>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
              <p className="text-blue-800 text-sm mb-3">Get personalized college counseling and admission guidance</p>
              <button 
                data-application-button
                className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                Talk to Counselor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}