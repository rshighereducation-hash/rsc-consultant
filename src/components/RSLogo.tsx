import React from "react";
import { useBrand } from "../context/BrandContext";
import logoImg from "../assets/images/ceo-logo.jpeg";

import {
  Upload,
  Sparkles,
  ShieldCheck,
  Award,
  CheckCircle2,
} from "lucide-react";

interface RSLogoProps {
  className?: string;
  variant?: "full" | "mark" | "horizontal" | "compact" | "badge";
  theme?: "light" | "dark" | "red";
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  showUploadTrigger?: boolean;
}

export const RSOfficialFullLogo: React.FC<{
  className?: string;
  theme?: "red" | "white";
  height?: number | string;
}> = ({ className = "", height = 80 }) => {
  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      title="RS Higher Education Consultants - Official Brand Logo">
      <img
        src={logoImg}
        alt="RS Higher Education Consultants"
        style={{
          height: typeof height === "number" ? `${height}px` : height,
          width: "auto",
        }}
        className="max-w-full object-contain drop-shadow-xs"
        draggable={false}
      />
    </div>
  );
};

export const RSOfficialEmblem: React.FC<{
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  variant?: "square" | "circle" | "transparent";
}> = ({ className = "", size = "md", variant = "circle" }) => {
  const sizeMap = {
    xs: "w-8 h-8",
    sm: "w-10 h-10",
    md: "w-14 h-14 sm:w-16 sm:h-16",
    lg: "w-20 h-20 sm:w-24 sm:h-24",
    xl: "w-28 h-28 sm:w-32 sm:h-32",
    "2xl": "w-40 h-40 sm:w-48 sm:h-48",
  };

  return (
    <div
      className={`relative inline-block select-none shrink-0 rounded-full overflow-hidden ${sizeMap[size]} ${className}`}
      title="RS Higher Education Consultants Official Logo"></div>
  );
};

export const RSLogo: React.FC<RSLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const { customLogo } = useBrand();

  const imageSizeClasses = {
    xs: "h-7 max-w-[110px]",
    sm: "h-9 max-w-[150px]",
    md: "h-12 sm:h-14 max-w-[220px]",
    lg: "h-14 sm:h-16 max-w-[260px]",
    xl: "h-18 sm:h-22 max-w-[320px]",
    "2xl": "h-26 sm:h-30 max-w-[380px]",
  };

  const logoSrc = customLogo || logoImg;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="relative inline-block select-none shrink-0 rounded-full overflow-hidden">
        <img
          src={logoSrc}
          alt="RS Higher Education Consultants"
          className={`${imageSizeClasses[size]} w-auto object-contain select-none`}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
};

/**
 * Outstanding surroundings container showcasing the brand logo with trust, satisfaction & credentials
 */
export const RSBrandShowcaseCard: React.FC<{
  className?: string;
  onOpenConsultation?: () => void;
}> = ({ className = "", onOpenConsultation }) => {
  const { customShowcaseLogo } = useBrand();

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-[#1A0303] to-slate-950 text-white border border-red-500/30 shadow-2xl shadow-red-950/40 overflow-hidden group font-poppins ${className}`}>
      {/* Ambient glowing radial flares */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DB0303]/40 transition-all duration-700" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,3,3,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Dedicated Showcase Card Logo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative p-1 rounded-full block shrink-0">
            <div className="w-28 h-28 sm:w-45 sm:h-45 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src={logoImg}
                alt="RS Higher Education Consultants Showcase Card Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="pt-2 space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300 font-poppins block mx-auto">
              RS Higher Education Consultants
            </span>
            <p className="text-[11px] text-slate-300 font-poppins">
              Peshawar • Khyber Pakhtunkhwa • Pakistan
            </p>
          </div>
        </div>

        {/* Right: Grammatically Correct Trust & Satisfaction Brand Statement */}
        <div className="lg:col-span-8 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/15 border border-red-400/30 text-amber-300 text-xs font-bold tracking-wide font-poppins">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Hallmark of Excellence</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-poppins">
              The Name of Trust, Integrity & Student Satisfaction
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-poppins font-normal">
              At{" "}
              <strong className="text-white font-bold">
                RS Higher Education Consultants
              </strong>
              , our brand stands as a trusted beacon for thousands of ambitious
              students. We turn global study aspirations into real international
              admissions across{" "}
              <strong className="text-amber-300 font-semibold">
                16 world-leading destinations
              </strong>{" "}
              with absolute transparency, zero hidden clauses, and complete
              ethical commitment.
            </p>
          </div>

          {/* 3 Core Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">
                  Unshakable Trust
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-poppins leading-snug">
                100% genuine university representation & honest case
                assessments.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">
                  99% Visa Success
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-poppins leading-snug">
                Meticulous documentation & expert embassy interview coaching.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">
                  Total Satisfaction
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-poppins leading-snug">
                Students’ satisfaction remains our first and highest priority.
              </p>
            </div>
          </div>

          {onOpenConsultation && (
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DB0303] to-red-600 hover:from-red-600 hover:to-[#DB0303] text-white font-bold text-xs sm:text-sm font-poppins shadow-lg shadow-red-900/40 hover:scale-105 transition-all cursor-pointer flex items-center gap-2">
                <span>Book Free Consultation</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
              <span className="text-xs text-slate-400 font-poppins">
                Direct guidance from certified senior counselors in Peshawar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
