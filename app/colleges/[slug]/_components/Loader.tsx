"use client";

export default function Loader() {
  const words = [
    "Syllabus",
    "Fee Structure",
    "Eligibility",
    "Placements",
    "Scholarships",
    "Almost Ready...",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-1">
      {/* Cloud Loader */}
      <div className="cloud-loader">
        <svg
          id="cloud"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <defs>
            <filter id="roundness">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" />
              <feColorMatrix values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" />
            </filter>

            <mask id="shapes">
              <g fill="white">
                <polygon points="50 37.5 80 75 20 75 50 37.5" />
                <circle cx="20" cy="60" r="15" />
                <circle cx="80" cy="60" r="15" />

                <g>
                  <circle cx="20" cy="60" r="15" />
                  <circle cx="20" cy="60" r="15" />
                  <circle cx="20" cy="60" r="15" />
                </g>
              </g>
            </mask>

            <mask id="clipping" clipPathUnits="userSpaceOnUse">
              <g id="lines" filter="url(#roundness)">
                <g mask="url(#shapes)" stroke="white">
                  {Array.from({ length: 21 }).map((_, i) => (
                    <line
                      key={i}
                      x1="-50"
                      y1={-40 + i * 9}
                      x2="150"
                      y2={-40 + i * 9}
                    />
                  ))}
                </g>
              </g>
            </mask>
          </defs>

          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            mask="url(#clipping)"
          />
        </svg>
      </div>

      {/* Text Loader */}
      <div className="px-8 py-1 rounded-md">
        <div className="flex items-center justify-center text-2xl font-medium text-white h-10">
          <span className="mr-2">Getting</span>

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
          </div>
        </div>
      </div>
    </div>
  );
}
