import React from 'react';

export default function PreFooterCTA({ onOpenQuote }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1220] via-[#111B2E] to-[#16243D] border-2 border-[#D9A441]/35 p-8 sm:p-14 text-center text-white overflow-hidden shadow-2xl">
        {/* Glow circle */}
        <div className="absolute -top-1/2 -right-10 w-96 h-96 rounded-full bg-radial from-[#D9A441]/15 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready To Protect What{' '}
            <span className="text-gold-gradient">Matters Most</span>?
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
            Get personalized advice from our certified insurance consultants and secure the optimal coverage for your family and assets today.
          </p>

          <button
            onClick={() => onOpenQuote()}
            className="px-8 py-4 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-base tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Get Your Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
