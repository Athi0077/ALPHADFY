import React from 'react';
import GlareHover from './GlareHover';

const reasons = [
  {
    icon: 'fa-shield-halved',
    title: 'Secure',
    description: 'Your information is handled with absolute care, privacy, and industry-standard security protocols.',
  },
  {
    icon: 'fa-bolt',
    title: 'Fast Support',
    description: 'Get swift, hassle-free claim assistance whenever you need it with our dedicated advisor desk.',
  },
  {
    icon: 'fa-coins',
    title: 'Affordable',
    description: 'Flexible premium plans designed to accommodate varying personal and corporate budgets.',
  },
  {
    icon: 'fa-handshake',
    title: 'Trusted',
    description: 'Over 15,000 satisfied customers and businesses count on our proven track record.',
  },
];

export default function WhyUs({ theme = 'dark' }) {
  return (
    <section id="why-us" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2.5px] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
          WHY CHOOSE US
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2]">
          Why Customers
          <span className="block text-gold-gradient mt-1">Trust Us</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 max-w-lg">
          Experience seamless insurance coverage backed by innovative technology, swift claims, and unmatched trust.
        </p>
      </div>

      {/* Grid of GlareHover Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {reasons.map((item) => (
          <GlareHover
            key={item.title}
            width="100%"
            height="100%"
            borderRadius="24px"
            borderColor="rgba(217, 164, 65, 0.25)"
            background="transparent"
            mode="hover"
            variant="streak"
            glareColor="#ffffff"
            glareOpacity={0.5}
            glareSize={32}
            softness={0.6}
            glareAngle={-45}
            blendMode="screen"
            rimGlint={true}
            transitionDuration={650}
            className="group w-full h-full shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
          >
            <div className="relative w-full h-full min-h-[300px] bg-white dark:bg-[#131E33] p-8 rounded-[24px] flex flex-col items-center text-center overflow-hidden border border-slate-200/80 dark:border-white/10">
              {/* Top gold accent line */}
              <span className="absolute top-0 left-1/4 right-1/4 h-[3px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-[#D9A441]/10 dark:bg-[#D9A441]/15 border border-[#D9A441]/25 flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,164,65,0.3)]">
                <i className={`fa-solid ${item.icon} text-2xl text-[#D9A441]`}></i>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-[#B88328] dark:group-hover:text-[#F4C65D] transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-grow">
                {item.description}
              </p>
            </div>
          </GlareHover>
        ))}
      </div>
    </section>
  );
}
