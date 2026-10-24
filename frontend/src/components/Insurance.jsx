import React from 'react';
import AccordionGallery from './AccordionGallery';

export default function Insurance({ onSelectPlan }) {
  const insuranceItems = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      label: 'Health Insurance',
      description: 'Comprehensive cashless hospitalization and medical security for you and your family.',
      ctaText: 'Get Quote',
      onCtaClick: () => onSelectPlan && onSelectPlan('Health Insurance'),
    },
    {
      image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=900&q=80',
      label: 'General Insurance',
      description: 'Extensive coverage protecting your travel, valuable assets, liabilities, and unexpected emergencies.',
      ctaText: 'Get Quote',
      onCtaClick: () => onSelectPlan && onSelectPlan('General Insurance'),
    },
    {
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=900&q=80',
      label: 'Life Insurance',
      description: "Secure your family's financial future with comprehensive term life coverage and guaranteed protection.",
      ctaText: 'Get Quote',
      onCtaClick: () => onSelectPlan && onSelectPlan('Life Insurance'),
    },
  ];

  return (
    <section id="insurance" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-100/50 dark:bg-[#0B1220]/60 rounded-3xl my-6">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2.5px] uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
          OUR INSURANCE
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-4">
          Protection For
          <span className="block text-gold-gradient mt-1">Every Need</span>
        </h2>

        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Choose from our range of tailor-made insurance solutions designed to protect what matters most.
        </p>
      </div>

      {/* Accordion Gallery UI */}
      <div className="w-full">
        <AccordionGallery
          items={insuranceItems}
          defaultIndex={0}
          accentColor="#D9A441"
          overlayColor="#0B1220"
          textColor="#ffffff"
          height={480}
          gap={12}
          radius={20}
          expandRatio={0.52}
          trigger="hover"
          parallax={0.5}
          tilt={7}
          duration={0.6}
          grayscale={true}
          showLabels={true}
        />
      </div>
    </section>
  );
}
