import React, { useState, useEffect, useRef } from 'react';

/**
 * CallChip Component (inspired by React Bits)
 * Displays terminal/developer chip feedback with real-time timer,
 * running progress bar, success checkmark, or error shake.
 */
export default function CallChip({
  name = 'quote',
  argument = 'submit',
  status = 'running', // 'running' | 'done' | 'error'
  expectedMs = 1400,
}) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef(performance.now());
  const rafRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    if (status === 'running') {
      const tick = () => {
        setElapsedMs(Math.round(performance.now() - startTimeRef.current));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [status]);

  const formattedTime =
    elapsedMs < 10000 ? `${elapsedMs} ms` : `${(elapsedMs / 1000).toFixed(1)} s`;

  return (
    <div
      role="status"
      className={`relative w-full h-12 px-4 rounded-xl flex items-center justify-center gap-2.5 overflow-hidden text-sm font-medium border select-none transition-all duration-300 ${
        status === 'error'
          ? 'bg-[#101827] text-white border-red-500/60 animate-shake'
          : status === 'done'
          ? 'bg-[#101827] text-white border-green-500/60 shadow-[0_0_15px_rgba(34,197,94,0.25)]'
          : 'bg-[#101827] text-white border-[#D9A441]/40'
      }`}
    >
      {/* Animated Fill Bar */}
      {status === 'running' && (
        <div
          className="absolute inset-0 bg-[#D9A441]/20 origin-left transition-transform ease-linear"
          style={{
            transform: 'scaleX(0.92)',
            transitionDuration: `${expectedMs}ms`,
          }}
        />
      )}
      {status === 'done' && (
        <div className="absolute inset-0 bg-green-500/20 origin-left transition-transform duration-300 scale-x-100" />
      )}
      {status === 'error' && (
        <div className="absolute inset-0 bg-red-500/20 origin-left scale-x-100" />
      )}

      {/* Glyph Icon */}
      <div className="relative z-10 w-4 h-4 flex items-center justify-center">
        {status === 'running' && (
          <svg
            className="w-4 h-4 text-[#F4C65D] animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        )}
        {status === 'done' && (
          <svg
            className="w-4.5 h-4.5 text-green-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
        {status === 'error' && (
          <svg
            className="w-4.5 h-4.5 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          </svg>
        )}
      </div>

      {/* Name */}
      <span className="relative z-10 font-bold text-[#F4C65D] tracking-wide">
        {name}
      </span>

      {/* Argument */}
      <span className="relative z-10 font-mono text-xs text-slate-200">
        {argument}
      </span>

      {/* Timer */}
      <span className="relative z-10 font-mono text-xs tabular-nums text-slate-400 ml-auto">
        {formattedTime}
      </span>
    </div>
  );
}
