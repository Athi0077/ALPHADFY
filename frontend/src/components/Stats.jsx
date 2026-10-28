import React, { useState, useEffect, useRef } from 'react';

const statsData = [
  { target: 15000, suffix: '+', label: 'Happy Customers' },
  { target: 25, suffix: '+', label: 'Years Experience' },
  { target: 50, suffix: '+', label: 'Insurance Plans' },
  { target: 98, suffix: '%', label: 'Claim Success %' },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [counts, setCounts] = useState(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return statsData.map((item) => item.target);
    }
    return statsData.map(() => 0);
  });

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    // If user prefers reduced motion, already initialized with targets
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      hasAnimatedRef.current = true;
      return;
    }

    let rafId = null;
    let fallbackTimer = null;

    const startCounting = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      if (fallbackTimer) clearTimeout(fallbackTimer);

      const duration = 1000;
      const startTime = performance.now();

      const update = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quad
        const ease = 1 - (1 - progress) * (1 - progress);

        setCounts(
          statsData.map((item) => Math.floor(item.target * ease))
        );

        if (progress < 1) {
          rafId = requestAnimationFrame(update);
        } else {
          setCounts(statsData.map((item) => item.target));
        }
      };

      rafId = requestAnimationFrame(update);
    };

    let observer = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            startCounting();
            if (observer) observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '60px' }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    }

    // Safety fallback: ensure numbers are never stuck at 0 if observer takes time or fails
    fallbackTimer = setTimeout(() => {
      startCounting();
    }, 1200);

    return () => {
      if (observer) observer.disconnect();
      if (fallbackTimer) clearTimeout(fallbackTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B1220] py-14 px-4 sm:px-6 lg:px-8 border-y border-[#D9A441]/25 overflow-hidden shadow-inner"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-[#D9A441]/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 relative z-10 text-center">
        {statsData.map((stat, idx) => (
          <div
            key={stat.label}
            className={`px-4 flex flex-col items-center justify-center relative ${
              idx !== statsData.length - 1
                ? 'md:after:content-[""] md:after:absolute md:after:right-0 md:after:top-1/4 md:after:h-1/2 md:after:w-[1px] md:after:bg-gradient-to-b md:after:from-transparent md:after:via-[#D9A441]/30 md:after:to-transparent'
                : ''
            }`}
          >
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gold-gradient font-heading tabular-nums mb-2">
              {counts[idx].toLocaleString()}
              {stat.suffix}
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
