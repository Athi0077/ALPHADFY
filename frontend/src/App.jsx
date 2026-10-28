import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Insurance from './components/Insurance';
import WhyUs from './components/WhyUs';
import Partners from './components/Partners';
import Contact from './components/Contact';
import PreFooterCTA from './components/PreFooterCTA';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import ButterflyBg from './components/ButterflyBg';
import { prewarmBackend } from './utils/api';

const THEME_STORAGE_KEY = 'alphadfy-theme';

export default function App() {
  // Wake up backend container as soon as the visitor lands on the site
  useEffect(() => {
    prewarmBackend();
  }, []);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved) return saved;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {}
    return 'light';
  });

  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');

  // Sync theme with document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('dark');
      document.body.classList.add('dark-mode');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('dark');
      document.body.classList.remove('dark-mode');
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [theme]);

  const [themeTransitionEnabled, setThemeTransitionEnabled] = useState(false);

  const toggleTheme = () => {
    setThemeTransitionEnabled(true);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenQuote = (plan = '') => {
    setSelectedPlan(plan);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col relative bg-slate-50 dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 ${themeTransitionEnabled ? 'transition-colors duration-300' : ''}`}>
      {/* Background Weather / Butterfly Animation */}
      <ButterflyBg theme={theme} />

      {/* Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote('')}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Page Content */}
      <main className="flex-grow relative z-10">
        <Hero onOpenQuote={() => handleOpenQuote('')} />
        <Stats />
        <About />
        <Insurance onSelectPlan={(plan) => handleOpenQuote(plan)} />
        <WhyUs />
        <Partners />
        <Contact />
        <PreFooterCTA onOpenQuote={() => handleOpenQuote('')} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={handleCloseQuote}
        initialPlan={selectedPlan}
      />
    </div>
  );
}
