import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { ALL_DESTINATIONS, getAllUniversities } from '../data/destinationsData';
import { University } from '../types';
import { useBrand } from '../context/BrandContext';
import defaultUniCampusesImg from '../assets/images/global_universities_campuses_1787568611255.jpg';
import {
  Building2,
  ExternalLink,
  Search,
  Globe2,
  MapPin,
  Sparkles,
  ArrowRight,
  Filter,
  GraduationCap,
  Award,
  BookOpen,
  Camera,
  Upload,
  RefreshCw,
  Landmark,
  CheckCircle2
} from 'lucide-react';

const UniLogoThumb: React.FC<{
  websiteUrl?: string;
  name: string;
  flagEmoji: string;
}> = ({ websiteUrl, name, flagEmoji }) => {
  const [hasError, setHasError] = useState(false);
  const domain = useMemo(() => {
    if (!websiteUrl) return '';
    try {
      const url = new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
      return url.hostname.replace('www.', '');
    } catch {
      return '';
    }
  }, [websiteUrl]);

  if (!hasError && domain) {
    return (
      <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-slate-200 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          onError={() => setHasError(true)}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center text-base shrink-0 border border-slate-100">
      {flagEmoji}
    </div>
  );
};

interface UniversityCarouselProps {
  onSelectDestination: (slug: string) => void;
  onOpenConsultation: () => void;
}

export const UniversityCarousel: React.FC<UniversityCarouselProps> = ({
  onSelectDestination,
  onOpenConsultation,
}) => {
  const { customUniBanner, setCustomUniBanner, openUniBannerModal } = useBrand();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allUniversities = useMemo(() => getAllUniversities(), []);

  // Quick upload handler for universities banner
  const handleQuickUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDimension = 1800;
          let width = img.width;
          let height = img.height;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedJpg = canvas.toDataURL('image/jpeg', 0.9);
            setCustomUniBanner(optimizedJpg);
          } else {
            setCustomUniBanner(result);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Split universities into two groups for double marquee
  const row1 = useMemo(() => allUniversities.slice(0, 20), [allUniversities]);
  const row2 = useMemo(() => allUniversities.slice(20, 40), [allUniversities]);

  const filteredUniversities = useMemo(() => {
    return allUniversities.filter((uni) => {
      const matchCountry = selectedCountry === 'all' || uni.countrySlug === selectedCountry;
      const matchQuery =
        searchQuery === '' ||
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.popularPrograms.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCountry && matchQuery;
    });
  }, [allUniversities, selectedCountry, searchQuery]);

  return (
    <section id="universities-section" className="py-20 bg-gradient-to-b from-white via-red-50/20 to-white text-slate-900 relative overflow-hidden">
      {/* Decorative Red Accents */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-red-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <Building2 className="w-3.5 h-3.5" />
            <span>Accredited Global University Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight text-slate-900">
            160+ Featured World-Class Universities
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Direct admission pathways and verified institutional networks across the UK, USA, Canada, Germany, Australia, Europe, and Asia.
          </p>
        </div>

        {/* TOP COMBINED COUNTRIES UNIVERSITY BUILDINGS ARCHITECTURE SHOWCASE BANNER */}
        <div
          id="universities-combined-campuses-banner-card"
          className="relative mb-10 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group transition-all duration-300 bg-slate-950"
        >
          {/* Panoramic Campus Architecture Photo */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/7] max-h-[460px] min-h-[300px] sm:min-h-[380px] overflow-hidden bg-slate-950 flex items-center justify-center">
            <img
              src={customUniBanner || defaultUniCampusesImg}
              alt="Combined World University Campus Architectural Buildings - UK, USA, Canada, Australia, Germany, and Europe"
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Overlays for Readability & High Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 pointer-events-none" />

            {/* Bottom Content & Interactive Country Badges */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading shadow-md">
                  <Landmark className="w-3.5 h-3.5 text-amber-300" />
                  <span>Iconic Global University Architecture</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading">
                  <Globe2 className="w-3.5 h-3.5 text-red-300" />
                  <span>Combined UK • USA • Canada • Australia • Germany • Europe • Asia</span>
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-2xl font-black text-white font-heading tracking-tight drop-shadow-md">
                  Explore Renowned University Campuses Worldwide
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 hidden sm:block font-medium drop-shadow-xs max-w-2xl mt-0.5">
                  Direct official agreements with prestigious research institutions, historic Ivy League universities, and modern European polytechnics.
                </p>
              </div>

              {/* Quick Clickable Country Campus Shortcuts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  { slug: 'uk', label: 'UK (Oxford / Russell Group)', flag: '🇬🇧' },
                  { slug: 'usa', label: 'USA (Ivy League & State Tech)', flag: '🇺🇸' },
                  { slug: 'canada', label: 'Canada (Toronto / McGill)', flag: '🇨🇦' },
                  { slug: 'australia', label: 'Australia (Go8 Sandstone)', flag: '🇦🇺' },
                  { slug: 'germany', label: 'Germany (TU9 / Munich)', flag: '🇩🇪' },
                  { slug: 'cyprus', label: 'Cyprus (EMU / CIU)', flag: '🇨🇾' },
                  { slug: 'china', label: 'China (Tsinghua / C9)', flag: '🇨🇳' },
                ].map((item) => (
                  <button
                    key={item.slug}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCountry(item.slug);
                      const directoryEl = document.getElementById('university-country-select');
                      if (directoryEl) {
                        directoryEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer font-heading backdrop-blur-md border ${
                      selectedCountry === item.slug
                        ? 'bg-[#DB0303] text-white border-red-400 shadow-md'
                        : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white border-white/20 hover:border-red-400/50'
                    }`}
                  >
                    <span>{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DUAL HORIZONTAL SLIDING ANIMATED LOGO TICKERS */}
        <div className="mb-14 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Sliding Institutional Showcase (Hover to Pause)</span>
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
              10 Verified Universities per Country
            </span>
          </div>

          {/* Marquee Row 1: Sliding Left */}
          <div className="relative overflow-hidden py-1.5 bg-white rounded-2xl border border-red-100 shadow-sm">
            <div className="animate-marquee gap-3 px-3">
              {[...row1, ...row1].map((uni, idx) => (
                <div
                  key={`m1-${uni.id}-${idx}`}
                  onClick={() => onSelectDestination(uni.countrySlug)}
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50/80 border border-slate-200/80 hover:border-red-300 text-xs font-bold text-slate-900 hover:text-[#DB0303] transition-all cursor-pointer shrink-0 shadow-2xs group"
                >
                  <UniLogoThumb websiteUrl={uni.officialWebsite} name={uni.name} flagEmoji={uni.flagEmoji} />
                  <div>
                    <p className="font-heading font-extrabold truncate max-w-[210px] text-slate-900 group-hover:text-[#DB0303]">
                      {uni.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-normal mt-0.5">
                      <span>{uni.city}, {uni.countryName}</span>
                      {uni.ranking && (
                        <span className="text-[#DB0303] font-semibold">• {uni.ranking}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2: Sliding Right (Reverse) */}
          <div className="relative overflow-hidden py-1.5 bg-white rounded-2xl border border-red-100 shadow-sm">
            <div className="animate-marquee-reverse gap-3 px-3">
              {[...row2, ...row2].map((uni, idx) => (
                <div
                  key={`m2-${uni.id}-${idx}`}
                  onClick={() => onSelectDestination(uni.countrySlug)}
                  className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-red-50/80 border border-slate-200/80 hover:border-red-300 text-xs font-bold text-slate-900 hover:text-[#DB0303] transition-all cursor-pointer shrink-0 shadow-2xs group"
                >
                  <UniLogoThumb websiteUrl={uni.officialWebsite} name={uni.name} flagEmoji={uni.flagEmoji} />
                  <div>
                    <p className="font-heading font-extrabold truncate max-w-[210px] text-slate-900 group-hover:text-[#DB0303]">
                      {uni.name}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-normal mt-0.5">
                      <span>{uni.city}, {uni.countryName}</span>
                      {uni.ranking && (
                        <span className="text-[#DB0303] font-semibold">• {uni.ranking}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-lg shadow-red-950/5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="university-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search university by name, city, or program (e.g. Manchester, Data Science)..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all"
              />
            </div>

            {/* Country Selector */}
            <div className="md:col-span-4">
              <select
                id="university-country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all font-medium"
              >
                <option value="all">
                  All 16 Study Destinations (160 Universities)
                </option>
                {ALL_DESTINATIONS.map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.flagEmoji} {d.countryName} ({d.universities.length} Institutions)
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Button */}
            <div className="md:col-span-2 text-right">
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSearchQuery('');
                }}
                className="w-full py-3 text-xs font-bold text-slate-700 hover:text-[#DB0303] bg-slate-100 hover:bg-red-50 rounded-2xl transition-colors font-heading"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUniversities.slice(0, 18).map((uni) => (
            <div
              key={uni.id}
              id={`uni-card-${uni.id}`}
              className="bg-white border border-slate-200/80 hover:border-red-300 rounded-3xl p-5.5 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/5 flex flex-col justify-between space-y-4 group hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <UniLogoThumb websiteUrl={uni.officialWebsite} name={uni.name} flagEmoji={uni.flagEmoji} />
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#DB0303] bg-red-50 px-2 py-0.5 rounded-lg border border-red-100">
                        <span>{uni.flagEmoji}</span>
                        <span>{uni.countryName}</span>
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 font-heading mt-1.5 group-hover:text-[#DB0303] transition-colors leading-snug">
                        {uni.name}
                      </h3>
                    </div>
                  </div>
                  {uni.ranking && (
                    <span className="text-[10px] bg-red-50 text-[#DB0303] border border-red-200 px-2 py-0.5 rounded-full shrink-0 font-bold font-heading">
                      {uni.ranking}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                  <span>{uni.city}</span>
                </div>

                {/* Popular programs tags */}
                <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#DB0303]" />
                    <span>Key In-Demand Programs:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {uni.popularPrograms.slice(0, 3).map((prog, pIdx) => (
                      <span
                        key={pIdx}
                        className="text-[10px] bg-slate-50 text-slate-700 px-2 py-1 rounded-lg border border-slate-100 font-medium"
                      >
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={uni.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-[#DB0303] flex items-center gap-1 font-semibold transition-colors"
                >
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3 text-[#DB0303]" />
                </a>

                <button
                  onClick={() => onSelectDestination(uni.countrySlug)}
                  className="text-xs bg-[#DB0303] hover:bg-[#B30000] text-white px-3.5 py-1.5 rounded-xl font-bold transition-all font-heading shadow-xs shadow-red-500/20"
                >
                  View Country Guide
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info & Consultation link */}
        <div className="mt-12 text-center space-y-4">
          <p className="text-xs text-slate-500 font-medium">
            Showing {Math.min(18, filteredUniversities.length)} of {filteredUniversities.length} institutions match your search criteria.
          </p>
          <button
            onClick={onOpenConsultation}
            className="px-8 py-4 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-lg shadow-red-600/25 inline-flex items-center gap-2 hover:scale-[1.02] transition-all"
          >
            <span>Apply to Any Institution with RS Certified Consultants</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
