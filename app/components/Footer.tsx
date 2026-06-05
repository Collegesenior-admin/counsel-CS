import Link from 'next/link';

export default function FredFooter() {
  return (
    <footer className="relative bg-[#0f0f0f] overflow-hidden font-poppins max-w-387 mx-auto">

      {/* GRID BACKGROUND */}
      <div
        className="
          absolute inset-0 z-0 pointer-events-none max-w-387
          bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)]
          bg-size-[32px_32px]
          mask-[radial-gradient(ellipse_80%_80%_at_100%_100%,#000_50%,transparent_90%)]
          [-webkit-mask-image:radial-gradient(ellipse_80%_80%_at_100%_100%,#000_50%,transparent_90%)]
        "
      />

      <div className="relative z-10 max-w-400 mx-auto px-15 pt-20 pb-10 max-[1168px]:px-10 max-[1168px]:pt-15 max-[1168px]:pb-8 max-[699px]:px-6 max-[699px]:pt-12 max-[699px]:pb-7">

        {/* TOP */}
        <div className="flex gap-20 items-center max-[1168px]:flex-col max-[1168px]:gap-10 max-[1168px]:mb-12 max-[699px]:gap-9 max-[699px]:mb-8">

          {/* LEFT */}
          <div
            className="
              w-75
              flex flex-col gap-6
              max-[1168px]:w-full
              max-[1168px]:flex-row
              max-[1168px]:items-start
              max-[1168px]:gap-8
              max-[1168px]:flex-wrap

              max-[699px]:flex-col
              max-[699px]:items-center
              max-[699px]:text-center
              max-[699px]:gap-5
            "
          >

            {/* LOGO */}
            <div className="shrink-0">
              <img
                src="https://scriptens.com/wp-content/uploads/2026/05/khfvbsdfbsd.svg"
                alt="Logo"
                className="h-11 w-auto block"
              />
            </div>

            {/* DESCRIPTION */}
            <p
              className="
                text-[14px]
                text-[#777]
                leading-[1.8]
                m-0

                max-[1168px]:flex-1
                max-[1168px]:min-w-50
              "
            >
              Helping students find the right college and secure admissions
              across Tamil Nadu with expert guidance and smart tools.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-2 items-center max-[699px]:justify-center">

              {/* FACEBOOK */}
              <Link
                href="#"
                aria-label="Facebook"
                className="w-9.5 h-9.5 rounded-full border border-[#2a2a2a] text-[#666] flex items-center justify-center transition-all duration-300 hover:bg-[#1e1e1e] hover:text-white hover:border-[#444]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </Link>

              {/* INSTAGRAM */}
              <Link
                href="#"
                aria-label="Instagram"
                className="w-9.5 h-9.5 rounded-full border border-[#2a2a2a] text-[#666] flex items-center justify-center transition-all duration-300 hover:bg-[#1e1e1e] hover:text-white hover:border-[#444]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </Link>

              {/* TWITTER */}
              <Link
                href="#"
                aria-label="Twitter"
                className="w-9.5 h-9.5 rounded-full border border-[#2a2a2a] text-[#666] flex items-center justify-center transition-all duration-300 hover:bg-[#1e1e1e] hover:text-white hover:border-[#444]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>

              {/* LINKEDIN */}
              <Link
                href="#"
                aria-label="LinkedIn"
                className="w-9.5 h-9.5 rounded-full border border-[#2a2a2a] text-[#666] flex items-center justify-center transition-all duration-300 hover:bg-[#1e1e1e] hover:text-white hover:border-[#444]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div
            className="
              flex-1
              grid
              grid-cols-4
              gap-10

              max-[1168px]:w-full
              max-[1168px]:gap-6

              max-[699px]:grid-cols-1
              max-[699px]:gap-0
            "
          >

            {/* COLUMN */}
            {[
              {
                title: 'Quick Links',
                links: ['About Us', 'Explore Colleges', 'View Courses'],
              },
              {
                title: 'Support',
                links: ['Updates', 'Cutoff Calculator', 'Contact Us'],
              },
              {
                title: 'Legal',
                links: ['Terms & Conditions', 'Privacy Policy'],
              },
            ].map((col, i) => (
              <div
                key={i}
                className="
                  max-[699px]:
                  grid
                  max-[699px]:grid-cols-2
                  justify-start
                  py-5
                  border-y
                  border-[#1e1e1e]
                  gap-4
                "
              >
                <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#494949] mb-6 max-[1168px]:text-[13px] max-[1168px]:mb-0 max-[699px]:m-0">
                  {col.title}
                </h4>

                <ul className="flex flex-col gap-3.5 max-[1168px]:gap-2.5">
                  {col.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href="#"
                        className="text-[14px] max-[1168px]:text-[15px] text-[#999] hover:text-white transition-colors leading-normal"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* CONTACT */}
            <div
              className="
                max-[1548px]:
                flex
                max-[2590px]:flex-col
                py-5
                border-t
                border-[#1e1e1e]
              "
            >
              <h4 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#494949] mb-6 max-[1168px]:text-[13px] max-[1168px]:mb-4">
                Contact
              </h4>

              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="tel:+919500000763"
                    className="text-[14px] max-[699px]:text-[20px] text-[#999] hover:text-white transition-colors leading-normal"
                  >
                    +91 95*****763
                  </Link>
                </li>

                <li>
                  <Link
                    href="mailto:counselling@collegesenior.in"
                    className="text-[14px] max-[699px]:text-[20px] text-[#999] hover:text-white transition-colors leading-normal"
                  >
                    counselling@collegesenior.in
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-[#1e1e1e] mb-8" />

        {/* BOTTOM */}
        <div className="flex justify-center">
          <p className="text-[12px] max-[699px]:text-[11px] text-[#8b8b8b] text-center leading-[1.6]">
            © 2026 SUVISOFT EDUCATION SERVICES PRIVATE LIMITED. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
