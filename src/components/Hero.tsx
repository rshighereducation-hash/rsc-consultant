import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { CountryFlag } from './CountryFlag';
import { useBrand } from '../context/BrandContext';
import {
  ArrowRight,
  Globe2,
  GraduationCap,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  CheckCircle2,
  Compass,
  Star,
  Users,
  Building2,
  ChevronRight,
  Upload,
  Camera,
  RotateCcw,
  Image as ImageIcon
} from 'lucide-react';
import { ALL_DESTINATIONS, getAllUniversities } from '../data/destinationsData';

// Component to reliably render official University Logo with multi-tier fallback
const UniversityLogoImg: React.FC<{
  logoUrl?: string;
  domain?: string;
  name: string;
  crestText: string;
  crestBg: string;
}> = ({ logoUrl, domain, name, crestText, crestBg }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(
    logoUrl || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null)
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (imgSrc && domain && !imgSrc.includes('google.com/s2/favicons')) {
      // Fallback to high-res Google favicon service
      setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
    } else {
      setHasError(true);
    }
  };

  if (!hasError && imgSrc) {
    return (
      <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200/90 shadow-2xs flex items-center justify-center shrink-0 overflow-hidden group-hover:border-red-300 transition-colors">
        <img
          src={imgSrc}
          alt={`${name} official logo`}
          className="w-full h-full object-contain"
          onError={handleError}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div
      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${crestBg} text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0 tracking-tighter border border-white/20`}
    >
      <span>{crestText}</span>
    </div>
  );
};

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreDestinations: () => void;
  onSelectDestination: (slug: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenConsultation,
  onExploreDestinations,
  onSelectDestination,
}) => {
  const {
    customHeroPhoto,
    openHeroPhotoModal,
    setCustomHeroPhoto,
  } = useBrand();

  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const defaultHeroImage =
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop';
  const activeHeroImage = customHeroPhoto || defaultHeroImage;

  const handleHeroFileDirect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1400;
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
          if (file.type === 'image/png') {
            ctx.drawImage(img, 0, 0, width, height);
            setCustomHeroPhoto(canvas.toDataURL('image/png'));
          } else {
            ctx.drawImage(img, 0, 0, width, height);
            setCustomHeroPhoto(canvas.toDataURL('image/jpeg', 0.9));
          }
        } else {
          setCustomHeroPhoto(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleHeroFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleHeroFileDirect(e.target.files[0]);
    }
  };

  const handleHeroDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleHeroFileDirect(e.dataTransfer.files[0]);
    }
  };

  const [destinationFilter, setDestinationFilter] = useState<'all' | 'anglophone' | 'europe' | 'asia'>('all');
  const [sortOrder, setSortOrder] = useState<'ranked' | 'alphabetical'>('ranked');

  const allDestinationsList = [
    // 01-04: Top Anglophone Hubs
    { name: 'United Kingdom', flag: '🇬🇧', tag: '1-Yr Masters & PSW', slug: 'uk', region: 'anglophone', seq: '01' },
    { name: 'United States', flag: '🇺🇸', tag: 'STEM OPT 3 Years', slug: 'usa', region: 'anglophone', seq: '02' },
    { name: 'Canada', flag: '🇨🇦', tag: 'PGWP & Fast SDS', slug: 'canada', region: 'anglophone', seq: '03' },
    { name: 'Australia', flag: '🇦🇺', tag: 'Go8 & Post-Study Work', slug: 'australia', region: 'anglophone', seq: '04' },
    
    // 05-12: Europe & Schengen Study Hubs
    { name: 'Germany', flag: '🇩🇪', tag: 'Tuition-Free & Blue Card', slug: 'germany', region: 'europe', seq: '05' },
    { name: 'France', flag: '🇫🇷', tag: '5-Yr Schengen & B-Schools', slug: 'france', region: 'europe', seq: '06' },
    { name: 'Austria', flag: '🇦🇹', tag: '€726/Sem & Vienna Rank', slug: 'austria', region: 'europe', seq: '07' },
    { name: 'Belgium', flag: '🇧🇪', tag: 'EU Capital & Low Fees', slug: 'belgium', region: 'europe', seq: '08' },
    { name: 'Portugal', flag: '🇵🇹', tag: 'Fast PR Path & Schengen', slug: 'portugal', region: 'europe', seq: '09' },
    { name: 'Hungary', flag: '🇭🇺', tag: 'Stipendium Hungaricum', slug: 'hungary', region: 'europe', seq: '10' },
    { name: 'Lithuania', flag: '🇱🇹', tag: 'EU Fintech & Low Cost', slug: 'lithuania', region: 'europe', seq: '11' },
    { name: 'Romania', flag: '🇷🇴', tag: 'Affordable & EU Degrees', slug: 'romania', region: 'europe', slugSeq: '12', seq: '12' },
    
    // 13-16: Asia & Mediterranean Study Hubs
    { name: 'Türkiye', flag: '🇹🇷', tag: 'Turkiye Burslari & No IELTS', slug: 'turkiye', region: 'asia', seq: '13' },
    { name: 'Cyprus', flag: '🇨🇾', tag: 'Fast Visa & Low Cost', slug: 'south-cyprus', region: 'asia', seq: '14' },
    { name: 'Malaysia', flag: '🇲🇾', tag: 'eVAL Fast Visa & UK Dual', slug: 'malaysia', region: 'asia', seq: '15' },
    { name: 'China', flag: '🇨🇳', tag: 'CSC Fully Funded & MBBS', slug: 'china', region: 'asia', seq: '16' },
  ];

  const displayedDestinations = React.useMemo(() => {
    let list = [...allDestinationsList];
    if (destinationFilter !== 'all') {
      list = list.filter((item) => item.region === destinationFilter);
    }
    if (sortOrder === 'alphabetical') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [destinationFilter, sortOrder]);

  const trustBadges = [
    { icon: Compass, title: 'Profile Assessment', desc: 'Accurate career & academic matching' },
    { icon: GraduationCap, title: '160+ University Portfolios', desc: 'Direct accredited partner paths' },
    { icon: ShieldCheck, title: 'Student Visa Filing', desc: '100% genuine embassy compliance' },
    { icon: Award, title: 'Scholarship Guidance', desc: 'Merit & need-based assistance' },
  ];

  // Curated Multi-Country Global Universities with Exact Official Logos & Emblems
  const globalUniversities = [
    {
      name: 'Sabancı University',
      country: 'Türkiye',
      countrySlug: 'turkiye',
      flag: '🇹🇷',
      city: 'Istanbul',
      tag: 'Top Research',
      domain: 'sabanciuniv.edu',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Sabanc%C4%B1_University_logo.svg/320px-Sabanc%C4%B1_University_logo.svg.png',
      crestBg: 'from-blue-900 to-indigo-950',
      crestText: 'SU',
    },
    {
      name: 'Technical University of Munich',
      country: 'Germany',
      countrySlug: 'germany',
      flag: '🇩🇪',
      city: 'Munich',
      tag: 'Tuition-Free',
      domain: 'tum.de',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Logo_of_the_Technical_University_of_Munich.svg/320px-Logo_of_the_Technical_University_of_Munich.svg.png',
      crestBg: 'from-blue-600 to-blue-800',
      crestText: 'TUM',
    },
    {
      name: 'Arizona State University',
      country: 'USA',
      countrySlug: 'usa',
      flag: '🇺🇸',
      city: 'Phoenix, AZ',
      tag: '#1 Innovation',
      domain: 'asu.edu',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Arizona_State_University_seal.svg/320px-Arizona_State_University_seal.svg.png',
      crestBg: 'from-amber-600 to-red-800',
      crestText: 'ASU',
    },
    {
      name: 'University of Windsor',
      country: 'Canada',
      countrySlug: 'canada',
      flag: '🇨🇦',
      city: 'Windsor, ON',
      tag: 'PGWP & Co-op',
      domain: 'uwindsor.ca',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/University_of_Windsor_Shield.svg/320px-University_of_Windsor_Shield.svg.png',
      crestBg: 'from-blue-700 to-yellow-600',
      crestText: 'UW',
    },
    {
      name: 'Casa College',
      country: 'South Cyprus',
      countrySlug: 'south-cyprus',
      flag: '🇨🇾',
      city: 'Nicosia',
      tag: 'EU Direct',
      domain: 'casacollege.ac.cy',
      logoUrl: 'https://casacollege.ac.cy/wp-content/uploads/2021/04/casa-logo.png',
      crestBg: 'from-emerald-700 to-teal-900',
      crestText: 'CC',
    },
    {
      name: 'Tsinghua University',
      country: 'China',
      countrySlug: 'china',
      flag: '🇨🇳',
      city: 'Beijing',
      tag: 'CSC Funded',
      domain: 'tsinghua.edu.cn',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Tsinghua_University_Logo.svg/320px-Tsinghua_University_Logo.svg.png',
      crestBg: 'from-purple-800 to-purple-950',
      crestText: 'THU',
    },
    {
      name: 'University of Melbourne',
      country: 'Australia',
      countrySlug: 'australia',
      flag: '🇦🇺',
      city: 'Melbourne',
      tag: 'Go8 Top 20',
      domain: 'unimelb.edu.au',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/The_University_of_Melbourne_logo.svg/320px-The_University_of_Melbourne_logo.svg.png',
      crestBg: 'from-blue-900 to-slate-900',
      crestText: 'UoM',
    },
    {
      name: 'Universiti Malaya',
      country: 'Malaysia',
      countrySlug: 'malaysia',
      flag: '🇲🇾',
      city: 'Kuala Lumpur',
      tag: 'Top 60 Global',
      domain: 'um.edu.my',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Universiti_Malaya_coat_of_arms.svg/320px-Universiti_Malaya_coat_of_arms.svg.png',
      crestBg: 'from-red-700 to-blue-900',
      crestText: 'UM',
    },
    {
      name: 'Vilnius University',
      country: 'Lithuania',
      countrySlug: 'lithuania',
      flag: '🇱🇹',
      city: 'Vilnius',
      tag: 'Schengen TRP',
      domain: 'vu.lt',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Vilnius_University_Seal.svg/320px-Vilnius_University_Seal.svg.png',
      crestBg: 'from-rose-800 to-amber-700',
      crestText: 'VU',
    },
    {
      name: 'Bahçeşehir University',
      country: 'Türkiye',
      countrySlug: 'turkiye',
      flag: '🇹🇷',
      city: 'Istanbul',
      tag: 'Global Campus',
      domain: 'bau.edu.tr',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Bahcesehir_University_logo.png/320px-Bahcesehir_University_logo.png',
      crestBg: 'from-blue-800 to-blue-950',
      crestText: 'BAU',
    },
    {
      name: 'York University',
      country: 'Canada',
      countrySlug: 'canada',
      flag: '🇨🇦',
      city: 'Toronto, ON',
      tag: 'Schulich B-School',
      domain: 'yorku.ca',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/York_University_Logo.svg/320px-York_University_Logo.svg.png',
      crestBg: 'from-red-600 to-red-800',
      crestText: 'YU',
    },
    {
      name: 'RWTH Aachen University',
      country: 'Germany',
      countrySlug: 'germany',
      flag: '🇩🇪',
      city: 'Aachen',
      tag: 'Top Engineering',
      domain: 'rwth-aachen.de',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/RWTH_Aachen_University_Logo.svg/320px-RWTH_Aachen_University_Logo.svg.png',
      crestBg: 'from-blue-700 to-slate-800',
      crestText: 'RWTH',
    },
    {
      name: 'Northeastern University',
      country: 'USA',
      countrySlug: 'usa',
      flag: '🇺🇸',
      city: 'Boston, MA',
      tag: 'STEM & Co-op',
      domain: 'northeastern.edu',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Northeastern_University_seal.svg/320px-Northeastern_University_seal.svg.png',
      crestBg: 'from-red-700 to-slate-950',
      crestText: 'NEU',
    },
    {
      name: 'CTL Eurocollege',
      country: 'South Cyprus',
      countrySlug: 'south-cyprus',
      flag: '🇨🇾',
      city: 'Limassol',
      tag: 'Hospitality & IT',
      domain: 'ctleuro.ac.cy',
      logoUrl: 'https://www.google.com/s2/favicons?domain=ctleuro.ac.cy&sz=128',
      crestBg: 'from-blue-600 to-cyan-800',
      crestText: 'CTL',
    },
    {
      name: 'Zhejiang University',
      country: 'China',
      countrySlug: 'china',
      flag: '🇨🇳',
      city: 'Hangzhou',
      tag: 'MBBS & Tech',
      domain: 'zju.edu.cn',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Zhejiang_University_logo.svg/320px-Zhejiang_University_logo.svg.png',
      crestBg: 'from-blue-900 to-indigo-900',
      crestText: 'ZJU',
    },
  ];

  // Dedicated UK Partner Universities with Official Exact Logos
  const ukUniversities = [
    {
      name: 'University of Hertfordshire',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Hatfield, London',
      tag: 'Fast CAS',
      domain: 'herts.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/University_of_Hertfordshire_Logo.svg/320px-University_of_Hertfordshire_Logo.svg.png',
      crestBg: 'from-purple-800 to-slate-900',
      crestText: 'UH',
      badge: '1-Yr Masters & PSW',
    },
    {
      name: 'Coventry University',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Coventry',
      tag: '5-Star Employability',
      domain: 'coventry.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Coventry_University_Logo.svg/320px-Coventry_University_Logo.svg.png',
      crestBg: 'from-blue-700 to-blue-950',
      crestText: 'CU',
      badge: 'Automotive & AI Hub',
    },
    {
      name: 'University of East London',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'London',
      tag: 'Stratford Campus',
      domain: 'uel.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/University_of_East_London_logo.svg/320px-University_of_East_London_logo.svg.png',
      crestBg: 'from-red-600 to-slate-900',
      crestText: 'UEL',
      badge: 'Career-Led Degrees',
    },
    {
      name: 'University of Greenwich',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'London',
      tag: 'Maritime Heritage',
      domain: 'gre.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/University_of_Greenwich_logo.svg/320px-University_of_Greenwich_logo.svg.png',
      crestBg: 'from-blue-900 to-slate-950',
      crestText: 'UoG',
      badge: 'UNESCO Campus',
    },
    {
      name: 'Teesside University',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Middlesbrough',
      tag: 'Low Cost & Tech',
      domain: 'tees.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Teesside_University_Logo.svg/320px-Teesside_University_Logo.svg.png',
      crestBg: 'from-amber-600 to-slate-900',
      crestText: 'TU',
      badge: 'Digital Forensics Leader',
    },
    {
      name: 'University of Chester',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Chester',
      tag: 'High Scholarships',
      domain: 'chester.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/18/University_of_Chester_logo.svg/320px-University_of_Chester_logo.svg.png',
      crestBg: 'from-red-700 to-blue-950',
      crestText: 'UoC',
      badge: 'Safe Historic City',
    },
    {
      name: 'De Montfort University',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Leicester',
      tag: 'DMU Works',
      domain: 'dmu.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/De_Montfort_University_logo.svg/320px-De_Montfort_University_logo.svg.png',
      crestBg: 'from-slate-800 to-red-800',
      crestText: 'DMU',
      badge: 'Global Work Placements',
    },
    {
      name: 'University of Dundee',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Dundee, Scotland',
      tag: 'Top 30 UK',
      domain: 'dundee.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/University_of_Dundee_logo.svg/320px-University_of_Dundee_logo.svg.png',
      crestBg: 'from-blue-700 to-indigo-900',
      crestText: 'UoD',
      badge: 'Biomedical & Law Rank',
    },
    {
      name: 'University of Portsmouth',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Portsmouth',
      tag: 'Top Employability',
      domain: 'port.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/ab/University_of_Portsmouth_logo.svg/320px-University_of_Portsmouth_logo.svg.png',
      crestBg: 'from-purple-900 to-indigo-950',
      crestText: 'UoP',
      badge: 'Coastal Innovation Hub',
    },
    {
      name: 'University of Bradford',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Bradford',
      tag: 'Triple Crown Business',
      domain: 'bradford.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/University_of_Bradford_logo.svg/320px-University_of_Bradford_logo.svg.png',
      crestBg: 'from-teal-800 to-slate-900',
      crestText: 'UoB',
      badge: 'Affordable Living',
    },
    {
      name: 'Birmingham City University',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'Birmingham',
      tag: 'Heart of UK',
      domain: 'bcu.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Birmingham_City_University_logo.svg/320px-Birmingham_City_University_logo.svg.png',
      crestBg: 'from-blue-800 to-slate-900',
      crestText: 'BCU',
      badge: 'Modern STEAM Campus',
    },
    {
      name: 'Ulster University',
      country: 'United Kingdom',
      countrySlug: 'uk',
      flag: '🇬🇧',
      city: 'London / Belfast',
      tag: 'High Visa Ratio',
      domain: 'ulster.ac.uk',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Ulster_University_logo.svg/320px-Ulster_University_logo.svg.png',
      crestBg: 'from-blue-900 to-emerald-900',
      crestText: 'UU',
      badge: 'London Branch Programs',
    },
  ];

  return (
    <section
      id="hero-section"
      className="relative pt-24 sm:pt-28 pb-14 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-gradient-to-b from-red-50/70 via-white to-slate-50"
    >
      {/* Decorative Red Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-200/40 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Messaging & CTAs */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-7">
            {/* Top Brand Pill with Live Pulse */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-red-200 shadow-xs shadow-red-100">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DB0303] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#DB0303]" />
              </span>
              <span className="text-xs font-bold tracking-wide uppercase text-[#DB0303] font-heading">
                RS Higher Education Consultants • Deans Trade Centre Peshawar
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight font-heading text-slate-900 leading-[1.12]">
                Your Gateway to{' '}
                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#DB0303] via-[#E60505] to-[#B30000]">
                  Global Education
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#DB0303]/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
                Empowering Pakistani students with transparent, ethical, and result-driven counseling for admissions, scholarships, and student visas across <strong className="text-slate-900 font-semibold">16 leading global study destinations</strong>.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                id="hero-book-btn"
                onClick={onOpenConsultation}
                className="px-7 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] active:scale-[0.98] shadow-xl shadow-red-600/30 rounded-2xl transition-all font-heading flex items-center justify-center gap-3 group"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-explore-btn"
                onClick={onExploreDestinations}
                className="px-6 py-4 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-red-50/50 border border-slate-200 hover:border-red-300 rounded-2xl shadow-xs transition-all font-heading flex items-center justify-center gap-2"
              >
                <Globe2 className="w-5 h-5 text-[#DB0303]" />
                <span>Explore 16 Countries</span>
              </button>
            </div>

            {/* All 16 Global Destination Chips in Proper Sequence */}
            <div className="pt-4 border-t border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5 font-heading">
                  <Sparkles className="w-3.5 h-3.5 text-[#DB0303]" />
                  <span>16 Global Destinations (In Proper Sequence):</span>
                </p>
                
                {/* Region Category Sequence Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {[
                    { id: 'all', label: 'All 16' },
                    { id: 'anglophone', label: 'Anglophone (01-04)' },
                    { id: 'europe', label: 'Europe (05-12)' },
                    { id: 'asia', label: 'Asia & Med (13-16)' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setDestinationFilter(tab.id as any)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all font-heading shrink-0 cursor-pointer ${
                        destinationFilter === tab.id
                          ? 'bg-[#DB0303] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Properly Sequenced Grid of 16 Destinations */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 sm:max-h-none overflow-y-auto pr-1">
                {displayedDestinations.map((pick) => (
                  <button
                    key={pick.name}
                    id={`hero-chip-${pick.slug}`}
                    onClick={() => onSelectDestination(pick.slug)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-red-50/80 border border-slate-200/90 hover:border-red-300 text-left transition-all shadow-2xs hover:shadow-xs group cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    title={`Explore ${pick.name} Admissions, Requirements & Scholarships`}
                  >
                    <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-[#DB0303] shrink-0">
                      {pick.seq}
                    </span>
                    <CountryFlag
                      countryCode={pick.slug}
                      countryName={pick.name}
                      fallbackEmoji={pick.flag}
                      size="sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 group-hover:text-[#DB0303] truncate font-heading leading-tight">
                        {pick.name}
                      </p>
                      <p className="text-[10px] text-slate-500 group-hover:text-red-700 truncate font-medium leading-tight mt-0.5">
                        {pick.tag}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: High-End Visual Card & Animated Elements */}
          <div className="lg:col-span-5 relative">
            {/* Background Glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-3xl opacity-20 blur-xl -z-10" />

            <div className="relative rounded-3xl bg-white p-2.5 shadow-2xl border border-red-100">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/3.2] sm:aspect-[4/3] group/heroimg">
                {/* Main Hero Photo */}
                <img
                  src={activeHeroImage}
                  alt="International University Students with Global Education Pathway"
                  className="w-full h-full object-cover object-center transform group-hover/heroimg:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/30" />

                {/* Floating Live Badge Top Left (Compact) */}
                <div className="absolute top-2.5 left-2.5 backdrop-blur-md bg-white/95 border border-red-100 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 z-20">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#DB0303] animate-ping" />
                  <span className="text-[11px] font-extrabold text-slate-900 font-heading">
                    Admissions Open
                  </span>
                </div>

                {/* Overlay Content Bottom (Compact) */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 space-y-1.5 z-10">
                  <div className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-md rounded-xl border border-slate-100 shadow-sm flex items-center justify-between text-xs">
                    <div>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-heading">
                        Study Abroad
                      </p>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        16 Global Destinations
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider font-heading">
                        Global Network
                      </p>
                      <p className="font-extrabold text-[#DB0303] text-xs sm:text-sm">
                        160+ Universities
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Feature Checklist */}
              <div className="p-3.5 grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50/80 rounded-xl mt-2 border border-slate-100">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Genuine Guidance</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero Hidden Fees</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Official University Direct</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1-on-1 Visa Mock Prep</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* HORIZONTAL SLIDING MARQUEE TICKERS (DUAL COMPLEMENTARY SLIDERS) */}
        <div className="mt-14 pt-8 border-t border-red-100/80 space-y-5">
          {/* Row 1 Header: Global Multi-Country Universities */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-red-100 text-[#DB0303] rounded-lg">
                <Globe2 className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-heading">
                Accredited Global Partner Universities (16 Leading Destinations)
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
              Slow Smooth Scroll • USA, Canada, Germany, Türkiye, Cyprus, China & Australia
            </span>
          </div>

          {/* Row 1: Global Universities (Slow Leftward Scroll) */}
          <div className="relative overflow-hidden py-2 bg-gradient-to-r from-white via-slate-50/50 to-white rounded-2xl border border-red-100/90 shadow-2xs">
            <div className="animate-marquee-slow gap-3 px-3">
              {[...globalUniversities, ...globalUniversities].map((uni, idx) => (
                <div
                  key={`global-${uni.name}-${idx}`}
                  onClick={() => onSelectDestination(uni.countrySlug)}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-red-50/70 border border-slate-200/90 hover:border-red-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0 group"
                  title={`Click to explore ${uni.country} study pathways`}
                >
                  {/* University Official Exact Logo Image / Crest with Multi-tier Fallback */}
                  <UniversityLogoImg
                    logoUrl={uni.logoUrl}
                    domain={uni.domain}
                    name={uni.name}
                    crestText={uni.crestText}
                    crestBg={uni.crestBg}
                  />

                  {/* University Name & Country Info */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{uni.flag}</span>
                      <span className="font-bold text-xs text-slate-900 font-heading group-hover:text-[#DB0303] transition-colors whitespace-nowrap">
                        {uni.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{uni.city}, {uni.country}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-[#DB0303] font-semibold">{uni.tag}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 Header: Dedicated UK Partner Universities */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
                <GraduationCap className="w-4 h-4" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-heading">
                Dedicated UK Universities • 1-Year Masters, Fast CAS & 2-Year Graduate Route (PSW)
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
              Slow Reverse Moving Scroll • Direct Accredited Portfolios
            </span>
          </div>

          {/* Row 2: UK Universities (Slow Rightward Reverse Scroll) */}
          <div className="relative overflow-hidden py-2 bg-gradient-to-r from-blue-50/20 via-white to-red-50/20 rounded-2xl border border-blue-100 shadow-2xs">
            <div className="animate-marquee-slow-reverse gap-3 px-3">
              {[...ukUniversities, ...ukUniversities].map((uni, idx) => (
                <div
                  key={`uk-${uni.name}-${idx}`}
                  onClick={() => onSelectDestination(uni.countrySlug)}
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white hover:bg-blue-50/70 border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0 group"
                  title={`Click to explore UK admissions & ${uni.badge}`}
                >
                  {/* UK University Official Exact Logo / Crest */}
                  <UniversityLogoImg
                    logoUrl={uni.logoUrl}
                    domain={uni.domain}
                    name={uni.name}
                    crestText={uni.crestText}
                    crestBg={uni.crestBg}
                  />

                  {/* University Details */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{uni.flag}</span>
                      <span className="font-bold text-xs text-slate-900 font-heading group-hover:text-blue-700 transition-colors whitespace-nowrap">
                        {uni.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span>{uni.city}</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-blue-300" />
                      <span className="text-blue-700 font-semibold">{uni.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Trust Strip */}
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-red-100 hover:border-red-300 hover:shadow-md transition-all group"
                >
                  <div className="p-2.5 rounded-xl bg-red-50 text-[#DB0303] group-hover:bg-[#DB0303] group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                      {badge.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
