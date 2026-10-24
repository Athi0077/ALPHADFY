import React from 'react';
import CardSwap from './CardSwap';

const trustItems = [
  {
    title: '100% Secure & Protected',
    description: 'Your information is handled with absolute care, privacy, and industry-standard security protocols.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80',
    icon: <i className="fa-solid fa-shield-halved text-xs text-[#D9A441]" />
  },
  {
    title: 'Fast & Instant Support',
    description: 'Get swift, hassle-free claim assistance whenever you need it with our dedicated 24/7 advisor desk.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=900&q=80',
    icon: <i className="fa-solid fa-bolt text-xs text-[#D9A441]" />
  },
  {
    title: 'Affordable Rates & Plans',
    description: 'Flexible premium plans designed to accommodate varying personal and corporate budgets.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80',
    icon: <i className="fa-solid fa-coins text-xs text-[#D9A441]" />
  },
  {
    title: 'Trusted by 15,000+ Clients',
    description: 'Over 15,000 satisfied customers and businesses count on our proven track record.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
    icon: <i className="fa-solid fa-handshake text-xs text-[#D9A441]" />
  }
];

export default function WhyUs({ theme = 'dark' }) {
  return (
    <section id="why-us" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 flex flex-col items-center">
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

      {/* CardSwap 3D Interactive Stack Container */}
      <div className="w-full flex items-center justify-center py-4">
        <div className="w-full max-w-4xl h-[480px] sm:h-[540px] relative">
          <CardSwap
            items={trustItems}
            width={480}
            height={340}
            delay={4000}
            cardDistance={60}
            verticalDistance={65}
            depth={90}
            skewAmount={5}
            visibleCards={4}
            autoplay={true}
            pauseOnHover={true}
            draggable={true}
            speed={1}
            bounce={0.35}
            parallax={0.5}
            hoverSpread={0.12}
            dim={0.5}
            cardRadius={20}
            theme={theme}
          />
        </div>
      </div>
    </section>
  );
}
