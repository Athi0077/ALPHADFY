import React from 'react';

export default function Hero({ onOpenQuote, theme }) {
  const scrollToInsurance = () => {
    const section = document.getElementById('insurance');
    if (section) {
      const navHeight = 72;
      const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-84px)] pt-32 pb-20 md:pt-36 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden"
    >
      {/* Recurring Gold Swoosh Ambient Background */}
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full pointer-events-none opacity-50 dark:opacity-40 z-0">
        <svg viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M-100 650C150 600 350 450 480 300C580 180 620 50 680 -50"
            stroke="url(#goldSwooshGrad1)"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            opacity="0.6"
          />
          <path
            d="M-50 720C200 660 420 510 560 340C660 210 700 80 750 -20"
            stroke="url(#goldSwooshGrad2)"
            strokeWidth="4"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="goldSwooshGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9A441" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#F4C65D" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="goldSwooshGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D9A441" stopOpacity="0.05" />
              <stop offset="60%" stopColor="#F4C65D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B88328" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2.5px] uppercase mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
          PREMIUM INSURANCE COVERAGE
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          Protect What
          <span className="block text-gold-gradient mt-1">Matters Most</span>
        </h1>

        {/* Description */}
        <p className="max-w-xl text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          Reliable insurance solutions for you, your family and your business.
          Get the right coverage at the right price with personalized assistance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={() => onOpenQuote()}
            className="relative overflow-hidden w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-base tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            {/* Shimmer / Shine Effect every 2s left to right */}
            <span
              className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none animate-btn-shine z-20"
              aria-hidden="true"
            />
            <span className="relative z-10">Get Free Quote</span>
          </button>

          <button
            onClick={scrollToInsurance}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white hover:border-[#D9A441] hover:text-[#B88328] dark:hover:text-[#F4C65D] hover:bg-[#D9A441]/10 font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Explore Insurance
          </button>
        </div>

        {/* Rating Card */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/90 dark:bg-[#101827]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm text-sm">
          <span className="text-[#F59F00] tracking-widest text-base">⭐⭐⭐⭐⭐</span>
          <span className="text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm">
            Trusted by 15,000+ customers
          </span>
        </div>
      </div>

      {/* HERO VISUAL WITH FLOATING CARDS */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
        {/* Floating Card 1: Health */}
        <div className="absolute top-2 left-2 sm:left-4 z-20 flex items-center gap-3 bg-white/95 dark:bg-[#131E33]/95 backdrop-blur-md border border-[#D9A441]/35 px-4 sm:px-5 py-3 rounded-2xl shadow-xl animate-float-one">
          <span className="text-2xl sm:text-3xl">🏥</span>
          <div>
            <strong className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              Health Insurance
            </strong>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              Complete protection
            </span>
          </div>
        </div>

        {/* Center Card with Logo */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-white/95 to-slate-100/90 dark:from-[#131E33] dark:to-[#0B1220] border-2 border-[#D9A441]/35 p-8 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-102 group">
          {/* Ambient Glow */}
          <div className="absolute -inset-3 rounded-[32px] bg-radial from-[#D9A441]/20 to-transparent -z-10 animate-ambient-pulse" />

          <img
            src="/screen1.png"
            alt="ALPHADFY"
            className="w-full max-w-[240px] h-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Floating Card 2: General Insurance */}
        <div className="absolute bottom-2 right-2 sm:right-4 z-20 flex items-center gap-3 bg-white/95 dark:bg-[#131E33]/95 backdrop-blur-md border border-[#D9A441]/35 px-4 sm:px-5 py-3 rounded-2xl shadow-xl animate-float-two">
          <span className="text-2xl sm:text-3xl">🛡️</span>
          <div>
            <strong className="block text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
              General Insurance
            </strong>
            <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
              All-round protection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
