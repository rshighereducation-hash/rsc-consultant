import React, { useState, useMemo, useRef, ChangeEvent } from 'react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { CountryFlag } from './CountryFlag';
import { useBrand } from '../context/BrandContext';
import defaultSuccessImg from '../assets/images/female_graduates_full_1787513525290.jpg';
import { RSOfficialEmblem } from './RSLogo';
import {
  Quote,
  Star,
  GraduationCap,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Camera,
  Upload,
  RefreshCw,
  Trophy,
  Users
} from 'lucide-react';

interface SuccessStoriesProps {
  onOpenConsultation: () => void;
  showBanner?: boolean;
}

export const SuccessStories: React.FC<SuccessStoriesProps> = ({
  onOpenConsultation,
  showBanner = true,
}) => {
  const { customSuccessBanner, setCustomSuccessBanner, openSuccessBannerModal } = useBrand();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  // Direct quick file upload handler
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
          const maxDimension = 1600;
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
            setCustomSuccessBanner(optimizedJpg);
          } else {
            setCustomSuccessBanner(result);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Extract unique countries from testimonials
  const countryFilters = useMemo(() => {
    const unique = Array.from(new Set(TESTIMONIALS_DATA.map((t) => t.destination)));
    return ['all', ...unique];
  }, []);

  const filteredTestimonials = useMemo(() => {
    if (selectedCountry === 'all') return TESTIMONIALS_DATA;
    return TESTIMONIALS_DATA.filter((t) => t.destination === selectedCountry);
  }, [selectedCountry]);

  return (
    <section id="success-stories-section" className="py-20 bg-slate-50/70 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Real Student Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            Hear From Our Global Scholars
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Read verified success reviews from Pakistani students placed in leading universities worldwide by RS Higher Education Consultants.
          </p>

          {/* Country Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {countryFilters.map((country) => {
              const sampleItem = TESTIMONIALS_DATA.find((t) => t.destination === country);
              const isSelected = selectedCountry === country;
              return (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold font-heading transition-all shadow-2xs cursor-pointer ${
                    isSelected
                      ? 'bg-[#DB0303] text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:text-[#DB0303] border border-slate-200 hover:border-red-200'
                  }`}
                >
                  {country !== 'all' && sampleItem && (
                    <CountryFlag
                      countryCode={country}
                      countryName={country}
                      fallbackEmoji={sampleItem.destinationFlag}
                      size="xs"
                    />
                  )}
                  <span>{country === 'all' ? 'All Reviews' : country}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Wide High-Resolution Banner Image Container */}
        {showBanner && (
          <div
            id="success-students-horizontal-banner-card"
            className="relative mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group transition-all duration-300 bg-slate-900"
          >
            {/* Horizontal Student Image */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] max-h-[520px] min-h-[300px] sm:min-h-[400px] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={customSuccessBanner || defaultSuccessImg}
                alt="Successful International Scholars & Graduates"
                className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/20 pointer-events-none" />

              {/* Official Brand Logo Stamp in Top-Left Corner (Fully Visible & Uncut) */}
              <div
                id="banner-official-rs-logo-badge"
                className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-white/25 shadow-2xl pointer-events-auto"
                title="RS Higher Education Consultants - Official Verified Placement Network"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white flex items-center justify-center p-0.5 border border-red-500 shadow-md shrink-0">
                  <RSOfficialEmblem size="xs" variant="circle" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-black text-white font-heading tracking-wide uppercase leading-tight flex items-center gap-1.5">
                    <span>RS Higher Education</span>
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-red-400 tracking-wider uppercase leading-none mt-0.5">
                    Official Student Placements
                  </div>
                </div>
              </div>

              {/* Bottom Caption & Achievement Highlights */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-2 pointer-events-none">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>98% Visa Success Rate</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-200 text-[11px] font-bold border border-emerald-400/30 font-heading">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>PKR 50M+ Scholarships Secured</span>
                  </span>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-lg sm:text-2xl font-black text-white font-heading tracking-tight drop-shadow-md">
                    Celebrating Our Students' Global Academic Milestones & Visa Victories
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 hidden sm:block font-medium drop-shadow-xs">
                    From university offer letters to airport departure and on-campus graduation, RS Consultants stands by every student.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              id={`testimonial-${item.id}`}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-red-300 hover:shadow-xl hover:shadow-red-950/5 transition-all duration-300 flex flex-col justify-between space-y-5 relative group hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Header with stars & official Country Logo / Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>

                  {/* Country Flag Logo Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-red-200 group-hover:bg-red-50/50 transition-colors shadow-2xs">
                    <CountryFlag
                      countryCode={item.destination}
                      countryName={item.destination}
                      fallbackEmoji={item.destinationFlag}
                      size="sm"
                    />
                    <span className="text-xs font-black text-slate-900 font-heading">
                      {item.destination}
                    </span>
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative">
                  <Quote className="w-7 h-7 text-red-100 absolute -top-2.5 -left-1 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed relative z-10 pl-2">
                    "{item.quote}"
                  </p>
                </div>

                {/* Admission Intake Pill */}
                {item.intake && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg">
                    <Calendar className="w-3 h-3 text-[#DB0303]" />
                    <span>{item.intake}</span>
                  </div>
                )}
              </div>

              {/* Student Profile Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-slate-900 font-heading flex items-center gap-1.5 truncate">
                    <span>{item.studentName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-[#DB0303] font-extrabold truncate">
                    {item.degree}
                  </p>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mt-0.5 font-medium truncate">
                    <GraduationCap className="w-3.5 h-3.5 text-[#DB0303] shrink-0" />
                    <span className="truncate">{item.university}</span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-500 font-semibold block">
                    {item.homeCity}
                  </span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold inline-block mt-0.5">
                    Visa Granted
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 p-8 bg-gradient-to-r from-[#DB0303] to-[#B30000] rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-red-600/20">
          <div className="space-y-1 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              Ready to write your own international success story?
            </h3>
            <p className="text-red-100 text-xs sm:text-sm font-medium">
              Schedule a personalized profile evaluation with our expert counselors in Peshawar today.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-7 py-4 bg-white hover:bg-slate-50 text-[#DB0303] text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-lg hover:scale-105 shrink-0 transition-all cursor-pointer"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};
