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
    <footer className="bg-[#0B1220] text-white pt-16 pb-12 border-t border-[#D9A441]/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Logo */}
          <a href="#home" onClick={(e) => scrollTo(e, 'home')} className="flex items-center">
            <img
              src="/logo_footer.png"
              alt="ALPHADFY"
              className="h-12 w-auto object-contain transition-transform hover:scale-105"
            />
          </a>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-7">
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
                className="text-sm font-semibold text-slate-300 hover:text-[#F4C65D] transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            © 2026 ALPHADPY CAPITAL SOLUTIONS IMF PRIVATE LIMITED. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
