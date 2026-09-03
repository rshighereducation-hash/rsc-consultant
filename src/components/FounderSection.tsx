import React from "react";
import { BUSINESS_INFO } from "../data/businessInfo";
import { useBrand } from "../context/BrandContext";
import defaultCeoPhoto from "../assets/images/ceo.png";
import { RSOfficialEmblem, RSBrandShowcaseCard } from "./RSLogo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  Quote,
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building2,
  HeartHandshake,
  Upload,
  Camera,
} from "lucide-react";

interface FounderSectionProps {
  onOpenConsultation: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({
  onOpenConsultation,
}) => {
  const founder = BUSINESS_INFO.founder;
  const { customCeoPhoto, openCeoPhotoModal, customLogo, openLogoModal } =
    useBrand();

  const activePhoto = customCeoPhoto || defaultCeoPhoto;

  const getCeoWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Mr. Rahmat Shah (Founder & CEO, RS Higher Education Consultants). I am seeking expert guidance for international student admissions and visa processing.`,
    );
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section
      id="founder-ceo-section"
      className="py-20 lg:py-28 bg-gradient-to-b from-white via-red-50/25 to-white relative overflow-hidden border-y border-red-100/70">
      {/* Subtle background glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Heading Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Executive Leadership & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Founder & CEO Message
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Guiding Pakistani students with integrity, personal mentorship, and
            global educational standards.
          </p>
        </div>

        {/* Main CEO Profile & Message Card */}
        <div className="bg-white rounded-3xl border border-red-100 shadow-2xl shadow-red-950/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Left Column: Founder Photo & Bio Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 flex flex-col justify-between relative">
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#DB0303]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Photo Frame */}
                <div className="relative mx-auto max-w-sm rounded-2xl overflow-hidden border-2 border-amber-400/30 shadow-2xl group">
                  <img
                    src={activePhoto}
                    alt={`${founder.name} - ${founder.title}, RS Higher Education Consultants`}
                    className="w-full h-auto object-cover object-top aspect-[3/4] transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Photo Gradient Overlay & Lower Title */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-5 text-white">
                    <p className="text-amber-400 font-serif italic text-sm">
                      Founder & CEO
                    </p>
                    <h3 className="text-2xl font-black font-heading text-white tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium pt-0.5">
                      {founder.company}
                    </p>
                  </div>
                </div>

                {/* Key Leadership Badges */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">
                        100% Ethical & Genuine Guidance
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Strict compliance with foreign embassy and immigration
                        codes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200">
                    <GraduationCap className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">
                        16 Global Study Destinations
                      </p>
                      <p className="text-[11px] text-slate-400">
                        UK, USA, Canada, Australia, Europe & Asia
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Reach Out Micro Card */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-xs text-slate-300 relative z-10">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    {BUSINESS_INFO.address.office}, Deans Trade Centre, Peshawar
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-slate-200 hover:text-white transition-colors font-medium">
                    {founder.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`tel:${BUSINESS_INFO.phoneClean}`}
                    className="text-slate-200 hover:text-white transition-colors font-medium">
                    {founder.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Founder's Message & Core Commitments (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* High-End Executive Quote & Brand Trust Showcase in Poppins */}
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-red-50/95 via-amber-50/50 to-white border-2 border-red-200/90 shadow-xl shadow-red-950/5 overflow-hidden group font-poppins">
                  {/* Decorative Watermark & Ambient Lights */}
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-[#DB0303]/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
                  <Quote className="w-24 h-24 text-[#DB0303]/10 absolute -bottom-4 right-4 pointer-events-none rotate-12 transition-transform duration-500 group-hover:scale-110" />

                  <div className="relative z-10 space-y-5">
                    {/* Header: Official Pillar Title + Priority Pill */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#DB0303] block font-poppins">
                          RS Higher Education Consultants
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 block font-poppins">
                          Founder &amp; CEO Vision
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-[#DB0303] text-[11px] font-extrabold uppercase tracking-wider font-poppins shadow-xs border border-red-200/80 shrink-0">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Student-First Priority</span>
                      </div>
                    </div>

                    {/* Main Quote Content with Poppins */}
                    <blockquote className="relative pl-3 sm:pl-4 space-y-2 border-l-4 border-[#DB0303]">
                      <p className="text-base sm:text-lg md:text-xl font-bold text-slate-950 leading-relaxed font-poppins">
                        “True educational consultancy is not about selling
                        visas—it is about{" "}
                        <span className="text-[#DB0303] font-extrabold">
                          unlocking human potential
                        </span>{" "}
                        with total honesty, rigorous preparation, and ethical
                        guidance.”
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed font-poppins">
                        RS Higher Education Consultants is the name of{" "}
                        <strong className="text-[#DB0303] font-bold">
                          trust, integrity, and student satisfaction
                        </strong>{" "}
                        in international education across Peshawar and Khyber
                        Pakhtunkhwa.
                      </p>
                    </blockquote>

                    {/* Author Attribution Footer */}
                    <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-red-100/90 font-poppins">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/90 shadow-xs shrink-0 ring-2 ring-red-100">
                          <img
                            src={activePhoto}
                            alt={founder.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-900 font-poppins leading-tight flex items-center gap-1.5">
                            <span>{founder.name}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          </p>
                          <p className="text-[10px] text-slate-600 font-medium font-poppins leading-tight">
                            {founder.shortTitle}, {BUSINESS_INFO.brandName}
                          </p>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs font-poppins">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>100% Verified Counsel</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outstanding Priority Banner in Poppins */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-600 via-[#DB0303] to-amber-600 text-white shadow-lg shadow-red-950/15 flex items-center gap-4 border border-red-400/30 font-poppins">
                  <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 shadow-inner">
                    <HeartHandshake className="w-6 h-6 text-amber-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[10px] uppercase font-extrabold tracking-widest text-amber-200 font-poppins">
                        Founder's Sacred Pledge
                      </p>
                      <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full font-poppins hidden sm:inline">
                        100% Student-First
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-white font-poppins leading-snug mt-0.5">
                      “Students’ satisfaction is my first priority — RS is the
                      name of trust & excellence.”
                    </p>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                      A Personal Note from Rahmat Shah
                    </h3>
                    <p className="text-xs font-semibold text-[#DB0303]">
                      Founder & Chief Executive Officer, RS Higher Education
                      Consultants
                    </p>
                  </div>

                  <p>
                    Welcome to <strong>RS Higher Education Consultants</strong>.
                    When I founded this organization in Peshawar, my objective
                    was unequivocal: to build an educational consultancy that
                    Pakistani students and their families could trust with
                    absolute confidence.
                  </p>

                  <p>
                    For too long, ambitious students across Khyber Pakhtunkhwa
                    and Pakistan have navigated vague advice, exaggerated
                    claims, and unexpected fees. At RS Higher Education
                    Consultants, we have replaced that uncertainty with clinical
                    profile evaluations, honest eligibility assessments, and
                    transparent academic roadmaps across{" "}
                    <strong>16 premier global study destinations</strong>.
                  </p>

                  <p>
                    Pursuing higher education abroad is a monumental decision.
                    It challenges students, builds character, expands
                    intellectual horizons, and launches rewarding global
                    careers. My team and I are personally committed to mentoring
                    every candidate with direct oversight—from course
                    shortlisting and SOP refinement to embassy interview
                    coaching and pre-departure readiness.
                  </p>

                  <p className="font-medium text-slate-900">
                    Your future is a sacred trust. We look forward to welcoming
                    you to our Peshawar office and partnering with you on your
                    journey to academic success.
                  </p>
                </div>

                {/* Founder's Signature Block */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-xl font-bold font-serif text-slate-900 tracking-wide">
                      Rahmat Shah
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      Founder & CEO, RS Higher Education Consultants
                    </p>
                    <p className="text-[11px] text-[#DB0303] font-semibold">
                      Peshawar, Khyber Pakhtunkhwa, Pakistan
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                    <HeartHandshake className="w-4 h-4 text-[#DB0303]" />
                    <span>Student-First Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3.5">
                <button
                  onClick={onOpenConsultation}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-md shadow-red-600/20 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer">
                  <span>Book In-Person Meeting</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getCeoWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 shadow-md hover:scale-105 font-heading">
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>

                {/* <button
                  type="button"
                  onClick={openCeoPhotoModal}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center gap-2 font-heading cursor-pointer">
                  <Upload className="w-4 h-4 text-[#DB0303]" />
                  <span>Upload Photo from PC</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Outstanding Brand Showcase Card with Official Trademark Logo & Trust Statement */}
        <div className="pt-4">
          <RSBrandShowcaseCard onOpenConsultation={onOpenConsultation} />
        </div>

        {/* 4 Core Pillars of Rahmat Shah's Leadership */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {founder.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5 transition-all space-y-2.5 group hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#DB0303] font-heading bg-red-50 px-2.5 py-1 rounded-lg border border-red-100">
                  0{idx + 1}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading group-hover:text-[#DB0303] transition-colors">
                {pillar.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
