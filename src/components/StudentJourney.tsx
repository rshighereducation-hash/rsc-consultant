import React, { useState } from 'react';
import {
  Compass,
  Users,
  GraduationCap,
  FileCheck2,
  MailCheck,
  ShieldAlert,
  Award,
  PlaneTakeoff,
  TrendingUp,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface StudentJourneyProps {
  onOpenConsultation: () => void;
}

export const StudentJourney: React.FC<StudentJourneyProps> = ({ onOpenConsultation }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      label: 'Initial Inquiry & Exploration',
      icon: Compass,
      desc: 'Explore 16 global study destinations, discuss your ambitions, and book a free counseling session at RS Deans Trade Centre Peshawar.'
    },
    {
      num: '02',
      title: 'Counsel',
      label: 'Personalized Profile Audit',
      icon: Users,
      desc: 'Our senior advisors evaluate your Pakistani academic transcripts (FSc/A-Levels/Bachelor), budget parameters, and English test readiness.'
    },
    {
      num: '03',
      title: 'Choose',
      label: 'University & Course Selection',
      icon: GraduationCap,
      desc: 'Shortlist Dream, Target, and Safe accredited universities across the UK, Europe, USA, Canada, Australia, or Asia.'
    },
    {
      num: '04',
      title: 'Apply',
      label: 'Application & SOP Submission',
      icon: FileCheck2,
      desc: 'We draft your Statement of Purpose (SOP), organize recommendation letters, and file applications through direct university portals.'
    },
    {
      num: '05',
      title: 'Receive Offer',
      label: 'Offer Letter & Fee Deposit',
      icon: MailCheck,
      desc: 'Receive your conditional/unconditional acceptance letter, apply for merit fee waivers, and secure your official study place.'
    },
    {
      num: '06',
      title: 'Prepare Visa',
      label: 'Financial & Embassy File Prep',
      icon: ShieldAlert,
      desc: 'Guidance on 28-day bank holding, German blocked accounts, HEC/MOFA attestations, medical exams, and TB screenings.'
    },
    {
      num: '07',
      title: 'Receive Visa',
      label: 'Mock Interviews & Visa Grant',
      icon: Award,
      desc: 'Pass your consular or university credibility interview with rigorous 1-on-1 RS mock coaching, followed by visa stamping.'
    },
    {
      num: '08',
      title: 'Fly',
      label: 'Pre-Departure Briefing & Travel',
      icon: PlaneTakeoff,
      desc: 'Port of entry preparation, foreign currency advice, baggage allowances, and connecting with students heading to the same city.'
    },
    {
      num: '09',
      title: 'Start Your Future',
      label: 'Campus Life & Career Progression',
      icon: TrendingUp,
      desc: 'Arrive at your campus, complete city registration (Anmeldung/Ikamet/OFII), secure part-time work, and begin your global future.'
    }
  ];

  return (
    <section id="journey-section" className="py-20 bg-gradient-to-b from-slate-50 via-red-50/20 to-white text-slate-900 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200 text-xs font-bold text-[#DB0303] uppercase tracking-wider font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The RS 9-Step Global Pathway</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-slate-900">
            Your Step-by-Step Journey to Studying Abroad
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From your first walk-in consultation in Peshawar to landing on campus abroad, here is how we guide you with transparency and precision.
          </p>
        </div>

        {/* Interactive Step Selector (Desktop / Tablet) */}
        <div className="hidden lg:grid grid-cols-9 gap-2.5 mb-10">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl text-center transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#DB0303] border-[#DB0303] text-white shadow-xl shadow-red-600/30 scale-105'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-red-300 hover:text-[#DB0303] shadow-xs'
                }`}
              >
                <span className={`text-[10px] font-black tracking-widest ${isCurrent ? 'text-red-100' : 'text-[#DB0303]'}`}>
                  {st.num}
                </span>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-extrabold font-heading truncate w-full">
                  {st.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Feature Box */}
        <div className="bg-white border border-red-100 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-red-950/5 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-extrabold bg-[#DB0303] text-white px-3.5 py-1 rounded-full font-heading shadow-xs">
                  STAGE {steps[activeStep].num} OF 09
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-heading text-slate-900">
                  {steps[activeStep].title} — {steps[activeStep].label}
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {steps[activeStep].desc}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 bg-[#DB0303] hover:bg-[#B30000] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all font-heading shadow-md shadow-red-600/25"
                >
                  Start This Step with RS Counselors
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="px-5 py-3 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#DB0303] text-xs sm:text-sm font-bold rounded-2xl border border-slate-200 flex items-center gap-2 font-heading transition-colors"
                >
                  <span>Next Milestone</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex justify-center">
              <div className="p-8 rounded-3xl bg-red-50/60 border border-red-100 text-center space-y-3 w-full max-w-xs shadow-xs">
                <div className="inline-flex p-4 rounded-2xl bg-white text-[#DB0303] shadow-md shadow-red-600/10 border border-red-100">
                  {React.createElement(steps[activeStep].icon, { className: 'w-8 h-8' })}
                </div>
                <h4 className="text-base font-extrabold text-slate-900 font-heading">
                  Milestone {steps[activeStep].num}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Guaranteed embassy compliance & zero guesswork at every phase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel of Steps */}
        <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  activeStep === idx
                    ? 'bg-red-50 border-[#DB0303] text-slate-900 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#DB0303]">{st.num}</span>
                  <Icon className="w-4 h-4 text-[#DB0303]" />
                  <h4 className="text-sm font-bold text-slate-900 font-heading">{st.title}</h4>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{st.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
