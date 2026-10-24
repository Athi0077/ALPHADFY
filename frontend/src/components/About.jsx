import React, { useState, useEffect } from 'react';

const ROTATING_ICONS = [
  {
    icon: 'fa-heart-pulse',
    label: 'Health Insurance',
  },
  {
    icon: 'fa-shield-halved',
    label: 'General Insurance',
  },
  {
    icon: 'fa-hand-holding-heart',
    label: 'Life Insurance',
  },
];

export default function About() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % ROTATING_ICONS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const currentItem = ROTATING_ICONS[currentIconIndex];

  const scrollToContact = () => {
    const section = document.getElementById('contact');
    if (section) {
      const navHeight = 72;
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  const checklist = [
    'Trusted Insurance Partners',
    'Transparent Policies',
    'Quick Claim Assistance',
    'Dedicated Customer Support',
  ];

  return (
    <section id="about" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* LEFT VISUAL */}
        <div className="relative h-[380px] sm:h-[460px] rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#131E33] to-[#1A2844] border-2 border-[#D9A441]/30 p-8 flex items-center justify-center shadow-xl overflow-hidden group">
          {/* Subtle Decorative Dashed Arc */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-dashed border-[#D9A441]/25 pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 rounded-full bg-radial from-[#D9A441]/15 to-transparent pointer-events-none" />

          {/* Big Center Rotating FontAwesome Icon & Category Label */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#D9A441]/12 border-2 border-[#D9A441]/40 flex items-center justify-center shadow-[0_0_50px_rgba(217,164,65,0.25)] transition-transform duration-500 group-hover:scale-105">
              <i
                key={currentItem.icon}
                className={`fa-solid ${currentItem.icon} text-4xl sm:text-5xl text-[#F4C65D] animate-icon-cycle`}
                style={{ filter: 'drop-shadow(0 0 16px rgba(244, 198, 93, 0.65))' }}
                aria-label={currentItem.label}
              />
            </div>

            {/* Plan label badge */}
            <div
              key={currentItem.label}
              className="mt-3 px-3 py-1 rounded-full bg-[#0B1220]/80 border border-[#D9A441]/35 backdrop-blur-md text-xs font-bold text-[#F4C65D] tracking-wide animate-icon-cycle shadow-md"
            >
              {currentItem.label}
            </div>

            {/* Indicator dots */}
            <div className="flex items-center gap-1.5 mt-2">
              {ROTATING_ICONS.map((item, idx) => (
                <button
                  key={item.icon}
                  type="button"
                  onClick={() => setCurrentIconIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIconIndex
                      ? 'w-5 bg-[#D9A441]'
                      : 'w-1.5 bg-[#D9A441]/30 hover:bg-[#D9A441]/60'
                  }`}
                  aria-label={`Select ${item.label}`}
                />
              ))}
            </div>
          </div>

          {/* Experience Badge Card */}
          <div className="absolute right-5 bottom-5 sm:right-7 sm:bottom-7 bg-white/95 dark:bg-[#131E33]/95 backdrop-blur-md px-6 py-4 rounded-2xl border border-[#D9A441]/35 shadow-xl transition-all duration-300 hover:-translate-y-1 z-20">
            <strong className="block text-3xl sm:text-4xl font-extrabold text-gold-gradient font-heading leading-tight">
              25+
            </strong>
            <span className="text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              Years of Trust
            </span>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2.5px] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
            ABOUT US
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-6">
            Insurance Made
            <span className="block text-gold-gradient mt-1">Simple</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
            We help individuals, families and businesses choose insurance plans that provide meaningful protection without unnecessary complexity.
          </p>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            Our goal is simple — make insurance easier, more transparent, and accessible to everyone.
          </p>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
            {checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[#D9A441]/8 dark:bg-[#D9A441]/10 border border-[#D9A441]/20 text-slate-900 dark:text-slate-100 font-semibold text-sm transition-all duration-300 hover:bg-[#D9A441]/15 hover:border-[#D9A441]/40 hover:translate-x-1"
              >
                <span className="text-[#D9A441] font-bold text-base">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="px-7 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-base tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Talk To An Expert
          </button>
        </div>
      </div>
    </section>
  );
}
