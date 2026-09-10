import React, { useState, useRef, ChangeEvent } from 'react';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import { useBrand } from '../context/BrandContext';
import defaultStudentImg from '../assets/images/coursefind.jpeg';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Building2,
  GraduationCap,
  DollarSign,
  BookOpen,
  Camera,
  Upload,
  RefreshCw,
  Image as ImageIcon,
  Users
} from 'lucide-react';

interface DestinationFinderProps {
  onSelectDestination: (slug: string) => void;
  onOpenConsultation: () => void;
}

export const DestinationFinder: React.FC<DestinationFinderProps> = ({
  onSelectDestination,
  onOpenConsultation,
}) => {
  const { customStudentBanner, setCustomStudentBanner, openStudentBannerModal } = useBrand();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [studyLevel, setStudyLevel] = useState<string>('all');
  const [budgetRange, setBudgetRange] = useState<string>('all');
  const [englishStatus, setEnglishStatus] = useState<string>('all');
  const [fieldOfInterest, setFieldOfInterest] = useState<string>('all');
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  // Quick direct file upload handler
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
            setCustomStudentBanner(optimizedJpg);
          } else {
            setCustomStudentBanner(result);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMatches = ALL_DESTINATIONS.filter((dest) => {
    // Budget filter logic
    if (budgetRange === 'free-or-low') {
      if (!['germany', 'austria', 'romania', 'lithuania', 'malaysia', 'china', 'portugal'].includes(dest.slug)) {
        return false;
      }
    } else if (budgetRange === 'mid') {
      if (!['hungary', 'turkiye', 'south-cyprus', 'france', 'belgium', 'uk'].includes(dest.slug)) {
        return false;
      }
    } else if (budgetRange === 'high') {
      if (!['usa', 'canada', 'australia', 'uk'].includes(dest.slug)) {
        return false;
      }
    }

    // English status filter logic
    if (englishStatus === 'waiver') {
      if (!['uk', 'france', 'malaysia', 'turkiye', 'romania', 'south-cyprus', 'portugal'].includes(dest.slug)) {
        return false;
      }
    } else if (englishStatus === 'high-ielts') {
      if (!['usa', 'canada', 'uk', 'australia', 'germany', 'austria'].includes(dest.slug)) {
        return false;
      }
    }

    // Field of interest filter logic
    if (fieldOfInterest !== 'all') {
      const match = dest.popularFields.some(f =>
        f.name.toLowerCase().includes(fieldOfInterest.toLowerCase())
      );
      if (!match) return false;
    }

    return true;
  });

  return (
    <section id="course-finder-section" className="py-20 bg-gradient-to-b from-white via-red-50/20 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 text-slate-900 shadow-2xl shadow-red-950/5 relative overflow-hidden border border-red-100">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* Tool Title */}
          <div className="relative max-w-3xl space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
              <Compass className="w-3.5 h-3.5" />
              <span>Smart Study Pathway Tool</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading tracking-tight text-slate-900">
              Find Your Ideal Study Destination
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Filter by study level, expected annual tuition budget, and English proficiency status to see matching destinations and partner universities.
            </p>
          </div>

          {/* Horizontal Student Picture Showcase Banner */}
          <div
            id="student-horizontal-banner-card"
            className="relative mb-10 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group transition-all duration-300 bg-slate-900"
          >
            {/* Horizontal Student Image */}
            <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
              <img
                src={customStudentBanner || defaultStudentImg}
                alt="International University Students"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10 pointer-events-none" />

              {/* Bottom Caption & Community Badges */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-2 pointer-events-none">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading">
                    <Users className="w-3.5 h-3.5 text-red-400" />
                    <span>Global Student Community</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-200 text-[11px] font-bold border border-emerald-400/30 font-heading">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>1,250+ Admissions Across 16 Countries</span>
                  </span>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-lg sm:text-2xl font-black text-white font-heading tracking-tight drop-shadow-md">
                    Empowering Pakistani Students to Reach Top Global Universities
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 hidden sm:block font-medium drop-shadow-xs">
                    Comprehensive study abroad guidance with scholarship assistance and full visa file processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filters Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-8 border-b border-slate-100">
            {/* Filter 1: Study Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
                <GraduationCap className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>Target Study Level</span>
              </label>
              <select
                id="finder-level-select"
                value={studyLevel}
                onChange={(e) => setStudyLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all"
              >
                <option value="all">All Study Levels</option>
                <option value="undergraduate">Undergraduate (Bachelor - 3 to 4 Yrs)</option>
                <option value="postgraduate">Postgraduate (Master - 1 to 2 Yrs)</option>
                <option value="medicine">Medicine / Dentistry (MD / MBBS)</option>
                <option value="phd">PhD / Doctorate</option>
              </select>
            </div>

            {/* Filter 2: Annual Tuition Budget */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
                <DollarSign className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>Tuition Budget / Year</span>
              </label>
              <select
                id="finder-budget-select"
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all"
              >
                <option value="all">Any Tuition Budget</option>
                <option value="free-or-low">Zero / Low (€0 – €4,000 / yr)</option>
                <option value="mid">Moderate ($4,000 – $12,000 / yr)</option>
                <option value="high">Premium Tier ($15,000+ / yr)</option>
              </select>
            </div>

            {/* Filter 3: English Test / Waiver */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
                <BookOpen className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>English Test Status</span>
              </label>
              <select
                id="finder-english-select"
                value={englishStatus}
                onChange={(e) => setEnglishStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all"
              >
                <option value="all">Any English Status</option>
                <option value="waiver">Prefer IELTS Waiver / MOI</option>
                <option value="high-ielts">Have IELTS 6.5+ or PTE 58+</option>
              </select>
            </div>

            {/* Filter 4: Field of Study */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-heading">
                <Filter className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>Field of Study</span>
              </label>
              <select
                id="finder-field-select"
                value={fieldOfInterest}
                onChange={(e) => setFieldOfInterest(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#DB0303] focus:bg-white transition-all"
              >
                <option value="all">All Fields of Study</option>
                <option value="Computer">Computer Science & AI</option>
                <option value="Engineering">Engineering & Robotics</option>
                <option value="Business">Business & Finance</option>
                <option value="Medicine">Medicine & Healthcare</option>
                <option value="Data">Data Analytics & Tech</option>
              </select>
            </div>
          </div>

          {/* Real-time Matches Output */}
          <div className="relative pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DB0303]" />
                <h4 className="text-sm font-extrabold text-slate-900 font-heading">
                  Matching Destinations ({filteredMatches.length} Found)
                </h4>
              </div>
              <button
                onClick={() => {
                  setStudyLevel('all');
                  setBudgetRange('all');
                  setEnglishStatus('all');
                  setFieldOfInterest('all');
                }}
                className="text-xs text-slate-500 hover:text-[#DB0303] font-semibold transition-colors font-heading"
              >
                Reset Filters
              </button>
            </div>

            {filteredMatches.length === 0 ? (
              <div className="p-8 bg-red-50/50 rounded-2xl text-center space-y-3 border border-red-100">
                <p className="text-sm text-slate-700 font-medium">
                  No direct automated match with current combination. Speak with an RS consultant for tailored pathway options.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-2.5 bg-[#DB0303] text-white text-xs font-bold rounded-xl shadow-md font-heading"
                >
                  Request Custom Assessment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMatches.slice(0, 6).map((dest) => (
                  <div
                    key={dest.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-red-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-3 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1 bg-slate-50 rounded-xl shadow-2xs">{dest.flagEmoji}</span>
                        <div>
                          <h5 className="text-sm font-extrabold text-slate-900 font-heading">
                            {dest.countryName}
                          </h5>
                          <p className="text-[11px] text-[#DB0303] font-semibold">
                            {dest.universities.length} Verified Universities
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {dest.estimatedCosts.tuitionUndergrad.split('–')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">
                      {dest.tagline}
                    </p>

                    <div className="pt-2.5 flex items-center justify-between gap-2 border-t border-slate-100">
                      <button
                        onClick={() => onSelectDestination(dest.slug)}
                        className="text-xs font-bold text-slate-800 hover:text-[#DB0303] flex items-center gap-1 transition-colors font-heading"
                      >
                        <span>View Country Page</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={onOpenConsultation}
                        className="text-xs px-3 py-1.5 rounded-xl bg-[#DB0303] hover:bg-[#B30000] text-white font-bold font-heading shadow-xs"
                      >
                        Apply Here
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
