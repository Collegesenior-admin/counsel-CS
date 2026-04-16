import Link from 'next/link';
import Image from 'next/image';

const TOP_CITIES = [
  { 
    name: 'Chennai', 
    image: '/Chennai_Central.jpg', 
    description: '120+ Colleges'
  },
  { 
    name: 'Coimbatore', 
    image: '/Kovai.jpg', 
    description: '85+ Colleges'
  },
  { 
    name: 'Madurai', 
    image: '/Chennai_Central.jpg', 
    description: '40+ Colleges'
  },
  { 
    name: 'Trichy', 
    image: '/Kovai.jpg', 
    description: '35+ Colleges'
  }
];

export default function CityGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-[#001B44]">Explore Top Cities</h2>
            <p className="text-gray-500 mt-2">Find the best institutions in your preferred location</p>
          </div>
          <Link href="/colleges" className="text-indigo-600 font-bold hover:underline hidden md:block">
            View All Cities →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOP_CITIES.map((city) => (
            <Link 
              key={city.name} 
              href={`/colleges?city=${city.name}`}
              className="group relative h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image with Next.js Optimization */}
              <Image 
                src={city.image} 
                alt={city.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

              {/* Text Area */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Explore</p>
                <h3 className="text-white text-2xl font-bold">{city.name}</h3>
                <div className="flex items-center justify-between mt-2 overflow-hidden">
                   <span className="text-gray-300 text-sm">{city.description}</span>
                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-full -mr-12 group-hover:mr-0 transition-all duration-300">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                   </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}