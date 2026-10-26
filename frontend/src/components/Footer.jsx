import React from 'react';

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - (navHeight - 10);
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#0B1220] text-white pt-14 pb-12 border-t border-[#D9A441]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Nav Links (Centered) */}
        <div className="flex items-center justify-center pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-10">
            {[
              { name: 'Home', id: 'home' },
              { name: 'About', id: 'about' },
              { name: 'Insurance', id: 'insurance' },
              { name: 'Contact', id: 'contact' },
            ].map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className="text-sm sm:text-base font-semibold text-slate-300 hover:text-[#F4C65D] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright (Centered) */}
        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            © 2026 ALPHADPY CAPITAL SOLUTIONS IMF PRIVATE LIMITED. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
