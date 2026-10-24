import React from 'react';
import {
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Headphones,
} from 'lucide-react';

const contactCards = [
  {
    id: 'phone',
    icon: PhoneCall,
    title: 'Phone Support',
    subtitle: 'Direct voice consultation',
    value: '+91 9600669737',
    actionText: 'Call Directly',
    href: 'tel:+919600669737',
    badge: 'Immediate',
    iconBg: 'bg-[#D9A441]/15 text-[#B88328] dark:text-[#F4C65D] border-[#D9A441]/30',
  },
  {
    id: 'whatsapp',
    icon: MessageCircle,
    title: 'WhatsApp Chat',
    subtitle: 'Instant answers & document help',
    value: '+91 9600669737',
    actionText: 'Start WhatsApp Chat',
    href: 'https://wa.me/919600669737?text=Hi%20Alphadfy,%20I%20would%20like%20to%20know%20more%20about%20your%20insurance%20services.',
    badge: 'Instant Reply',
    iconBg: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email Inquiries',
    subtitle: 'Detailed policy quotes & claims',
    value: 'azhaghiriv@gmail.com',
    actionText: 'Drop an Email',
    href: 'mailto:azhaghiriv@gmail.com',
    badge: '< 2 hrs reply',
    iconBg: 'bg-[#D9A441]/15 text-[#B88328] dark:text-[#F4C65D] border-[#D9A441]/30',
  },
  {
    id: 'location',
    icon: MapPin,
    title: 'Visit Office',
    subtitle: 'Mon – Sat: 9:00 AM – 7:00 PM',
    value: 'Chennai, Tamil Nadu',
    actionText: 'Get Directions',
    href: 'https://maps.google.com/?q=Chennai,Tamil+Nadu,India',
    badge: 'Headquarters',
    iconBg: 'bg-[#D9A441]/15 text-[#B88328] dark:text-[#F4C65D] border-[#D9A441]/30',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Main Section: Left Info + Right 4-Card Grid */}
      <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-14">
        {/* Left Column: Headings, Live Status & Business Hours */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between">
          <div>
            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/30 text-[#B88328] dark:text-[#F4C65D] text-xs font-bold tracking-[2.5px] uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] shadow-[0_0_8px_#D9A441]" />
              CONTACT US
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] mb-5">
              We're Here To
              <span className="block text-gold-gradient mt-1">Help You</span>
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Have questions about policies, claim procedures, or finding the right coverage?
              Our certified insurance advisors are on standby to guide you step-by-step.
            </p>

            {/* Live Advisor Availability Status */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                Advisors Online Now &bull; Typical reply: <span className="font-bold underline decoration-emerald-500/40">under 15 mins</span>
              </span>
            </div>
          </div>

          {/* Business Hours & Trust Info Box */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#131E33]/80 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#D9A441]/12 border border-[#D9A441]/30 flex items-center justify-center text-[#B88328] dark:text-[#F4C65D]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Business Support Hours</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct phone & chat support</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/80 dark:border-white/10 text-xs">
              <div>
                <span className="block text-slate-500 dark:text-slate-400 font-medium">Mon &ndash; Sat</span>
                <span className="font-bold text-slate-900 dark:text-slate-200">9:00 AM &ndash; 7:00 PM</span>
              </div>
              <div>
                <span className="block text-slate-500 dark:text-slate-400 font-medium">Sunday</span>
                <span className="font-bold text-[#B88328] dark:text-[#F4C65D]">Emergency Only</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-200/80 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-[#D9A441] shrink-0" />
              <span>Certified advisors &bull; Zero spam &bull; 100% Free consultation</span>
            </div>
          </div>
        </div>

        {/* Right Column: 4-Card Interactive Action Grid */}
        <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contactCards.map((item) => {
            const IconComponent = item.icon;
            const isExternal = item.href.startsWith('http');

            return (
              <a
                key={item.id}
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#131E33]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D9A441]/50 flex flex-col justify-between overflow-hidden cursor-pointer"
              >
                {/* Subtle Ambient Hover Glow on Card */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-radial from-[#D9A441]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Header: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(217,164,65,0.35)] ${item.iconBg}`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 group-hover:border-[#D9A441]/30 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Card Title & Subtitle */}
                  <div className="text-xs font-bold uppercase tracking-wider text-[#B88328] dark:text-[#F4C65D] mb-1">
                    {item.title}
                  </div>
                  <div className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-[#B88328] dark:group-hover:text-[#F4C65D] transition-colors break-words">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Card Action Pill */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#D9A441] transition-colors">
                    {item.actionText}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-gold-gradient group-hover:text-[#0B1220] transition-all duration-300 group-hover:shadow-gold">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom 24/7 Claim Support Assurance Bar */}
      <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#D9A441]/10 via-[#F4C65D]/5 to-[#D9A441]/10 border border-[#D9A441]/25 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-gradient text-[#0B1220] flex items-center justify-center shrink-0 shadow-gold">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              Need Urgent Claim Assistance?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Our dedicated claim specialists are on standby to expedite your claims and documentation.
            </p>
          </div>
        </div>

        <a
          href="tel:+919600669737"
          className="shrink-0 px-6 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-[#0B1220] font-bold text-xs sm:text-sm tracking-wide shadow-gold hover:shadow-gold-hover transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          Call Emergency Desk
        </a>
      </div>
    </section>
  );
}

