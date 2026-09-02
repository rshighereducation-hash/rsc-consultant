import React from 'react';
import { RSLogo } from './RSLogo';
import { BUSINESS_INFO } from '../data/businessInfo';
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  CheckCircle2,
  Users,
  Compass,
  MapPin,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="about-us-section" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Foundation & Identity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading tracking-tight">
            About RS Higher Education Consultants
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Empowering Pakistani students with ethical, transparent, and world-class educational pathways from our Peshawar headquarters.
          </p>
        </div>

        {/* Narrative & Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h3 className="text-2xl font-black text-slate-900 font-heading">
              A Trusted Bridge Between Pakistan and Global Academia
            </h3>
            <p>
              Headquartered at <strong>Office No. UG-389, Deans Trade Centre, Peshawar</strong>, RS Higher Education Consultants was established with a singular mission: to eliminate the ambiguity, exaggerated promises, and hidden fees that often plague the study abroad landscape in Pakistan.
            </p>
            <p>
              We believe that international education is one of the most transformative investments a student and their family can make. Our experienced advisors evaluate every applicant’s unique academic history, financial profile, and long-term career aspirations with clinical honesty.
            </p>
            <p>
              Over the years, RS has expanded its portfolio to cover <strong>16 leading study destinations</strong> across the United Kingdom, Europe, North America, Australia, and Asia, representing more than <strong>160 accredited universities</strong> worldwide.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0" />
                <span>100% Transparent Advice</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0" />
                <span>Zero Fake Guarantees</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0" />
                <span>Official Partner Portals</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-[#DB0303] shrink-0" />
                <span>Lifelong Alumni Network</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-white to-red-50/50 text-slate-900 p-8 rounded-3xl shadow-2xl shadow-red-950/5 border border-red-100 space-y-6">
              <div className="space-y-2">
                <RSLogo theme="light" size="lg" variant="horizontal" />
                <p className="text-xs text-slate-600 pt-2 leading-relaxed font-medium">
                  "Your Gateway to Global Education" — guiding ambitious minds from Peshawar, Khyber Pakhtunkhwa, and across Pakistan toward global excellence.
                </p>
              </div>

              <div className="pt-4 border-t border-red-100 space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#DB0303] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address.office}, {BUSINESS_INFO.address.building}, Peshawar, KPK</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-[#DB0303] shrink-0" />
                  <span>Verified Educational Consultancy Firm</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-slate-900">
                  <Award className="w-4 h-4 text-[#DB0303] shrink-0" />
                  <span>16 Global Destination Portfolios</span>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-4 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white text-xs sm:text-sm font-bold rounded-2xl font-heading shadow-md shadow-red-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Book In-Person Meeting at Deans Trade Centre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-red-200 shadow-sm space-y-3">
            <div className="p-3.5 rounded-2xl bg-red-50 text-[#DB0303] w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900 font-heading">
              Our Mission
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To provide personalized, rigorous, and completely ethical counseling that equips students with the exact skills, documentation, and institutional options needed to secure life-changing academic admissions and visas across top global destinations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 hover:border-red-200 shadow-sm space-y-3">
            <div className="p-3.5 rounded-2xl bg-red-50 text-[#DB0303] w-fit">
              <Eye className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black text-slate-900 font-heading">
              Our Vision
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be recognized as Pakistan’s most reliable, transparent, and student-focused international education consultancy, fostering a new generation of globally trained Pakistani professionals who excel internationally and give back to their homeland.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
