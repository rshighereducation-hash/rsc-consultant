import React from 'react';
import { useBrand } from '../context/BrandContext';
import { Upload, Sparkles, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';

interface RSLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal' | 'compact' | 'badge';
  theme?: 'light' | 'dark' | 'red';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showUploadTrigger?: boolean;
}

/**
 * Official Vector Emblem matching the authentic RS Higher Education Consultants Logo
 */
/**
 * Exact Vector recreation of the user's uploaded official logo:
 * - Red Serif "RS" with dynamic arching swoosh & 4-pointed star
 * - Tracked Serif "HIGHER EDUCATION"
 * - Balanced horizontal red rules with "CONSULTANTS"
 */
export const RSOfficialFullLogo: React.FC<{
  className?: string;
  theme?: 'red' | 'white';
  height?: number | string;
}> = ({ className = '', theme = 'red', height = 80 }) => {
  const primaryColor = theme === 'white' ? '#FFFFFF' : '#C8102E';
  const secondaryColor = theme === 'white' ? '#FFFFFF' : '#B80000';
  const starColor = theme === 'white' ? '#FFF2A8' : '#C8102E';

  return (
    <div
      className={`inline-flex flex-col items-center justify-center select-none ${className}`}
      title="RS Higher Education Consultants - Official Brand Logo"
    >
      <svg
        viewBox="0 0 600 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        className="max-w-full drop-shadow-xs"
      >
        {/* === Top Monogram Group === */}
        <g id="rs-monogram">
          {/* Serif 'R' */}
          <path
            d="M 120 40 
               L 260 40 
               C 315 40 348 65 348 115 
               C 348 155 320 185 272 195 
               C 315 228 348 285 380 345 
               L 315 345 
               C 285 285 258 235 218 215 
               L 182 215 
               L 182 345 
               L 120 345 
               Z 
               M 182 92 
               L 182 170 
               L 248 170 
               C 278 170 292 155 292 131 
               C 292 107 278 92 248 92 
               Z"
            fill={primaryColor}
          />

          {/* Serif 'S' with wide dynamic curvature */}
          <path
            d="M 465 70 
               C 445 52 415 42 380 42 
               C 325 42 292 72 292 118 
               C 292 160 320 182 372 202 
               C 432 225 470 252 470 305 
               C 470 365 422 400 358 400 
               C 315 400 275 382 245 358 
               L 265 315 
               C 290 338 322 355 358 355 
               C 392 355 418 335 418 302 
               C 418 265 390 245 338 225 
               C 282 202 240 178 240 125 
               C 240 70 288 30 362 30 
               C 405 30 445 42 475 60 
               Z"
            fill={secondaryColor}
          />

          {/* Dynamic sweeping swoosh slicing through the S and ending at top-right star */}
          <path
            d="M 180 380 
               C 260 380 330 310 400 220 
               C 445 162 490 100 535 75 
               C 485 105 425 185 365 260 
               C 305 335 240 375 180 380 
               Z"
            fill={primaryColor}
          />

          {/* 4-Pointed North Star at the peak of the swoosh */}
          <path
            d="M 538 52 
               C 538 68 552 80 568 80 
               C 552 80 538 92 538 108 
               C 538 92 524 80 508 80 
               C 524 80 538 68 538 52 
               Z"
            fill={starColor}
          />
        </g>

        {/* === Text: HIGHER EDUCATION === */}
        <text
          x="300"
          y="428"
          textAnchor="middle"
          fill={primaryColor}
          fontSize="36"
          fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
          fontWeight="700"
          letterSpacing="12"
        >
          HIGHER EDUCATION
        </text>

        {/* === Sub-line: — CONSULTANTS — === */}
        <g transform="translate(0, 460)">
          {/* Left Horizontal Red Line */}
          <line x1="20" y1="-8" x2="160" y2="-8" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
          
          {/* Center Text */}
          <text
            x="300"
            y="0"
            textAnchor="middle"
            fill={primaryColor}
            fontSize="26"
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', Georgia, serif"
            fontWeight="700"
            letterSpacing="8"
          >
            CONSULTANTS
          </text>
          
          {/* Right Horizontal Red Line */}
          <line x1="440" y1="-8" x2="580" y2="-8" stroke={primaryColor} strokeWidth="3.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

export const RSOfficialEmblem: React.FC<{
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'square' | 'circle' | 'transparent';
}> = ({ className = '', size = 'md', variant = 'circle' }) => {
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
    xl: 'w-28 h-28 sm:w-32 sm:h-32',
    '2xl': 'w-40 h-40 sm:w-48 sm:h-48',
  };

  return (
    <div
      className={`relative inline-block select-none shrink-0 rounded-full overflow-hidden ${sizeMap[size]} ${className}`}
      title="RS Higher Education Consultants Official Logo"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md rounded-full"
      >
        <defs>
          <linearGradient id="rsRedBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E60000" />
            <stop offset="50%" stopColor="#DB0303" />
            <stop offset="100%" stopColor="#B30000" />
          </linearGradient>
          <linearGradient id="starGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF2D6" />
          </linearGradient>
        </defs>

        {/* Background (Circle by default, or Square) */}
        {variant === 'circle' && (
          <circle cx="250" cy="250" r="250" fill="url(#rsRedBg)" />
        )}
        {variant === 'square' && (
          <rect width="500" height="500" rx="36" fill="url(#rsRedBg)" />
        )}

        {/* Inner RS Monogram & Design Group */}
        <g transform="translate(0, 0)">
          {/* Main 'R' Letterform (Serif style) */}
          <path
            d="M 145 125 L 235 125 C 265 125 285 142 285 172 C 285 198 268 215 240 220 C 265 240 285 275 305 315 L 265 315 C 248 278 230 245 208 235 L 180 235 L 180 315 L 145 315 Z M 180 152 L 180 210 L 225 210 C 245 210 255 198 255 181 C 255 164 245 152 225 152 Z"
            fill="#FFFFFF"
          />

          {/* Main 'S' Letterform (Serif style) */}
          <path
            d="M 345 140 C 330 130 310 125 285 125 C 248 125 228 145 228 172 C 228 198 245 212 280 224 C 320 238 348 255 348 288 C 348 322 318 345 275 345 C 248 345 222 335 202 320 L 215 295 C 232 308 252 318 275 318 C 298 318 318 305 318 288 C 318 265 300 252 265 240 C 228 226 198 210 198 175 C 198 142 228 118 275 118 C 302 118 328 126 348 138 Z"
            fill="#FFFFFF"
          />

          {/* Dynamic Ascending Swoosh arching from bottom left to top right */}
          <path
            d="M 175 345 C 215 345 260 300 300 240 C 330 195 365 150 395 130 C 360 150 315 210 275 265 C 240 315 200 340 175 345 Z"
            fill="#FFFFFF"
          />

          {/* Ascending Sparkle Star in upper right */}
          <path
            d="M 398 115 C 398 126 408 134 420 134 C 408 134 398 142 398 153 C 398 142 388 134 376 134 C 388 134 398 126 398 115 Z"
            fill="url(#starGlow)"
          />

          {/* "HIGHER EDUCATION" Tracked Typography */}
          <text
            x="250"
            y="395"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="26"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="700"
            letterSpacing="6"
          >
            HIGHER EDUCATION
          </text>

          {/* "—— CONSULTANTS ——" Sub-rule and Typography */}
          <line x1="90" y1="432" x2="165" y2="432" stroke="#FFFFFF" strokeWidth="2.5" />
          <text
            x="250"
            y="438"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="18"
            fontFamily="'Cinzel', 'Playfair Display', Georgia, serif"
            fontWeight="600"
            letterSpacing="5"
          >
            CONSULTANTS
          </text>
          <line x1="335" y1="432" x2="410" y2="432" stroke="#FFFFFF" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};

export const RSLogo: React.FC<RSLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const { customLogo } = useBrand();

  const imageSizeClasses = {
    xs: 'h-7 max-w-[110px]',
    sm: 'h-9 max-w-[150px]',
    md: 'h-12 sm:h-14 max-w-[220px]',
    lg: 'h-14 sm:h-16 max-w-[260px]',
    xl: 'h-18 sm:h-22 max-w-[320px]',
    '2xl': 'h-26 sm:h-30 max-w-[380px]',
  };

  // If user has custom logo set
  if (customLogo) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <div className="relative flex items-center justify-center shrink-0">
          <img
            src={customLogo}
            alt="RS Higher Education Consultants"
            className={`${imageSizeClasses[size]} w-auto object-contain select-none`}
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <div className="relative flex items-center justify-center">
        <RSOfficialEmblem size={size} />
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
}> = ({ className = '', onOpenConsultation }) => {
  const { customShowcaseLogo } = useBrand();

  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-slate-900 via-[#1A0303] to-slate-950 text-white border border-red-500/30 shadow-2xl shadow-red-950/40 overflow-hidden group font-poppins ${className}`}
    >
      {/* Ambient glowing radial flares */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none group-hover:bg-[#DB0303]/40 transition-all duration-700" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(219,3,3,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Dedicated Showcase Card Logo */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative p-1 rounded-full bg-gradient-to-br from-red-600 via-amber-400 to-red-600 shadow-2xl ring-4 ring-red-500/30 block shrink-0">
            {customShowcaseLogo ? (
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex items-center justify-center bg-slate-900 border border-white/20">
                <img
                  src={customShowcaseLogo}
                  alt="RS Higher Education Consultants Showcase Card Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            ) : (
              <RSOfficialEmblem size="xl" variant="circle" className="shadow-2xl rounded-full" />
            )}
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
              At <strong className="text-white font-bold">RS Higher Education Consultants</strong>, our brand stands as a trusted beacon for thousands of ambitious students. We turn global study aspirations into real international admissions across <strong className="text-amber-300 font-semibold">16 world-leading destinations</strong> with absolute transparency, zero hidden clauses, and complete ethical commitment.
            </p>
          </div>

          {/* 3 Core Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">Unshakable Trust</span>
              </div>
              <p className="text-[11px] text-slate-300 font-poppins leading-snug">
                100% genuine university representation & honest case assessments.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Award className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">99% Visa Success</span>
              </div>
              <p className="text-[11px] text-slate-300 font-poppins leading-snug">
                Meticulous documentation & expert embassy interview coaching.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-red-400/40 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-bold font-poppins text-white">Total Satisfaction</span>
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
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DB0303] to-red-600 hover:from-red-600 hover:to-[#DB0303] text-white font-bold text-xs sm:text-sm font-poppins shadow-lg shadow-red-900/40 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
              >
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

