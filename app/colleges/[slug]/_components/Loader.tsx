"use client";

export default function Loader() {
  const words = [
    "Collecting",
    "Syllabus",
    "Fee Structure",
    "Eligibility",
    "Scholarships",
    "Almost Ready...",
  ];

  return (
    <div className="bg-white px-8 py-1 rounded-md backdrop-blur-2xl">
      <div className="flex items-center justify-center text-[24px] font-medium text-gray-400 h-10">
        <span className="mr-2">Getting </span>

        <div className="relative ml-2 h-10 overflow-hidden">
          <div className="loader-words">
            {[...words, ...words].map((word, index) => (
              <span
                key={index}
                className="block h-10 leading-10 text-[#0d68f2]"
              >
                {word}
              </span>
            ))}
          </div>

          <div className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}