import type { Metadata } from "next";
import "./globals.css";
// import Script from "next/script";

export const metadata: Metadata = {
  title: 'College Counseling - Find Best Colleges & Courses in India',
  description: 'Discover top colleges, courses, admissions, fees, and placements. Get expert guidance for your higher education journey in India.',
  metadataBase: new URL('https://yourdomain.com'),
  keywords: ['college admissions', 'engineering colleges', 'courses', 'fees', 'placements', 'education'],
  openGraph: {
    title: 'College Counseling - Find Best Colleges & Courses',
    description: 'Expert guidance for college admissions, courses, and career planning.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
