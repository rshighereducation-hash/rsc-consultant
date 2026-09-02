import React from 'react';
import { RSLogo } from './RSLogo';
import { useBrand } from '../context/BrandContext';
import { BUSINESS_INFO } from '../data/businessInfo';
import { ALL_DESTINATIONS } from '../data/destinationsData';
import { CountryFlag } from './CountryFlag';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Globe2,
  ShieldCheck,
  Heart,
  Upload
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, destinationSlug?: string) => void;
  onOpenConsultation: () => void;
  onOpenLegal: (type: 'privacy' | 'terms' | 'disclaimer') => void;
  onOpenGoogleSync?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenConsultation,
  onOpenLegal,
  onOpenGoogleSync,
}) => {
  const { openLogoModal } = useBrand();
  return (
    <footer id="site-footer" className="bg-slate-50 text-slate-700 border-t border-slate-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Office Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('home')}
                className="text-left focus:outline-none cursor-pointer"
              >
                <RSLogo theme="light" size="lg" variant="horizontal" showUploadTrigger={false} />
              </button>

              <button
                type="button"
                onClick={openLogoModal}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#DB0303] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors cursor-pointer"
                title="Replace Brand Logo from PC"
              >
                <Upload className="w-3 h-3" />
                <span>Replace Logo</span>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              <strong>RS Higher Education Consultants</strong> provides ethical, student-centered admissions and visa consultancy for Pakistani students across 16 leading study destinations worldwide.
            </p>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DB0303] shrink-0 mt-0.5" />
                <a
                  href={BUSINESS_INFO.address.mapsUrl || 'https://maps.app.goo.gl/AZ8Gwq6PdELtw6fR6?g_st=aw'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#DB0303] transition-colors"
                >
                  {BUSINESS_INFO.address.office}, {BUSINESS_INFO.address.building}, {BUSINESS_INFO.address.road}, {BUSINESS_INFO.address.city}, Pakistan
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#DB0303] shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="hover:text-[#DB0303] font-bold text-slate-800 transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#DB0303] shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-[#DB0303] font-bold text-slate-800 transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mon – Sat: 10:00 AM – 6:00 PM (PKT)</span>
              </div>
            </div>

            {/* Social handles with authentic original brand colors */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {/* Facebook */}
              <a
                href={BUSINESS_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RS Consultants Facebook"
                title="Follow RS Higher Education on Facebook"
                className="w-9 h-9 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-md shadow-[#1877F2]/25 hover:scale-110 active:scale-95"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>

              {/* Instagram */}
              <a
                href={BUSINESS_INFO.social.instagram || 'https://www.instagram.com/rshighereducation/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RS Consultants Instagram (@rshighereducation)"
                title="Follow @rshighereducation on Instagram"
                className="w-9 h-9 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-md shadow-[#dc2743]/25 hover:scale-110 active:scale-95"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>

              {/* TikTok */}
              <a
                href={BUSINESS_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RS Consultants TikTok (@rshec.pk)"
                title="Watch RS Higher Education on TikTok"
                className="w-9 h-9 bg-[#010101] hover:bg-black text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-md shadow-black/30 hover:scale-110 active:scale-95 border border-slate-700/60"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={BUSINESS_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RS Consultants LinkedIn"
                title="Connect with RS Higher Education on LinkedIn"
                className="w-9 h-9 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-md shadow-[#0A66C2]/25 hover:scale-110 active:scale-95"
              >
                <Linkedin className="w-4 h-4 text-white" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="RS Consultants WhatsApp Helpline"
                title="Chat with RS Higher Education on WhatsApp"
                className="w-9 h-9 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-md shadow-[#25D366]/25 hover:scale-110 active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: 16 Study Destinations (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-black text-[#DB0303] uppercase tracking-wider font-heading">
              16 Global Study Destinations
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
              {ALL_DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => onNavigate('destination-detail', d.slug)}
                  className="text-left hover:text-[#DB0303] hover:underline flex items-center gap-2 transition-colors truncate font-medium cursor-pointer group"
                >
                  <CountryFlag
                    countryCode={d.flagCode || d.slug}
                    countryName={d.countryName}
                    fallbackEmoji={d.flagEmoji}
                    size="xs"
                    className="shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <span className="truncate">{d.countryName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links & Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-[#DB0303] uppercase tracking-wider font-heading">
              Quick Navigation
            </h4>
            <div className="space-y-2 text-xs text-slate-600 flex flex-col font-medium">
              <button
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                About RS Consultants
              </button>
              <button
                onClick={() => {
                  onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('founder-ceo-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer flex items-center gap-1 text-[#DB0303] font-semibold"
              >
                <span>Founder & CEO Message</span>
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                12 Core Services
              </button>
              <button
                onClick={() => onNavigate('universities')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                160+ University Portfolios
              </button>
              <button
                onClick={() => onNavigate('finder')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Smart Course Finder
              </button>
              <button
                onClick={() => onNavigate('success')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Student Success Stories
              </button>
              <button
                onClick={() => onNavigate('resources')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Visa & Scholarship Guides
              </button>
              <button
                onClick={() => onNavigate('faq')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Frequently Asked Questions
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#DB0303] hover:underline cursor-pointer"
              >
                Contact Peshawar Office
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenConsultation}
                className="w-full py-3 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs font-bold rounded-2xl font-heading shadow-md shadow-red-600/20 transition-all text-center cursor-pointer"
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer & Disclosures */}
        <div className="pt-8 border-t border-slate-200 text-xs text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-700">Official Regulatory Disclaimer:</strong> RS Higher Education Consultants is an educational advisory and student placement consultancy headquartered in Peshawar, Pakistan. RS Higher Education Consultants is not a government agency, embassy, or high commission. Admissions decisions rest exclusively with individual academic institutions, and visa issuance is the sole legal sovereign prerogative of the respective government embassies and immigration authorities. RS provides genuine profile auditing, document compilation assistance, and verified application facilitation.
          </p>
        </div>

        {/* Bottom Micro Bar */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} RS Higher Education Consultants. All rights reserved. Peshawar, Pakistan.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#DB0303] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-[#DB0303] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="hover:text-[#DB0303] transition-colors cursor-pointer"
            >
              Consultancy Disclaimer
            </button>
            {onOpenGoogleSync && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenGoogleSync}
                  className="hover:text-[#DB0303] text-slate-400 hover:underline transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="Consultant Private Portal (Google Sheets & Inquiries Database)"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Leads Hub</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
