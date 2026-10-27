import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenQuote, theme, onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Insurance', href: '#insurance' },
    { name: 'Our Partners', href: '#partners' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const navHeight = isScrolled ? 72 : 84;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[height,background-color,border-color,box-shadow] duration-300 border-b ${
        isScrolled
          ? 'h-[72px] bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md shadow-md dark:shadow-black/50 border-[#D9A441]/25'
          : 'h-[84px] bg-slate-50/90 dark:bg-[#0B1220]/90 backdrop-blur-md border-[#D9A441]/15'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center transition-transform hover:scale-105"
          aria-label="ALPHADFY Home"
        >
          <img
            src="/screen1.png"
            alt="ALPHADFY"
            className={`w-auto object-contain transition-[height,max-width] duration-300 ${
              isScrolled ? 'h-9 max-w-[190px]' : 'h-11 max-w-[230px]'
            }`}
          />
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-[15px] font-semibold text-slate-800 dark:text-slate-100 hover:text-[#B88328] dark:hover:text-[#F4C65D] transition-colors py-1 group tracking-wide"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </a>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          {/* Phone pill */}
          <div className="hidden xl:flex items-center gap-1.5 text-[13.5px] font-bold text-slate-800 dark:text-slate-100 bg-[#D9A441]/10 dark:bg-[#D9A441]/15 border border-[#D9A441]/25 px-4 h-[38px] rounded-full tracking-wide">
            <span>📞</span>
            <span>+91 8248324886</span>
          </div>

          {/* Get Quote Button */}
          <button
            onClick={() => onOpenQuote()}
            className="h-[38px] px-4 rounded-lg bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-xs sm:text-[13px] tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 active:translate-y-0 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
          >
            Get Quote
          </button>

          {/* Theme Toggle Bulb Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border ${
              theme === 'dark'
                ? 'bg-[#F4C65D]/15 border-[#F4C65D]/60 text-[#F4C65D] shadow-[0_0_16px_rgba(244,198,93,0.35)] hover:scale-110 active:scale-95'
                : 'bg-[#D9A441]/10 border-[#D9A441]/30 text-slate-800 hover:bg-[#D9A441]/20 hover:border-[#D9A441] hover:scale-105 active:scale-95 shadow-sm'
            }`}
          >
            <svg
              className={`w-[22px] h-[22px] transition-transform ${
                theme === 'dark' ? 'animate-bulb-pulse' : ''
              }`}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="bulb-rays" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="24" y1="4" x2="24" y2="9" />
                <line x1="37.5" y1="9.5" x2="34" y2="13" />
                <line x1="43" y1="23" x2="38" y2="23" />
                <line x1="37.5" y1="36.5" x2="34" y2="33" />
                <line x1="10.5" y1="36.5" x2="14" y2="33" />
                <line x1="5" y1="23" x2="10" y2="23" />
                <line x1="10.5" y1="9.5" x2="14" y2="13" />
              </g>
              <path
                className="bulb-glass"
                d="M17 29C15 27 14 24 14 21C14 15.48 18.48 11 24 11C29.52 11 34 15.48 34 21C34 24 33 27 31 29C29.5 30.5 28.5 33 28.5 35H19.5C19.5 33 18.5 30.5 17 29Z"
                fill={theme === 'dark' ? 'rgba(244, 198, 93, 0.25)' : 'none'}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <path
                className="bulb-highlight"
                d="M19 19C19 16 21 14 24 13.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                className="bulb-base"
                d="M20 38H28M21 41H27M22 44H26"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-[38px] h-[38px] rounded-lg bg-[#D9A441]/10 border border-[#D9A441]/30 flex items-center justify-center text-slate-800 dark:text-slate-100 hover:bg-[#D9A441]/20 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center">
              <span
                className={`w-full h-[2.2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-full h-[2.2px] bg-current rounded-full transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-full h-[2.2px] bg-current rounded-full transition-all duration-300 transform origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/98 dark:bg-[#0B1220]/98 backdrop-blur-xl border-b border-[#D9A441]/25 px-6 py-6 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-semibold text-slate-800 dark:text-slate-100 hover:text-[#B88328] dark:hover:text-[#F4C65D] py-2 border-b border-slate-200/50 dark:border-slate-800/80 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
              <span>📞</span>
              <span>+91 8248324886</span>
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded-lg bg-gold-gradient text-[#0B1220] font-bold text-sm tracking-wide shadow-gold"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
