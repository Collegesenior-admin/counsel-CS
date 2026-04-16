# CollegeSenior - College Counseling Website

A comprehensive college counseling platform built with Next.js, helping students find the right colleges and courses in Tamil Nadu.

## 🚀 Features

- **College Search & Filtering** - Browse colleges by location, stream, and ranking
- **Course Discovery** - Explore courses with detailed information and fees
- **Expert Guidance** - Enquiry forms with email integration
- **SEO Optimized** - Dynamic pages with proper metadata
- **Responsive Design** - Works perfectly on all devices
- **Real-time Search** - Smart search with college/course detection

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** Supabase (PostgreSQL) + Prisma ORM
- **Styling:** Tailwind CSS
- **Email:** Resend API
- **Deployment:** Vercel
- **Language:** TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd college-senior
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in your database URL, Supabase keys, and Resend API key.

4. Set up the database:
```bash
npm run db:push
npm run db:seed
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The project uses Prisma with the following main models:
- `colleges` - College information and metadata
- `courses` - Course details and offerings
- `college_courses` - Many-to-many relationship
- `rankings` - College ranking data
- `faqs` - Frequently asked questions

## 📧 Email Configuration

The project uses Resend for sending enquiry emails:
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Add to `.env.local` as `RESEND_API_KEY`
4. Set `MANAGER_EMAIL` for receiving enquiries

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel deploy
```

3. Set environment variables in Vercel dashboard
4. Configure custom domain if needed

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🔧 Configuration

- **Sitemap:** Configured with `next-sitemap.config.js`
- **Images:** Remote patterns configured for college logos
- **SEO:** Metadata API used throughout
- **Forms:** Validation and session tracking implemented

## 📱 Pages Structure

- `/` - Homepage with search and featured content
- `/colleges` - College listing with filters
- `/colleges/[slug]` - Individual college details
- `/courses` - Course listing with filters
- `/about` - About page
- `/contact` - Contact page
- `/updates` - News and updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.
