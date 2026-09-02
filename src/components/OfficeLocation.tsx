import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Navigation,
  Building,
  Sparkles,
  Check,
  Compass,
  Car,
  Layers
} from 'lucide-react';

export const OfficeLocation: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const mapsUrl = BUSINESS_INFO.address.mapsUrl || 'https://maps.app.goo.gl/AZ8Gwq6PdELtw6fR6?g_st=aw';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${BUSINESS_INFO.address.office}, ${BUSINESS_INFO.address.building}, ${BUSINESS_INFO.address.road}, ${BUSINESS_INFO.address.city}, Pakistan`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="office-location-card"
      className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-red-950/5 space-y-8"
    >
      {/* Top Header Bar with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#DB0303] text-xs font-bold font-heading border border-red-200 uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>Official Registered Office</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
            Head Office Peshawar • Deans Trade Centre
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Khyber Pakhtunkhwa's leading destination for foreign university admissions, visa processing, and document verification.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleCopyAddress}
            className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all font-heading flex items-center gap-2 cursor-pointer border border-slate-200"
            title="Copy Full Office Address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Address Copied!</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4 text-slate-500" />
                <span>Copy Address</span>
              </>
            )}
          </button>

          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello ${BUSINESS_INFO.brandName}, please share the exact live office location on WhatsApp.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all font-heading shadow-md shadow-emerald-600/20 hover:scale-[1.02] cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>WhatsApp Location</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all font-heading shadow-md shadow-red-600/20 hover:scale-[1.02] cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/80" />
          </a>
        </div>
      </div>

      {/* Horizontal 4-Column Office Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* 1. Office Location */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-red-300 hover:bg-white transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-100/70 text-[#DB0303] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Physical Address
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {BUSINESS_INFO.address.office}, {BUSINESS_INFO.address.building}, {BUSINESS_INFO.address.road}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.country}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60 text-[11px] font-bold text-[#DB0303]">
            Landmark: {BUSINESS_INFO.address.landmark}
          </div>
        </div>

        {/* 2. Counseling Hours */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-red-300 hover:bg-white transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100/70 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Counseling Hours
              </h4>
              <p className="text-xs font-bold text-slate-800 mt-1">
                {BUSINESS_INFO.hours.weekdays}
              </p>
              <p className="text-xs text-slate-600">
                {BUSINESS_INFO.hours.time}
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60 text-[11px] font-semibold text-slate-400">
            Sunday: Online Appointments Available
          </div>
        </div>

        {/* 3. Direct Phone & WhatsApp */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-300 hover:bg-white transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Direct Call & WhatsApp
              </h4>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {BUSINESS_INFO.phone}
              </p>
              <p className="text-[11px] text-slate-500">
                Dedicated student advisory helpline
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phoneClean}`}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#DB0303] text-[11px] font-bold transition-colors"
            >
              Call Now
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold transition-colors flex items-center gap-1"
            >
              <WhatsAppIcon className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 4. Official Email */}
        <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-red-300 hover:bg-white transition-all space-y-3 flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-100/70 text-[#DB0303] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Official Email
              </h4>
              <p className="text-xs font-bold text-slate-900 mt-1 truncate" title={BUSINESS_INFO.email}>
                {BUSINESS_INFO.email}
              </p>
              <p className="text-[11px] text-slate-500">
                Direct academic documents submission
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/60">
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#DB0303] hover:underline"
            >
              <span>Compose Email</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Width Horizontal Panoramic Google Map Section */}
      <div className="w-full">
        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-slate-900 shadow-xl relative group flex flex-col">
          {/* Map Top Header Overlay Bar */}
          <div className="bg-slate-900 px-5 sm:px-6 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold font-heading text-white flex items-center gap-2">
                  <span>Interactive Map: {BUSINESS_INFO.brandName}</span>
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                    Open for Walk-in Visits
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#DB0303] hover:bg-[#B30000] text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-sm shadow-red-600/30 cursor-pointer font-heading"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            </div>
          </div>

          {/* Wide Horizontal Landscape Google Map Iframe Container */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[460px] bg-slate-950">
            <iframe
              title="RS Higher Education Consultants Office Location - Deans Trade Centre Peshawar"
              src="https://maps.google.com/maps?q=34.004164,71.536852&hl=en&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter contrast-[1.02]"
            />

            {/* Pulsating & Blinking Live Location Pin Overlay */}
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group/pin cursor-pointer focus:outline-hidden"
              title="Click to open exact office location on Google Maps"
            >
              {/* Outer Pulsing Waves */}
              <div className="relative flex items-center justify-center pointer-events-none">
                <span className="absolute w-24 h-24 rounded-full bg-red-500/25 animate-ping" />
                <span className="absolute w-16 h-16 rounded-full bg-red-600/40 animate-pulse" />
                <span className="absolute w-10 h-10 rounded-full bg-red-600/60" />

                {/* Animated Interactive Pin Badge */}
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#DB0303] text-white shadow-2xl shadow-red-950/80 border-2 border-white transform transition-transform group-hover/pin:scale-125 animate-bounce">
                  <MapPin className="w-6 h-6 fill-white" />
                </div>
              </div>

              {/* Pin Tooltip Box with Full Company Name */}
              <div className="mt-2.5 bg-slate-900/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-red-500 shadow-2xl text-center space-y-0.5 max-w-[260px] sm:max-w-xs transition-all group-hover/pin:scale-105 group-hover/pin:bg-black group-hover/pin:border-red-400">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-amber-400 font-heading tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                  <span>Click for Live Directions</span>
                  <ExternalLink className="w-2.5 h-2.5 text-amber-300 ml-0.5" />
                </div>
                <p className="text-xs font-black text-white font-heading truncate">
                  {BUSINESS_INFO.brandName}
                </p>
                <p className="text-[10px] text-slate-300 font-medium">
                  {BUSINESS_INFO.address.office}, {BUSINESS_INFO.address.building}
                </p>
              </div>
            </a>
          </div>

          {/* Map Footer Bar with Landmark Guides & Direct WhatsApp Action */}
          <div className="bg-slate-900/95 px-5 sm:px-6 py-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span className="font-semibold text-slate-200">Upper Ground Floor, Shop/Office # UG-389</span>
              </div>
              <span className="hidden sm:inline text-slate-600">•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Prime Commercial Hub in Peshawar Cantt</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(`Hello ${BUSINESS_INFO.brandName}, please share the exact live office location on WhatsApp.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors font-heading"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Send Location to my WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

