import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faqData';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  GraduationCap,
  Camera,
  Award,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { useBrand } from '../context/BrandContext';
import defaultFaqImg from '../assets/images/faq.jpeg';
import { RSOfficialEmblem } from './RSLogo';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FAQSection: React.FC = () => {
  const { customFaqBanner, openFaqBannerModal } = useBrand();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-2': true,
  });

  const activePhoto = customFaqBanner || defaultFaqImg;

  const categories = ['All', 'General', 'Admissions', 'Visas', 'Scholarships', 'Finances & Work', 'RS Process'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((f) => f.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faq-section" className="py-20 bg-gradient-to-b from-white via-red-50/20 to-white relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-red-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Verified Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Clear, transparent guidance on admissions, visa approvals, bank statements, and scholarship opportunities for Pakistani scholars.
          </p>
        </div>

        {/* Featured Graduation Background / Convocation Showcase Card (Uploadable) */}
        <div
          id="faq-graduation-banner-card"
          className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-100 bg-slate-950 group/faqcard transition-all duration-300"
        >
          {/* Visual Container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[380px] min-h-[240px] flex items-center justify-center overflow-hidden">
            <img
              src={activePhoto}
              alt="RS Higher Education Graduation Convocation & Academic Mentorship"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/faqcard:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30 pointer-events-none" />

            {/* Top-Left Official RS Brand Badge */}
            <div
              className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2.5 px-3 sm:px-3.5 py-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/20 shadow-xl"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center p-0.5 border border-red-500 shadow-xs shrink-0">
                <RSOfficialEmblem size="xs" variant="circle" />
              </div>
              <div className="text-left">
                <span className="text-[11px] sm:text-xs font-black text-white font-heading tracking-wide uppercase leading-tight block">
                  RS Higher Education
                </span>
                <span className="text-[9px] font-bold text-amber-400 tracking-wider uppercase leading-none block mt-0.5">
                  Academic Convocation &amp; Mentorship
                </span>
              </div>
            </div>

            {/* Bottom Floating Information Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1.5 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 border border-red-400 text-[10px] font-bold tracking-wider uppercase">
                  <GraduationCap className="w-3 h-3 text-amber-300" />
                  <span>Real Academic Experience</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black font-heading tracking-tight text-white drop-shadow-md">
                  Mentored by UK Graduates Who Walked the Same Path
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed">
                  Every answer below is backed by authentic firsthand experience in UK and global higher education admissions, visas, and university life.
                </p>
              </div>

              {/* Verified Trust Badges */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <div className="text-xs font-black text-amber-400 font-heading">100%</div>
                  <div className="text-[9px] text-slate-300 font-medium">Genuine Advice</div>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <div className="text-xs font-black text-emerald-400 font-heading">Zero</div>
                  <div className="text-[9px] text-slate-300 font-medium">Hidden Charges</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold font-heading transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#DB0303] text-white shadow-md shadow-red-600/20 scale-105'
                  : 'bg-white text-slate-700 hover:bg-red-50 border border-slate-200 hover:border-red-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className={`bg-white border rounded-3xl overflow-hidden transition-all duration-200 shadow-xs ${
                  isOpen ? 'border-red-200 shadow-md shadow-red-950/5 ring-1 ring-red-100' : 'border-slate-200/80 hover:border-red-200'
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-[#DB0303] uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-lg border border-red-100 shrink-0 font-heading">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`p-2 rounded-xl shrink-0 transition-colors ${isOpen ? 'bg-red-50 text-[#DB0303]' : 'bg-slate-100 text-slate-500'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-200 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-8 p-6 sm:p-8 bg-white rounded-3xl border border-red-100 shadow-lg shadow-red-950/5 text-center space-y-3">
          <p className="text-sm text-slate-700 font-bold font-heading">
            Still have a specific question about your degree equivalence, university sponsor, or bank requirements?
          </p>
          <a
            id="faq-whatsapp-cta-btn"
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=Hi%20RS%20Consultants,%20I%20have%20a%20question%20about%20studying%20abroad.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-md shadow-emerald-900/20 hover:scale-105 font-heading cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
            <span>Ask Us Directly on WhatsApp (+92 334 4626284)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
