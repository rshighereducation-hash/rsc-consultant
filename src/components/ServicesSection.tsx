import React, { useState, useRef, ChangeEvent } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { useBrand } from '../context/BrandContext';
import { RSLogo, RSOfficialEmblem } from './RSLogo';
import defaultServicesImg from '../assets/images/pakistani_students_attractive_1787568393375.jpg';
import {
  Compass,
  Building2,
  GraduationCap,
  FileCheck2,
  Award,
  ShieldCheck,
  Users,
  Languages,
  Wallet,
  PlaneTakeoff,
  Home,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Camera,
  Upload,
  RefreshCw,
  Clock,
  BookOpen,
  Laptop,
  Image as ImageIcon
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Building2,
  GraduationCap,
  FileCheck2,
  Award,
  ShieldCheck,
  Users,
  Languages,
  Wallet,
  PlaneTakeoff,
  Home,
  HeartHandshake,
};

interface ServicesSectionProps {
  onOpenConsultation: () => void;
  showBanner?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenConsultation,
  showBanner = true,
}) => {
  const {
    customServicesBanner,
    customLaptopLogo,
    customLogo,
    setCustomServicesBanner,
    setCustomLaptopLogo,
    openServicesBannerModal,
    openLaptopLogoModal,
  } = useBrand();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const laptopLogoInputRef = useRef<HTMLInputElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'admissions' | 'visa' | 'departure'>('all');
  const [isExpanded, setIsExpanded] = useState(false);

  // Direct quick file upload handler for banner image
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
            setCustomServicesBanner(optimizedJpg);
          } else {
            setCustomServicesBanner(result);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Direct quick file upload handler for laptop screen logo
  const handleLaptopLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDimension = 800;
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
            const optimizedPng = canvas.toDataURL('image/png');
            setCustomLaptopLogo(optimizedPng);
          } else {
            setCustomLaptopLogo(result);
          }
        };
        img.src = result;
      };
      reader.readAsDataURL(file);
    }
  };

  const activeLaptopLogo = customLaptopLogo || customLogo;

  const filterServices = () => {
    switch (activeCategory) {
      case 'admissions':
        return SERVICES_DATA.filter((_, idx) => idx < 4);
      case 'visa':
        return SERVICES_DATA.filter((_, idx) => idx >= 4 && idx < 8);
      case 'departure':
        return SERVICES_DATA.filter((_, idx) => idx >= 8);
      default:
        return SERVICES_DATA;
    }
  };

  const filtered = filterServices();
  const displayedServices = isExpanded || activeCategory !== 'all' ? filtered : filtered.slice(0, 6);

  return (
    <section id="services-section" className="py-10 sm:py-14 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 border border-red-200 text-[11px] font-bold text-[#DB0303] uppercase tracking-wider font-heading">
              <Sparkles className="w-3 h-3" />
              <span>Complete End-to-End Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading tracking-tight">
              12 Comprehensive Study Abroad Steps & Services
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              From profile evaluation in Peshawar to university admission and visa grant across 16 global destinations.
            </p>
          </div>

          {/* Space-Efficient Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'All Services (12)' },
              { id: 'admissions', label: 'Admissions' },
              { id: 'visa', label: 'Visa & Finance' },
              { id: 'departure', label: 'Departure' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setIsExpanded(true);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#DB0303] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Wide High-Resolution Banner Image Container */}
        {showBanner && (
          <div
            id="services-students-horizontal-banner-card"
            className="relative mb-10 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 group transition-all duration-300 bg-slate-900"
          >
            {/* Horizontal Student Image */}
            <div className="relative w-full aspect-[16/9] max-h-[500px] min-h-[300px] sm:min-h-[380px] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={customServicesBanner || defaultServicesImg}
                alt="Students in University Consultation and Academic Guidance"
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/10 pointer-events-none" />

              {/* Bottom Caption & Highlights */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 space-y-2 pointer-events-none">
                <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading shadow-md">
                    {activeLaptopLogo ? (
                      <img
                        src={activeLaptopLogo}
                        alt="RS Logo"
                        className="w-4 h-4 rounded-full object-contain bg-white/20"
                      />
                    ) : (
                      <RSOfficialEmblem size="xs" className="w-4 h-4 shrink-0 shadow-xs" />
                    )}
                    <span>RS Higher Education Consultants Portal</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold border border-white/30 font-heading">
                    <Users className="w-3.5 h-3.5 text-red-300" />
                    <span>One-on-One Dedicated Academic Counselling</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/25 backdrop-blur-md text-emerald-200 text-[11px] font-bold border border-emerald-400/30 font-heading">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Certified Professional Study Advisors</span>
                  </span>
                </div>

                <div className="max-w-2xl">
                  <h3 className="text-lg sm:text-2xl font-black text-white font-heading tracking-tight drop-shadow-md">
                    Personalized Guidance from Application to Campus Arrival
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200/90 hidden sm:block font-medium drop-shadow-xs">
                    We prepare complete visa files, interview simulations, SOP reviews, and offer-letter follow-ups with university registrars.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compact Services Grid (Takes 60% less vertical space) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-3.5">
          {displayedServices.map((srv) => {
            const Icon = iconMap[srv.iconName] || Compass;
            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                onClick={() => setSelectedService(srv)}
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-red-400 hover:shadow-lg hover:shadow-red-950/5 transition-all duration-200 flex flex-col justify-between cursor-pointer hover:-translate-y-0.5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <div className="w-8 h-8 rounded-xl bg-red-50 text-[#DB0303] group-hover:bg-[#DB0303] group-hover:text-white transition-all flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    {srv.badge && (
                      <span className="text-[10px] font-extrabold font-heading px-2 py-0.5 rounded-md bg-red-50 text-[#DB0303] border border-red-100 truncate max-w-[80px]">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-sm font-black text-slate-900 font-heading group-hover:text-[#DB0303] transition-colors leading-snug line-clamp-1">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {srv.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#DB0303]">
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand / Show More Toggle when in 'all' view */}
        {activeCategory === 'all' && (
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-red-50 hover:text-[#DB0303] text-slate-700 text-xs font-bold font-heading transition-all cursor-pointer border border-slate-200/80 hover:border-red-200"
            >
              <span>{isExpanded ? 'Show Less (Compact View)' : 'View All 12 Core Services'}</span>
              <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          </div>
        )}

        {/* Compact CTA Strip */}
        <div className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-[#DB0303] to-[#B30000] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-sm sm:text-base font-black font-heading text-white">
              Ready to begin your application with certified counselors?
            </h4>
            <p className="text-red-100 text-xs font-medium">
              Visit Deans Trade Centre Peshawar or book an online video counseling session.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#DB0303] text-xs font-bold rounded-xl font-heading shadow-xs transition-all shrink-0 hover:scale-105 cursor-pointer"
          >
            Book Free Appointment
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          id="service-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-red-100 relative space-y-6 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5">
              <div className="p-3.5 rounded-2xl bg-red-50 text-[#DB0303]">
                {React.createElement(iconMap[selectedService.iconName] || Compass, {
                  className: 'w-6 h-6',
                })}
              </div>
              <div>
                <span className="text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
                  {selectedService.badge || 'RS Service'}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedService.fullDescription}
            </p>

            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-900 uppercase tracking-wider font-heading">
                Key Deliverables & Value:
              </p>
              <div className="space-y-2">
                {selectedService.keyBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl font-heading"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedService(null);
                  onOpenConsultation();
                }}
                className="px-5 py-2.5 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs font-bold rounded-xl shadow-md font-heading"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
