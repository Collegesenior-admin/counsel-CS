'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StepData {
  step: string;
  title: string;
  description: string;
}

const stepsData: StepData[] = [
  {
    step: 'Step 1',
    title: 'Apply Online',
    description: 'Submit your academic details, course preferences, and career goals through our simple online application form.',
  },
  {
    step: 'Step 2',
    title: 'Personal Counseling',
    description: 'Get personalised career guidance and college admission support from experienced counselors.',
  },
  {
    step: 'Step 3',
    title: 'Shortlisting & Applications',
    description: 'We shortlist the right colleges for your profile and handle the complete application process.',
  },
  {
    step: 'Step 4',
    title: 'Admission Completion',
    description: 'From offer letters to enrollment, we assist you through every final admission step.',
  },
];

export default function CollegeJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [desktopLineOpacity, setDesktopLineOpacity] = useState('opacity-100');

  // NEW: Controls whether width scaling is animated or instant
  const [desktopTransitionClass, setDesktopTransitionClass] = useState('transition-[width] ease-linear duration-[2000ms]');

  // Desktop Animation States
  const [desktopWidth, setDesktopWidth] = useState('0%');
  const [activeDesktopSteps, setActiveDesktopSteps] = useState<boolean[]>([false, false, false, false]);

  // Mobile/Tablet Scroll-Driven States
  const [activeMobileSteps, setActiveMobileSteps] = useState<boolean[]>([false, false, false, false]);
  const [filledMobileLines, setFilledMobileLines] = useState<boolean[]>([false, false, false, false]);

  // Handle responsive check cleanly
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    // Outer observer to trigger initial section fade-in reveal
    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    revealObserver.observe(currentSection);
    return () => revealObserver.disconnect();
  }, []);

  // Fixed desktop looping process timeline logic
  useEffect(() => {
    if (!isRevealed || !isDesktop) return;

    let isCancelled = false;
    let timers: NodeJS.Timeout[] = [];

    const playDesktopAnimation = () => {
      if (isCancelled) return;

      // 1. Instantly reset width back to zero without triggering an animation slide-back
      setDesktopTransitionClass('transition-none');
      setDesktopWidth('0%');
      setActiveDesktopSteps([false, false, false, false]);

      // 2. Allow a tiny microtask delay for the layout engine to apply the 0% state invisibly
      const startTimer = setTimeout(() => {
        if (isCancelled) return;

        // Bring back full opacity and turn width transitions on
        setDesktopLineOpacity('opacity-100 transition-opacity duration-300');
        setDesktopTransitionClass('transition-[width] ease-linear duration-[2000ms]');

        // Slide width from 0% to 100% smoothly over 2000ms
        setDesktopWidth('100%');

        // Stagger dots and descriptions based on width progression
        stepsData.forEach((_, i) => {
          const stepTimer = setTimeout(() => {
            if (isCancelled) return;
            setActiveDesktopSteps((prev) => {
              const updated = [...prev];
              updated[i] = true;
              return updated;
            });
          }, 500 * (i + 0.8));
          timers.push(stepTimer);
        });

        // 3. ONCE TIMELINE RUN IS COMPLETE: Fade out the blue progress row track gracefully
        const fadeTimer = setTimeout(() => {
          if (isCancelled) return;
          setDesktopLineOpacity('opacity-0 transition-opacity duration-500');

          // 4. AFTER FADE OUT COMPLETIONS: Loop back cleanly
          const loopTimer = setTimeout(() => {
            if (!isCancelled) playDesktopAnimation();
          }, 550); // Gives time for the opacity fade duration to finish
          timers.push(loopTimer);

        }, 2000 + 1500); // 2000ms (fill slide runtime) + 1500ms (pause wait to read)
        timers.push(fadeTimer);

      }, 50);
      timers.push(startTimer);
    };

    // Delay starting the very first loop to sync up nicely with section's page reveal transition
    const initialDelay = setTimeout(() => {
      playDesktopAnimation();
    }, 900);
    timers.push(initialDelay);

    return () => {
      isCancelled = true;
      timers.forEach((t) => clearTimeout(t));
    };
  }, [isRevealed, isDesktop]);

  // Mobile individual intersection step observer logic
  useEffect(() => {
    if (!isRevealed || isDesktop) return;

    const stepsElements = document.querySelectorAll('.fred-mob-step');
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const stepEl = entry.target as HTMLDivElement;
          const idx = parseInt(stepEl.getAttribute('data-midx') || '0', 10);

          if (entry.isIntersecting) {
            setActiveMobileSteps((prev) => {
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            if (idx > 0) {
              setFilledMobileLines((prev) => {
                const next = [...prev];
                next[idx - 1] = true;
                return next;
              });
            }
          } else {
            setActiveMobileSteps((prev) => {
              const next = [...prev];
              next[idx] = false;
              return next;
            });
            if (idx > 0) {
              const rect = stepEl.getBoundingClientRect();
              if (rect.top > 0) {
                setFilledMobileLines((prev) => {
                  const next = [...prev];
                  next[idx - 1] = false;
                  return next;
                });
              }
            }
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -10% 0px' }
    );

    stepsElements.forEach((el) => mobileObserver.observe(el));
    return () => mobileObserver.disconnect();
  }, [isRevealed, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="max-w-387 mx-auto px-5 py-12 md:px-10 lg:px-15 overflow-hidden"
    >
      <div className="flex flex-col gap-10">

        {/* TOP SECTION */}
        <div
          className={`flex flex-col lg:flex-row gap-2.5 lg:gap-20 items-start lg:items-center transition-all duration-200 ease-out ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          <div className="shrink-0 lg:flex-[0_0_50%] flex flex-col">
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-semibold text-[#111] leading-[1.2] m-0">
              Your College Journey, <span className="text-[#0D68F1]">Made Simple</span>
            </h2>
            <div className="w-15 h-0.75 bg-[#2F80ED] rounded-lg mt-3" />
          </div>
          <p className="text-[14px] sm:text-[15px] text-[#666] leading-[1.8] tracking-widest m-0 lg:flex-1 lg:pt-2">
            Get expert college admission guidance, personalised counseling, and end-to-end support to find the right college with confidence.
          </p>
        </div>

        {/* DESKTOP VIEWPORT — 4 Columns */}
        <div
          className={`hidden lg:block transition-all duration-700 ease-out delay-200 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-6'
            }`}
        >
          {/* Animated Line Progress Tracker Row */}
          <div className={`relative h-5 flex items-center mb-4 ${desktopLineOpacity}`}>
            <div className="absolute left-0 right-0 h-0.5 bg-[#e0e0e0] top-1/2 -translate-y-1/2" />
            <div
              style={{ width: desktopWidth }}
              className={`absolute left-0 h-0.5 bg-[#2F80ED] top-1/2 -translate-y-1/2 ${desktopTransitionClass}`}
            />
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 grid grid-cols-4">
              {stepsData.map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border-2 bg-white transition-all duration-300 ease-in-out self-start ${activeDesktopSteps[i] ? 'border-[#2F80ED] bg-[#2F80ED]!' : 'border-[#ddd]'
                    }`}
                  dino-index={i} /> 
              ))}
            </div>
          </div>

          {/* Cards Dynamic Grid Grid */}
          <div className="grid grid-cols-4 gap-x-6">
            {stepsData.map((data, i) => (
              <div key={i} className="flex flex-col gap-2.5 pr-5 pt-1">
                <span className="text-[14px] font-bold text-[#2F80ED] tracking-[0.08em] uppercase">
                  {data.step}
                </span>
                <h3 className="text-[24px] font-semibold text-[#111] m-0 leading-[1.3]">
                  {data.title}
                </h3>
                <p
                  className={`text-[14px] text-[#666] leading-[1.7] m-0 transition-all duration-500 ease-out ${activeDesktopSteps[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                >
                  {data.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* TABLET & MOBILE VIEWPORT — Vertical Timeline Layout */}
        <div
          className={`block lg:hidden flex-col transition-all duration-2000 ease-out delay-2000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
        >
          {stepsData.map((data, i) => (
            <div key={i} className="fred-mob-step flex gap-5" data-midx={i}>
              {/* Vertical Step Node Graphics Line Tracker */}
              <div className="flex flex-col items-center shrink-0 pt-0.75">
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 bg-white shrink-0 transition-all duration-400 ease-out z-1 ${activeMobileSteps[i] ? 'border-[#2F80ED] bg-[#2F80ED]' : 'border-[#ddd]'
                    }`}
                />
                <div
                  className={`w-0.5 flex-1 min-height-[32px] mt-1 relative overflow-hidden ${i === stepsData.length - 1 ? 'bg-transparent' : 'bg-[#e0e0e0]'
                    }`}
                >
                  {i !== stepsData.length - 1 && (
                    <div
                      className={`absolute top-0 left-0 w-full h-0 bg-[#2F80ED] transition-[height] duration-500 ease-out ${filledMobileLines[i] ? 'h-full' : 'h-0'
                        }`}
                    />
                  )}
                </div>
              </div>

              {/* Text Blocks */}
              <div className="flex-1 flex flex-col gap-2 pb-4">
                <span className="text-[14px] font-bold text-[#2F80ED] tracking-[0.08em] uppercase">
                  {data.step}
                </span>
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#111] m-0 leading-[1.3]">
                  {data.title}
                </h3>
                <p
                  className={`text-[13px] sm:text-[14px] text-[#666] leading-[1.7] m-0 transition-all duration-500 ease-out ${activeMobileSteps[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                    }`}
                >
                  {data.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
