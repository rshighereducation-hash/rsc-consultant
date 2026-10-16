import React, { useState } from "react";
import { generateItalyChecklistPDF } from "../utils/italyPdfGenerator";
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

export const ItalyChecklistSection: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [isDownloading, setIsDownloading] = useState(false);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      generateItalyChecklistPDF();
    } catch (e) {
      console.error("Error generating Italy Checklist PDF:", e);
    } finally {
      setTimeout(() => setIsDownloading(false), 800);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const partnerUniversities = [
    "Politecnico di Milano",
    "University of Bologna",
    "Sapienza University of Rome",
    "University of Padua",
    "Politecnico di Torino",
    "University of Milan",
    "University of Pisa",
    "University of Florence",
    "University of Genoa",
    "University of Messina",
  ];

  const totalAppItems = 7;
  const totalVisaItems = 8;
  const totalItems = totalAppItems + totalVisaItems;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  return (
    <div id="italy-checklist-document" className="space-y-8">
      {/* Highlighted Banner & Direct Download Callout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-[#990000] text-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-red-950/20 border-2 border-red-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#DB0303]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/30 border border-red-400/40 text-xs font-bold text-amber-300 uppercase tracking-wider font-heading">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official 2026 Student Document & Embassy Visa Guide</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight">
              Study in Italy: Universitaly & Embassy Visa Checklist
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Complete official document roadmap for Pakistani students applying to
              Italian Public Universities, Universitaly portal pre-enrollment, DSU Regional
              Scholarships, and Italian Embassy / Consulate National D-Visa filing.
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
              id="italy-download-pdf-btn"
              className="px-5 py-3.5 bg-gradient-to-r from-[#DB0303] to-[#B30000] hover:from-[#B30000] hover:to-[#8F0000] text-white font-black text-xs sm:text-sm rounded-2xl font-heading shadow-xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-red-400/30"
              title="Download Official Italy PDF Checklist">
              <Download
                className={`w-5 h-5 ${isDownloading ? "animate-bounce" : ""}`}
              />
              <span>
                {isDownloading
                  ? "Generating PDF..."
                  : "Download Official PDF Checklist"}
              </span>
            </button>

            <button
              onClick={handlePrint}
              id="italy-print-checklist-btn"
              className="px-5 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-2xl font-heading border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer">
              <Printer className="w-4 h-4" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Visual Checklist Replica Sheet */}
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
                  STUDY IN ITALY
                </h4>
                <p className="text-xs sm:text-sm font-bold text-[#DB0303] font-heading">
                  University Application, Universitaly & Embassy Visa Checklist
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
              ★ OFFICIAL 2026 ITALY STUDENT VISA & UNIVERSITALY CHECKLIST ★
            </p>
          </div>
        </div>

        {/* 2-Column Main Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: University Application & Pre-Enrollment */}
          <div className="space-y-6">
            <div className="p-3 bg-slate-900 text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                UNIVERSITY APPLICATION & PRE-ENROLLMENT
              </h4>
            </div>

            {/* 1. Admission Documents Requirements */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading flex items-center gap-1.5">
                <span>1. Academic & Admission Documents</span>
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_passport"]}
                    onChange={() => toggleCheck("it_app_passport")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Valid Passport
                    </p>
                    <p className="text-xs text-slate-500">
                      – Scanned Copy of Bio-Data Pages (min. 18 months validity)
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_transcripts"]}
                    onChange={() => toggleCheck("it_app_transcripts")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Educational Transcripts & Certificates
                    </p>
                    <ul className="text-xs text-slate-600 space-y-0.5 list-disc list-inside">
                      <li>Matric & Inter (FSc/ICS) (IBCC & MOFA Attested)</li>
                      <li>Bachelor Degree & Transcripts (HEC & MOFA Attested)</li>
                      <li>Italian translation (where required by embassy)</li>
                    </ul>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_cimea"]}
                    onChange={() => toggleCheck("it_app_cimea")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      CIMEA Statement or Declaration of Value (DOV)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Official CIMEA Comparability / Verification or Embassy DOV
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_universitaly"]}
                    onChange={() => toggleCheck("it_app_universitaly")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Universitaly Portal Pre-Enrollment Summary
                    </p>
                    <p className="text-xs text-slate-500">
                      – Validated Form A from universitaly.it with university approval
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_sop"]}
                    onChange={() => toggleCheck("it_app_sop")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Statement of Purpose (SOP) & Europass CV
                    </p>
                    <p className="text-xs text-slate-500">
                      – Clear motivation letter tailored to the degree and course modules
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_lor"]}
                    onChange={() => toggleCheck("it_app_lor")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Academic Reference Letters (LORs)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Two recommendation letters on official institution letterhead
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_app_english"]}
                    onChange={() => toggleCheck("it_app_english")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      English Proficiency / Entry Test
                    </p>
                    <p className="text-xs text-slate-500">
                      – IELTS (6.0+) / PTE / MOI waiver or TOLC / IMAT score (for Medicine)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* 2. Admission Progression */}
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                2. Admission & Scholarship Progression
              </h5>
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    University Acceptance / Evaluation Letter
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Direct Portal Application → Academic Merit Review → Admission Offer
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    Universitaly Portal Pre-Enrollment & DOV/CIMEA
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    Online Universitaly Submission → University Validation → Embassy Forwarding
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="text-xs font-bold text-slate-900">
                    DSU Regional Scholarship Application
                  </p>
                  <p className="text-xs font-bold text-[#DB0303]">
                    ISEE Parificato Assessment → 100% Tuition Waiver + €6,000–€8,000/yr Stipend
                  </p>
                </div>
              </div>
            </div>

            {/* Note - DSU Regional Scholarships */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>NOTE — DSU SCHOLARSHIPS & SCHENGEN MOBILITY:</span>
              </p>
              <p className="leading-relaxed">
                Public universities in Italy offer world-class degrees with low nominal fees (€500–€3,000/yr). Most Pakistani students qualify for regional DSU grants covering full tuition, free canteen meals, and yearly cash stipends.
              </p>
            </div>
          </div>

          {/* Column 2: Embassy Visa Filing Requirements */}
          <div className="space-y-6">
            <div className="p-3 bg-[#DB0303] text-white rounded-xl text-center shadow-xs">
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
                EMBASSY VISA & IMMIGRATION REQUIREMENTS
              </h4>
            </div>

            {/* 1. Visa Application Documents */}
            <div className="space-y-4">
              <h5 className="text-sm font-bold text-[#DB0303] font-heading">
                1. Italian National D-Visa Documents
              </h5>

              <div className="space-y-3 text-xs sm:text-sm">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_summary"]}
                    onChange={() => toggleCheck("it_visa_summary")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Validated Universitaly Summary (Form A)
                    </p>
                    <p className="text-xs text-slate-500">
                      – Official digitally validated pre-enrollment document with barcode
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_bank"]}
                    onChange={() => toggleCheck("it_visa_bank")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Financial Proof & Bank Statement (min €6,000+)
                    </p>
                    <p className="text-xs text-[#DB0303] font-semibold">
                      – Sponsor/Student bank statement (6 months) showing min. €6,000–€8,000
                    </p>
                    <p className="text-xs text-slate-500">
                      – Affidavit of Support & FRC certificate from NADRA
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_accommodation"]}
                    onChange={() => toggleCheck("it_visa_accommodation")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Proof of Accommodation in Italy
                    </p>
                    <p className="text-xs text-slate-500">
                      – University dormitory confirmation, rental lease, or 30-day hotel booking
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_insurance"]}
                    onChange={() => toggleCheck("it_visa_insurance")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Schengen Travel Health Insurance
                    </p>
                    <p className="text-xs text-slate-500">
                      – Minimum €30,000 emergency medical coverage valid across Schengen
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_police"]}
                    onChange={() => toggleCheck("it_visa_police")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Clean Police Character Certificate
                    </p>
                    <p className="text-xs text-slate-500">
                      – Issued by Police Khidmat Markaz and attested by MOFA Pakistan
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_flight"]}
                    onChange={() => toggleCheck("it_visa_flight")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      Confirmed Flight Ticket Reservation
                    </p>
                    <p className="text-xs text-slate-500">
                      – Round-trip / one-way dummy flight reservation to Italian airport
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-red-50/40 transition-colors cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checkedItems["it_visa_form"]}
                    onChange={() => toggleCheck("it_visa_form")}
                    className="mt-0.5 w-4 h-4 rounded text-[#DB0303] focus:ring-red-500"
                  />
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 group-hover:text-[#DB0303]">
                      National D-Visa Application Form & Photos
                    </p>
                    <p className="text-xs text-slate-500">
                      – Duly filled National D-Visa form + 2 biometric photos (35x40mm)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Critical Embassy Appointment Rule */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <p className="font-bold uppercase tracking-wider flex items-center gap-1.5 font-heading text-[#DB0303]">
                <ShieldCheck className="w-4 h-4 text-[#DB0303]" />
                <span>CRITICAL EMBASSY APPOINTMENT & DOV RULE:</span>
              </p>
              <p className="leading-relaxed text-slate-700">
                Book your BLS/Embassy visa appointment immediately upon Universitaly summary release. Ensure all academic documents are verified via CIMEA or legalized with DOV prior to visa submission.
              </p>
            </div>

            {/* Intakes & Work Rights */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <p className="font-bold uppercase tracking-wider font-heading text-slate-900">
                INTAKES & WORK RIGHTS:
              </p>
              <p className="text-slate-600">
                Major: Sept/Oct (Autumn) | Selected: Feb/March (Spring)
              </p>
              <p className="font-bold text-[#DB0303]">
                Work: 20 hrs/week during study + 1-Year Job Search TRP permit
              </p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown Table */}
        <div className="space-y-4 pt-6 border-t border-slate-200">
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl text-center shadow-md">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-heading">
              RS HIGHER EDUCATION CONSULTANTS — TOTAL COST BREAKDOWN FOR ITALY
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
                  <td className="p-3.5 font-bold text-slate-900">Italian National Student Visa (Type D)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€50 - €116</td>
                  <td className="p-3.5 text-slate-600">Official visa filing fee paid at Italian Embassy / BLS Center</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">CIMEA Verification & Comparability</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€150 - €300 (Optional)</td>
                  <td className="p-3.5 text-slate-600">Direct digital verification service accepted in place of physical DOV</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Public University Annual Tuition</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€500 - €3,000 / year</td>
                  <td className="p-3.5 text-slate-600">Calculated based on family ISEE; 100% waived for DSU scholarship winners</td>
                </tr>
                <tr className="bg-slate-50/60 hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Schengen Health Insurance (1 Year)</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€120 - €160</td>
                  <td className="p-3.5 text-slate-600">Comprehensive emergency health insurance covering all 29 Schengen states</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-slate-900">Required Maintenance Funds Proof</td>
                  <td className="p-3.5 font-bold text-[#DB0303]">€6,000 - €8,000</td>
                  <td className="p-3.5 text-slate-600">Approx. €500/month living funds shown in student/parent bank account</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Featured Top Italian Universities */}
        <div className="space-y-4 pt-4">
          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider font-heading flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#DB0303]" />
            <span>Featured Italian Public Universities</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
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
