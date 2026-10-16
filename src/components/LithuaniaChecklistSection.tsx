import React, { useState } from "react";
import { generateLithuaniaChecklistPDF } from "../utils/lithuaniaPdfGenerator";
import { BUSINESS_INFO } from "../data/businessInfo";
import { useBrand } from "../context/BrandContext";
import {
  Download,
  FileCheck2,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Clock,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export const LithuaniaChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const { customLithuaniaChecklistPdf, customLithuaniaChecklistName } = useBrand();

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      if (customLithuaniaChecklistPdf) {
        const a = document.createElement("a");
        a.href = customLithuaniaChecklistPdf;
        a.download =
          customLithuaniaChecklistName ||
          "Lithuania_Checklist_RS_Higher_Education.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        generateLithuaniaChecklistPDF();
      }
    } catch (e) {
      console.error("Error generating Lithuania Checklist PDF:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const partnerUniversities = [
    "Vilnius University (VU)",
    "Kaunas University of Technology (KTU)",
    "VILNIUS TECH (Vilnius Gediminas Tech)",
    "Vytautas Magnus University (VMU)",
    "Lithuanian University of Health Sciences (LSMU)",
    "Mykolas Romeris University (MRU)",
    "Klaipėda University (KU)",
    "LCC International University",
  ];

  const totalAppItems = 7;
  const totalVisaItems = 8;
  const totalItems = totalAppItems + totalVisaItems;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div id="lithuania-checklist-document" className="space-y-8">
      {/* Highlighted Banner & Direct Download Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#990000] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-red-950/20 border-2 border-red-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-400/40 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Student Document & MIGRIS TRP Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Study in Lithuania: SKVC & MIGRIS TRP Visa Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete official document roadmap for Pakistani applicants applying to
              Lithuanian Universities, SKVC qualification equivalence, Electronic Mediation Letters
              (Tarpininkavimo raštas), and MIGRIS Temporary Residence Permit (TRP) / National D-Visa filing.
            </p>

            {/* Quick Readiness Progress */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-48 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-400 to-[#DB0303] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-bold text-amber-300">
                {completedCount} of {totalItems} items ready ({progressPercent}%)
              </span>
            </div>
          </div>

          {/* Prominent Highlighting Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              id="lithuania-download-pdf-btn"
              className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-2xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-red-400/30"
              title={
                customLithuaniaChecklistPdf
                  ? `Download custom: ${customLithuaniaChecklistName}`
                  : "Download Official Lithuania PDF Checklist"
              }>
              <Download
                className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
              />
              <span>
                {isDownloading
                  ? "Generating PDF..."
                  : "Download Official PDF Checklist"}
              </span>
              {customLithuaniaChecklistPdf && (
                <span className="ml-1 px-1.5 py-0.5 text-[9px] bg-slate-950 text-amber-300 rounded font-bold uppercase tracking-wider">
                  Custom
                </span>
              )}
            </button>

            <button
              onClick={handlePrint}
              id="lithuania-print-checklist-btn"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Printer className="w-4 h-4" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Checklist Sheet */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl space-y-8">
        {/* Document Header */}
        <div className="border-b-2 border-[#DB0303] pb-6 space-y-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DB0303] to-[#8F0000] flex items-center justify-center text-white font-black text-2xl font-heading shadow-md">
                RS
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl font-black font-heading text-slate-900 tracking-tight">
                  STUDY IN LITHUANIA
                </h4>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  University Application, SKVC Equivalence & MIGRIS TRP Visa Checklist
                </p>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="text-xs text-slate-600 space-y-1 md:text-right">
              <p className="flex items-center md:justify-end gap-1.5 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>{BUSINESS_INFO.phone}</span>
                <span className="text-slate-300">|</span>
                <Mail className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>{BUSINESS_INFO.email}</span>
              </p>
              <p className="flex items-center md:justify-end gap-1.5 text-[11px] text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-[#DB0303]" />
                <span>
                  {BUSINESS_INFO.address.office}, Deans Trade Centre, Peshawar
                </span>
              </p>
            </div>
          </div>

          {/* Mandatory Badge */}
          <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-center">
            <p className="text-xs sm:text-sm font-black text-[#DB0303] uppercase tracking-wider font-heading">
              ★ OFFICIAL 2026 LITHUANIA STUDENT TRP & SCHENGEN VISA CHECKLIST ★
            </p>
          </div>
        </div>

        {/* 2-Column Main Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: University & SKVC Equivalence */}
          <div className="space-y-6">
            <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UNIVERSITY & SKVC EQUIVALENCE CHECKLIST
              </h4>
            </div>

            {/* 1. Admission Documents Requirements */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading flex items-center gap-1.5">
                <span>1. Academic & SKVC Recognition Documents</span>
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_passport"]}
                    onChange={() => toggleCheck("lt_app_passport")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Valid Passport
                    </p>
                    <p className="text-xs text-slate-500">
                      – Color scan of bio-data pages (minimum 18 months validity)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_transcripts"]}
                    onChange={() => toggleCheck("lt_app_transcripts")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Educational Transcripts & Certificates
                    </p>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      <li>Matric & Inter (FSc/ICS) (IBCC & MOFA Attested)</li>
                      <li>Bachelor Degree & Transcripts (HEC & MOFA Attested)</li>
                    </ul>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_skvc"]}
                    onChange={() => toggleCheck("lt_app_skvc")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      SKVC Recognition Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Official academic qualification equivalence issued by SKVC Lithuania
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_offer"]}
                    onChange={() => toggleCheck("lt_app_offer")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      DreamApply Application & Acceptance
                    </p>
                    <p className="text-xs text-slate-500">
                      – Formal university study agreement signed by student and university
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_motivation"]}
                    onChange={() => toggleCheck("lt_app_motivation")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Motivation Letter & Europass CV
                    </p>
                    <p className="text-xs text-slate-500">
                      – Clear career plans, reason for choosing Lithuania & course choice
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_english"]}
                    onChange={() => toggleCheck("lt_app_english")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      English Proficiency / Video Interview
                    </p>
                    <p className="text-xs text-slate-500">
                      – IELTS (5.5–6.0) / Duolingo (95+) / PTE or University Online Interview
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_app_photos"]}
                    onChange={() => toggleCheck("lt_app_photos")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Passport Size Photographs
                    </p>
                    <p className="text-xs text-slate-500">
                      – 4 recent biometric photographs on crisp white background
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Admission Progression */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                2. Admission & MIGRIS Progression
              </h5>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    SKVC Equivalence & DreamApply Offer
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    SKVC Assessment → Online Motivation Interview → Official Offer Letter
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Tuition Payment & Study Contract
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    1st Year Tuition Transfer → Signed Study Agreement Submission
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Electronic Mediation Letter (Tarpininkavimo)
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    University generates electronic Mediation Letter directly in MIGRIS
                  </p>
                </div>
              </div>
            </div>

            {/* Note - Baltic Tech Hub */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>NOTE — BALTIC TECH CAPITAL & SCHENGEN ADVANTAGES:</span>
              </p>
              <p className="leading-relaxed">
                Lithuania is ranked #1 in EU for fintech and laser optics. Students enjoy visa-free mobility across 29 Schengen countries and a 12-Month Job Search Residence Permit after graduation.
              </p>
            </div>
          </div>

          {/* Column 2: MIGRIS TRP Requirements */}
          <div className="space-y-6">
            <div className="p-3 bg-[#DB0303] text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                MIGRIS TRP & NATIONAL D-VISA REQUIREMENTS
              </h4>
            </div>

            {/* 1. MIGRIS Documents */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                1. MIGRIS TRP / National D-Visa Documents
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_mediation"]}
                    onChange={() => toggleCheck("lt_visa_mediation")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      University Electronic Mediation Letter Number
                    </p>
                    <p className="text-xs text-slate-500">
                      – Official Tarpininkavimo raštas code registered in MIGRIS system
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_bank"]}
                    onChange={() => toggleCheck("lt_visa_bank")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Bank Certificate & Statement (€4,800 + €800)
                    </p>
                    <p className="text-xs text-[#DB0303] font-semibold">
                      – €400/mo living (€4,800/yr) + €800 return ticket in student/sponsor account
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_police"]}
                    onChange={() => toggleCheck("lt_visa_police")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Apostilled / MOFA Police Clearance Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Clean criminal record certificate issued within 6 months of filing
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_tuition"]}
                    onChange={() => toggleCheck("lt_visa_tuition")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Proof of Paid Tuition Fee & Study Agreement
                    </p>
                    <p className="text-xs text-slate-500">
                      – University official confirmation of received annual tuition fee
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_insurance"]}
                    onChange={() => toggleCheck("lt_visa_insurance")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Schengen Health Insurance Policy (€30,000+)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Valid for entire duration of stay covering all EU Schengen states
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_accommodation"]}
                    onChange={() => toggleCheck("lt_visa_accommodation")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Dormitory Contract / Proof of Accommodation
                    </p>
                    <p className="text-xs text-slate-500">
                      – Official campus dormitory lease or private residential contract
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["lt_visa_vfs"]}
                    onChange={() => toggleCheck("lt_visa_vfs")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      VFS Biometric Submission & State Fee (€160)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Biometric data capture at authorized VFS Global center in Pakistan
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Streamlined MIGRIS Rule */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-[#DB0303]">
                <ShieldCheck className="w-4 h-4 text-[#DB0303]" />
                <span>STREAMLINED DIGITAL MIGRIS SYSTEM:</span>
              </p>
              <p className="leading-relaxed text-slate-700">
                Lithuania processes study permits electronically via MIGRIS. Decisions are typically finalized in 4 to 8 weeks, granting direct Temporary Residence Permit (TRP) cards for study.
              </p>
            </div>

            {/* Intakes & Work Rights */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <p className="font-bold uppercase tracking-wider font-heading text-slate-900">
                INTAKES & WORK RIGHTS:
              </p>
              <p className="text-slate-600">
                Major: September (Autumn) | Selected: February (Spring)
              </p>
              <p className="font-bold text-[#DB0303]">
                Work: 20 hrs/wk (Bachelors) | Up to 40 hrs/wk (Masters) + 12-mo PSW
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Table */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl text-center shadow-md">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              RS HIGHER EDUCATION CONSULTANTS — TOTAL COST BREAKDOWN FOR LITHUANIA
            </h4>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[11px] font-heading">
                <tr>
                  <th className="p-3.5 border-b border-slate-200">Item</th>
                  <th className="p-3.5 border-b border-slate-200">Amount</th>
                  <th className="p-3.5 border-b border-slate-200">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Lithuanian TRP State Fee (MIGRIS)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€160 (Standard)</td>
                  <td className="p-3.5 text-slate-600">Official state application fee for Temporary Residence Permit</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Annual University Tuition Fee</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€2,200 - €5,000 / year</td>
                  <td className="p-3.5 text-slate-600">Affordable European accredited tuition; Medicine: €10k-€13k/yr</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">SKVC Document Assessment Fee</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€0 - €40</td>
                  <td className="p-3.5 text-slate-600">Equivalence evaluation by Centre for Quality Assessment</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Schengen Health Insurance (1 Year)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€100 - €180</td>
                  <td className="p-3.5 text-slate-600">Full medical coverage valid across Lithuania and Schengen area</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Required Living Funds in Bank</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€4,800 + €800 Return Ticket</td>
                  <td className="p-3.5 text-slate-600">€400/month for 12 months held in student/sponsor bank account</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Top Lithuanian Universities */}
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#DB0303]" />
            <span>Featured Lithuanian Universities</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {partnerUniversities.map((uni, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 hover:border-red-300 hover:shadow-xs transition-all">
                <Building2 className="w-4 h-4 text-[#DB0303] mx-auto" />
                <p className="text-[11px] font-bold text-slate-800 line-clamp-2">
                  {uni}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
