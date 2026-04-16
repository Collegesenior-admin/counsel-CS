import { Metadata } from 'next';
import TNEACalculator from '../components/TNEACalculator';

export const metadata: Metadata = {
  title: 'TNEA Cutoff Calculator 2026 - Calculate Your Engineering Admission Rank',
  description: 'Calculate your TNEA cutoff marks and estimated rank for Tamil Nadu engineering college admissions. Free cutoff calculator with college predictions.',
  keywords: ['TNEA calculator', 'cutoff calculator', 'Tamil Nadu engineering', 'admission rank', 'college predictor'],
  openGraph: {
    title: 'TNEA Cutoff Calculator - Predict Your Engineering College',
    description: 'Calculate your TNEA cutoff and get college predictions for Tamil Nadu engineering admissions.',
    type: 'website',
  },
};

export default function CalculatorPage() {
  return <TNEACalculator />;
}